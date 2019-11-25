import React from 'react';
import {CheckinHotelApi} from "../../../api/CheckinHotelApi";
import cookie from 'react-cookies';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Price from "../../../components/Price";
import {Link, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import NavBar from "../../../components/NavBar";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import CheckinPlacesApi from "../../../api/CheckinPlacesApi";
import Grid from "@material-ui/core/Grid";
import withConfirm from 'material-ui-confirm';
import ErrorBox from "../../../components/ErrorBox";
import {CheckinHotelMealPlanApi} from "../../../api/CheckinHotelMealPlanApi";


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
                    console.log(data);
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

    deleteItem(hotel) {
        this.hotelApi.delete(hotel.id, cookie.load('token'))
            .then(res => {
                if (res.status == 500) {
                    this.setState({deleteError: true})
                } else {
                    this.setState({deleteError: false})
                }
            });
    }

    render() {
        const {classes, confirm} = this.props;

        return (<span>
            {
                this.onDelete()
            }
            <Grid xs={12}>
                <Button fullWidth variant="contained" color="primary">Agregar</Button>
            </Grid>
             <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nombre</TableCell>
                            <TableCell align="center">Hotel</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.mealPlans.map(hotelMealPlan => <TableRow>
                                <TableCell align="center">{hotelMealPlan.mealPlan.name}</TableCell>
                                <TableCell align="center">{hotelMealPlan.hotel.name}</TableCell>
                                <TableCell align="center">
                                    <Fab size="small" aria-label="Add" color={'secondary'}>
                                        <DeleteIcon/>
                                    </Fab>
                                    <Fab size="small" aria-label="Add" color={'primary'}>
                                        <EditIcon/>
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

export default withStyles(styles)(withConfirm(MealPlanList));
