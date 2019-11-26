import React from "react";
import Grid from "@material-ui/core/Grid";
import {CheckinHotelMealPlanApi} from "../../../../api/CheckinHotelMealPlanApi";
import Select from "react-select";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {Typography, withStyles} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {CheckinHotelApi} from "../../../../api/CheckinHotelApi";
import cookies from 'react-cookies';

const styles = (theme) => ({
    otherContainer: {
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
});

class MealPlanForm extends React.Component {
    constructor(props) {
        super(props);
        this.mealPlansApi = new CheckinHotelMealPlanApi();
        this.hotelApi = new CheckinHotelApi();
        this.state = {
            mealPlans: [],
            hotels: [],
            selectedMealPlan: this.props.location.state.mealPlanId,
            selectedHotel: this.props.location.state.hotel,
            selectedPrice: this.props.location.state.price,
            selectedMealPlanId: this.props.location.state.selectedMealPlanId,
            mode: this.props.location.state.mode,
            title: this.props.location.state.mode === "update" ? "Actualizar plan de comida" : 'Nuevo plan de comida'
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.redirectToList = this.redirectToList.bind(this);
        this.conditionalRender = this.conditionalRender.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    componentDidMount() {
        if (this.state.mode === "update") {
            this.mealPlansApi.findById(this.state.selectedMealPlanId)
                .then(data => {
                    this.setState({
                        selectedHotel: data.hotel,
                        selectedMealPlan: data.mealPlan,
                        selectedPrice: data.additionalPrice
                    })
                });
        }
        this.mealPlansApi.getAll().then(mealPlans => this.setState({mealPlans: mealPlans}));
        this.hotelApi.getByUser(cookies.load('token')).then(hotels => this.setState({hotels: hotels}));
    }

    redirectToList() {
        this.props.history.push('/Administration', {
            view: 'mealPlans'
        })
    }

    handleOnSubmit(event) {
        event.preventDefault();
        if (this.state.mode === 'update') {
            let request = {
                additionalPrice: this.state.selectedPrice
            }
            this.hotelApi.updateMealPlan(this.state.selectedHotel.id, this.state.selectedMealPlan.id, request, cookies.load('token'))
                .then(res => {
                    this.redirectToList();
                });
        } else {
            let request = {
                mealPlanId: this.state.selectedMealPlan.id,
                additionalPrice: this.state.selectedPrice
            };

            this.hotelApi.addMealPlan(this.state.selectedHotel.id, request, cookies.load('token'))
                .then(res => {
                    this.redirectToList();
                });
        }
    }

    conditionalRender() {
        if (this.state.mode === 'update') {
            return (<Grid container xs={12} spacing={1}>
                    <Grid item xs={12} align={'left'} justify={'left'}>
                        <TextField label='Plan de comida *' variant="outlined" fullWidth disabled
                                   value={this.state.selectedMealPlan ? this.state.selectedMealPlan.name : ''}/>
                    </Grid>
                    <Grid item xs={12} align={'left'} justify={'left'}>
                        <TextField label='Hotel *' variant="outlined" fullWidth disabled
                                   value={this.state.selectedHotel ? this.state.selectedHotel.name : ''}/>
                    </Grid>
                </Grid>
            )
        } else {
            return (<Grid container xs={12} spacing={1}>
                <Grid item xs={12} align={'left'} justify={'left'}>
                    <Autocomplete
                        inputId="react-select-mealPlan"
                        options={this.state.mealPlans}
                        getOptionLabel={option => option.name}
                        renderInput={params => (
                            <TextField {...params} label='Plan de comida *' variant="outlined" fullWidth/>
                        )}
                        onChange={(evnt => {
                            this.setState({selectedMealPlan: this.state.mealPlans[evnt.target.dataset.optionIndex]})
                        })}
                        required
                    />
                </Grid>
                <Grid item xs={12} align={'left'} justify={'left'}>
                    <Autocomplete
                        inputId="react-select-hotel"
                        options={this.state.hotels}
                        getOptionLabel={option => option.name}
                        renderInput={params => (
                            <TextField {...params} label='Hotel *' variant="outlined" fullWidth/>
                        )}
                        onChange={(evnt => {
                            this.setState({selectedHotel: this.state.hotels[evnt.target.dataset.optionIndex]})
                        })}
                        required
                    />
                </Grid>
            </Grid>);
        }
    }


    render() {
        const {classes} = this.props;
        return (
            <Grid container xs={12} spacing={2}>
                <Grid item xs={12}>
                    <Typography variant={'h4'}>{this.state.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={this.handleOnSubmit}>

                        {
                            this.conditionalRender()
                        }
                        <Grid container xs={12} className={classes.otherContainer}>
                            <Grid item xs={12} align={'left'} justify={'left'}>
                                <TextField type={'number'} label={'Precio'} variant="outlined" required
                                           fullWidth
                                           onChange={(event) => this.setState({selectedPrice: event.target.value})}
                                           value={this.state.selectedPrice ? this.state.selectedPrice : ''}/>
                            </Grid>
                        </Grid>

                        <Grid container xs={12} spacing={2}>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={this.redirectToList}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    onClick={this.handleOnSubmit}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Guardar
                                </Button>
                            </Grid>
                        </Grid>

                    </form>
                </Grid>
            </Grid>
        );
    }
}

MealPlanForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(MealPlanForm));
