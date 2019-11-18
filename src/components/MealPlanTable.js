import React from "react";
import {Table, TableBody, TableCell, TableHead} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import Price from "./Price";
import Button from "@material-ui/core/Button";

export class MealPlanTable extends React.Component {

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
