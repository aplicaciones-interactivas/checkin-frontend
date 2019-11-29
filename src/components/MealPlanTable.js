import React from "react";
import {Table, TableBody, TableCell, TableHead} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import Price from "./Price";
import Button from "@material-ui/core/Button";
import {CheckinReservationApi} from "../api/CheckinReservationApi";
import cookie from 'react-cookies';

export class MealPlanTable extends React.Component {

    constructor(props) {
        super(props);
        this.reservationApi = new CheckinReservationApi();
        this.onReservation = this.onReservation.bind(this);
    }

    onReservation(mealPlanId) {
        const {from, until, roomTypeId, onReservationFinish, validateBeforeReserve} = this.props;
        validateBeforeReserve(() => this.reservationApi.reserve(cookie.load('token'), from, until, roomTypeId, mealPlanId)
            .then(onReservationFinish));
    }

    render() {
        const {mealPlans} = this.props;
        return (<Table>
            <TableHead>
                <TableRow>
                    <TableCell>Plan de comidas</TableCell>
                    <TableCell>Descripcion</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    mealPlans.map(mealPlan => {
                        return (
                            <TableRow>
                                <TableCell rowSpan={3}>{mealPlan.mealPlan.name}</TableCell>
                                <TableCell>{mealPlan.mealPlan.description}</TableCell>
                                <TableCell><Price price={mealPlan.additionalPrice}></Price></TableCell>
                                <TableCell> <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={this.onReservation.bind(null, mealPlan.id)}
                                >
                                    Reservar
                                </Button></TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>);
    }
}
