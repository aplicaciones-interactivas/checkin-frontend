import React from 'react';
import cookie from 'react-cookies';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Grid from "@material-ui/core/Grid";
import withConfirm from 'material-ui-confirm';
import ErrorBox from "../../../components/ErrorBox";
import {CheckinHotelMealPlanApi} from "../../../api/CheckinHotelMealPlanApi";
import {withRouter} from "react-router-dom";


const styles = (theme) => ({
    deleteButton: {
        backgroundColor: 'red'
    }
});

class MealPlanList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {mealPlans: []};
        this.mealPlanApi = new CheckinHotelMealPlanApi();
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        this.getMealPlans();
    }

    getMealPlans() {
        if (cookie.load('token')) {
            this.mealPlanApi.getByUser(cookie.load('token'))
                .then(data => {
                    this.setState({mealPlans: data});
                });
        }
    }


    onDelete() {
        if (this.state.deleteError) {
            return <ErrorBox message={'Ocurrio un error al borrar el hotel. Contacte con soporte'}/>
        }
        return null;
    }

    render() {
        return (<span>
            {
                this.onDelete()
            }
            <Grid xs={12}>
                <Button fullWidth variant="contained" color="primary"
                        onClick={() => this.props.history.push('/Administration', {
                            view: 'addMealPlan'
                        })}>Agregar</Button>
            </Grid>
             <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nombre</TableCell>
                            <TableCell align="center">Hotel</TableCell>
                            <TableCell align="center">Precio</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.mealPlans.map(hotelMealPlan => <TableRow>
                                <TableCell align="center">{hotelMealPlan.mealPlan.name}</TableCell>
                                <TableCell align="center">{hotelMealPlan.hotel.name}</TableCell>
                                <TableCell align="center">{hotelMealPlan.additionalPrice}</TableCell>
                                <TableCell align="center">
                                    <Fab size="small" aria-label="Add" color={'primary'}>
                                        <EditIcon onClick={() => {
                                            this.props.history.push('/Administration', {
                                                view: 'addMealPlan',
                                                selectedMealPlanId: hotelMealPlan.id,
                                                mode: 'update'
                                            })
                                        }}/>
                                    </Fab>
                                </TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
        </span>);
    }
}


MealPlanList.propTypes = {
    classes: PropTypes.object.isRequired,
    confirm: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(withConfirm(MealPlanList)));
