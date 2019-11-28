import React from "react";
import Grid from "@material-ui/core/Grid";
import {CheckinHotelMealPlanApi} from "../api/CheckinHotelMealPlanApi";
import Select from "react-select";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {Typography, withStyles} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {CheckinHotelApi} from "../api/CheckinHotelApi";
import cookies from 'react-cookies';
import ChipInput from "material-ui-chip-input";
import CheckInRoomTypeApi from "../api/CheckInRoomTypeApi";

const styles = (theme) => ({
    otherContainer: {
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
});

class RoomTypeForm extends React.Component {
    constructor(props) {
        super(props);
        this.hotelApi = new CheckinHotelApi();
        this.roomTypeApi = new CheckInRoomTypeApi();
        this.state = {
            mode: this.props.location.state.mode,
            hotels: [], roomType: {
                id: this.props.location.state.roomTypeId,
                type: '',
                maxOcupancy: '',
                surfaceArea: '',
                guests: '',
                hotelId: this.props.location.state.hotelId,
                price: ''
            },
            rooms: {
                numbers: []
            },
            title: this.props.location.state.mode === "update" ? "Actualizar tipo de habitacion" : 'Nuevo tipo de habitacion'
        }
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.redirectToList = this.redirectToList.bind(this);
        this.renderIfNotUpdate = this.renderIfNotUpdate.bind(this);
    }

    renderIfNotUpdate(component) {
        if (this.state.mode !== 'update') {
            return component;
        }
    }

    componentDidMount() {
        this.hotelApi.getByUser(cookies.load('token'))
            .then(data => this.setState({hotels: data}));
        if (this.state.mode === 'update') {
            this.roomTypeApi.findByIdAndHotelId(this.state.roomType.id, this.state.roomType.hotelId)
                .then(data => {
                    this.setState({
                        roomType: {
                            id: data.id,
                            type: data.type,
                            maxOcupancy: data.maxOcupancy,
                            surfaceArea: data.surfaceArea,
                            guests: data.guests,
                            hotelId: data.hotelId,
                            price: data.price,
                        },
                        rooms: {
                            numbers: data.rooms.map(room => room.number),
                            roomTypeId: data.id
                        }
                    });
                });
        }
    }

    redirectToList() {
        this.props.history.push('/Administration', {
            view: 'roomTypes'
        });
    }

    handleOnSubmit(event) {
        event.preventDefault();
        if (this.state.mode !== "update") {
            this.roomTypeApi.create(this.state.roomType, cookies.load('token'))
                .then(res => {
                    if (res.status === 201) {
                        res.json().then(data => {
                            this.setState({rooms: {...this.state.rooms, roomTypeId: data.id}})
                            this.roomTypeApi.addRooms(this.state.rooms, cookies.load('token'))
                                .then(this.redirectToList)
                        })
                    }
                })
        } else {
            const id = this.state.roomType.id;
            this.state.roomType.id = undefined;
            this.roomTypeApi.update(id, this.state.roomType, cookies.load('token'))
                .then(this.redirectToList)

        }
    }


    handleAddChip(chip) {
        this.setState({rooms: {...this.state.rooms, numbers: chip}});
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid container xs={12} spacing={2}>
                <Grid item xs={12}>
                    <Typography variant={'h4'}>{this.state.title}</Typography>
                </Grid>


                <Grid item xs={12}><TextField label='Tipo' variant="outlined" fullWidth
                                              required
                                              disabled={this.state.mode === 'update'}
                                              onChange={(event) => this.setState({
                                                  roomType: {
                                                      ...this.state.roomType,
                                                      type: event.target.value
                                                  }
                                              })}
                                              value={this.state.roomType.type}/></Grid>

                {
                    this.renderIfNotUpdate(<Grid item xs={12}><TextField label='Ocupantes' variant="outlined" fullWidth
                                                                         required
                                                                         onChange={(event) => this.setState({
                                                                             roomType: {
                                                                                 ...this.state.roomType,
                                                                                 maxOcupancy: event.target.value
                                                                             }
                                                                         })}/> </Grid>)
                }


                {
                    this.renderIfNotUpdate(<Grid item xs={12}><TextField label='Visitantes' variant="outlined" fullWidth
                                                                         required
                                                                         onChange={(event) => this.setState({
                                                                             roomType: {
                                                                                 ...this.state.roomType,
                                                                                 guests: event.target.value
                                                                             }
                                                                         })}/> </Grid>)
                }
                {

                    this.renderIfNotUpdate(<Grid item xs={12}>
                        <TextField label='Area' variant="outlined" fullWidth required
                                   onChange={(event) => this.setState({
                                       roomType: {
                                           ...this.state.roomType,
                                           surfaceArea: event.target.value
                                       }
                                   })}/>

                    </Grid>)
                }
                <Grid item xs={12}>
                    <TextField label='Precio' variant="outlined" fullWidth required
                               onChange={(event) => this.setState({
                                   roomType: {
                                       ...this.state.roomType,
                                       price: event.target.value
                                   }
                               })}
                               value={this.state.roomType.price}/>
                </Grid>
                <Grid item xs={12}>
                    <ChipInput variant={'outlined'} fullWidth label={'Habitaciones'}
                               onChange={(chip) => this.handleAddChip(chip)}
                               defaultValue={this.state.rooms.numbers}
                               disabled={this.state.mode === 'update'}/>
                </Grid>
                {
                    this.renderIfNotUpdate(
                        <Grid item xs={12}>
                            <Autocomplete
                                inputId="react-select-hotel"
                                options={this.state.hotels}
                                getOptionLabel={option => option.name}
                                renderInput={params => (
                                    <TextField {...params} label='Hotel *' variant="outlined" fullWidth/>
                                )}
                                onChange={(evnt => {
                                    this.setState({
                                        roomType: {
                                            ...this.state.roomType,
                                            hotelId: this.state.hotels[evnt.target.dataset.optionIndex].id
                                        }
                                    })
                                })}
                                required
                            />
                        </Grid>)
                }
                <Grid container xs={12} spacing={2}>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => this.props.history.push('/Administration', {
                                view: 'roomTypes'
                            })}
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
            </Grid>
        );
    }
}

RoomTypeForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(RoomTypeForm));
