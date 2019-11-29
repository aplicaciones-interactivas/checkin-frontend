import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import {Card, CardContent, withStyles} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import GoogleMaps from "./GoogleMaps";
import CheckinAmenitiesApi from "../api/CheckinAmenitiesApi";
import DropzoneArea from "./DropZone";
import {withRouter} from "react-router-dom";
import {CheckinHotelApi} from "../api/CheckinHotelApi";
import cookies from 'react-cookies';
import constants from "../api/ApiConstants";

const styles = theme => ({});


class HotelForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amenities: [], files: [], hotel: {
                name: "",
                contactEmail: "",
                primaryContactPhone: "",
                checkinTime: "",
                checkoutTime: "",
                stars: "",
                category: "",
                country: "",
                city: "",
                address: "",
                amenitiesId: [],
                removedAmenitiesId: [],
            }, statusAmenities: {},
            mode: this.props.location.state.mode,
            hotelId: this.props.location.state.hotelId,
            originalAmenitiesId: [],
            //for update images
            preExistentFiles: [],
            loaded: 0,
            filesToDelete: [],
            newFiles: []

        };
        this.amentityApi = new CheckinAmenitiesApi();
        this.hotelApi = new CheckinHotelApi();
        this.renderIfNotUpdate = this.renderIfNotUpdate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSelectedAmenity = this.onSelectedAmenity.bind(this);
        this.getCityInfo = this.getCityInfo.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.redirectToList = this.redirectToList.bind(this);
    }

    redirectToList() {
        this.props.history.push('/Administration', {
            view: 'hotels'
        });
    }

    renderIfNotUpdate(component) {
        if (this.state.mode !== 'update') {
            return component;
        }
    }

    getCityInfo(info) {
        this.setState({
            hotel: {
                ...this.state.hotel,
                city: info.address_components.filter(component => component.types.includes('locality'))[0].long_name,
                country: info.address_components.filter(component => component.types.includes('country'))[0].short_name
            }
        });
    }

    onSelectedAmenity(event) {
        const selectedValue = event.target.value;
        const preselectedAmenities = this.state.hotel.amenitiesId;
        const status = this.state.statusAmenities;
        if (this.state.hotel.amenitiesId.includes(selectedValue)) {
            preselectedAmenities.remove(selectedValue);
            status[selectedValue] = false;
            if (this.state.originalAmenitiesId.includes(selectedValue)) {
                this.state.hotel.removedAmenitiesId.push(selectedValue);
            }

        } else {
            preselectedAmenities.push(selectedValue);
            status[selectedValue] = true;
        }
        this.setState({hotel: {...this.state.hotel, amenitiesId: preselectedAmenities}, statusAmenities: status});
    }

    _arrayBufferToBase64(buffer) {
        var bytes = new Uint8Array(buffer);
        return window.btoa(bytes.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
        }, ''));
    }

    componentDidMount() {
        this.amentityApi.get().then(data => this.setState({amenities: data}))
        if (this.state.mode === "update") {
            this.hotelApi.getById(this.state.hotelId).then(data => {
                const amenitiesId = data.amenities.map((amenity) => {
                    this.setState({statusAmenities: {...this.state.statusAmenities, [amenity.id]: true}});
                    return amenity.id.toString()
                });
                amenitiesId.forEach(id => this.state.originalAmenitiesId.push(id));
                data.amenitiesId = amenitiesId;
                const files = data.__hotelImages__.map(image => {
                    const splitedUrl =image.path.split('.');
                    return fetch(`${image.path}`).then(res => res.arrayBuffer().then(res => (`data:image/${splitedUrl[splitedUrl.length-1]};base64,` + this._arrayBufferToBase64(res))));
                });
                this.setState({hotel: {...data, removedAmenitiesId: []}});
                Promise.all(files).then(data => {
                    this.setState({preExistentFiles: data, loaded: 1});
                });

            });

        }
    }

    handleChange(files) {
        this.setState({
            files: files
        });

    }

    handleDrop(file) {
        this.state.newFiles.push(file);
    }

    render() {
        return (
            <Grid container xs={12} spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4">Datos del Hotel</Typography>
                </Grid>
                <Grid item xs={12}>
                    <form>
                        <Grid container direction="row" justify="flex-start" xs={12} spacing={2}>
                            <Grid item xs={12}><TextField id="outlined-basic" label="Nombre"
                                                          variant="outlined" fullWidth
                                                          onChange={(event) => this.setState({
                                                              hotel: {
                                                                  ...this.state.hotel,
                                                                  name: event.target.value
                                                              }
                                                          })} value={this.state.hotel.name}/></Grid>
                            <Grid item xs={12}><TextField id="outlined-basic" label="Email" variant="outlined"
                                                          type={'email'} validators={['required', 'isEmail']}
                                                          fullWidth
                                                          onChange={(event) => this.setState({
                                                              hotel: {
                                                                  ...this.state.hotel,
                                                                  contactEmail: event.target.value
                                                              }
                                                          })} value={this.state.hotel.contactEmail}/></Grid>
                            <Grid item xs={12}><TextField id="outlined-basic" label="Teléfono"
                                                          variant="outlined"
                                                          fullWidth
                                                          onChange={(event) => this.setState({
                                                              hotel: {
                                                                  ...this.state.hotel,
                                                                  primaryContactPhone: event.target.value
                                                              }
                                                          })} value={this.state.hotel.primaryContactPhone}/></Grid>
                            <Grid item xs={12}><TextField id="outlined-basic" label="Categoría"
                                                          variant="outlined"
                                                          fullWidth
                                                          onChange={(event) => this.setState({
                                                              hotel: {
                                                                  ...this.state.hotel,
                                                                  category: event.target.value
                                                              }
                                                          })} value={this.state.hotel.category}/></Grid>
                            <Grid item xs={12}><TextField id="outlined-basic" label="Horario de entrada"
                                                          variant="outlined"
                                                          fullWidth
                                                          onChange={(event) => this.setState({
                                                              hotel: {
                                                                  ...this.state.hotel,
                                                                  checkinTime: event.target.value
                                                              }
                                                          })} value={this.state.hotel.checkinTime}/></Grid>
                            <Grid item xs={12}><TextField id="outlined-basic" label="Horario de salida"
                                                          variant="outlined"
                                                          fullWidth
                                                          onChange={(event) => this.setState({
                                                              hotel: {
                                                                  ...this.state.hotel,
                                                                  checkoutTime: event.target.value
                                                              }
                                                          })} value={this.state.hotel.checkoutTime}/></Grid>
                            {
                                this.renderIfNotUpdate(<Grid item xs={12}><GoogleMaps
                                    message={"Ciudad donde se encuentra"}
                                    updateParentState={this.getCityInfo} fullWidth/></Grid>)
                            }

                            {
                                this.renderIfNotUpdate(<Grid item xs={12}><TextField id="outlined-basic"
                                                                                     label="Dirección"
                                                                                     variant="outlined" fullWidth
                                                                                     onChange={(event) => this.setState({
                                                                                         hotel: {
                                                                                             ...this.state.hotel,
                                                                                             address: event.target.value
                                                                                         }
                                                                                     })}/></Grid>)

                            }
                            <Grid item xs={12}><TextField id="outlined-basic" label="Estrellas"
                                                          variant="outlined" type={'number'} fullWidth
                                                          onChange={(event) => this.setState({
                                                              hotel: {
                                                                  ...this.state.hotel,
                                                                  stars: event.target.value
                                                              }
                                                          })} value={this.state.hotel.stars}/></Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5">Facilidades</Typography>
                            </Grid>

                            <Grid container xs={12}>
                                {
                                    this.state.amenities.map(amenity => {
                                        return (<Grid item xs={3}>
                                            <Checkbox
                                                value={amenity.id}
                                                checked={this.state.statusAmenities[amenity.id] || false}
                                                onChange={this.onSelectedAmenity}
                                                color="primary"/>
                                            {amenity.description}
                                        </Grid>)
                                    })
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5">Imagenes</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <DropzoneArea onChange={this.handleChange}
                                              acceptedFiles={['image/*']}
                                              onDrop={this.handleDrop}
                                              onDelete={(i, f) => {
                                                  if (this.state.mode === 'update') {
                                                      if (this.state.hotel.__hotelImages__[i]) {
                                                          this.state.filesToDelete.push(this.state.hotel.__hotelImages__[i].id);
                                                          this.state.hotel.__hotelImages__.removeByIndex(i);
                                                      } else {
                                                          this.state.newFiles.removeByIndex(i - this.state.hotel.__hotelImages__.length)
                                                      }
                                                  }
                                              }}
                                              dropzoneText={"¿Cómo se ve tu hotel?"} showAlerts={false}
                                              initialFiles={this.state.preExistentFiles}
                                              key={this.state.loaded}/>
                            </Grid>
                            <Grid container xs={12} spacing={2}>
                                <Grid item xs={6}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={() => this.props.history.push('/Administration', {
                                            view: 'hotels'
                                        })}
                                    >
                                        Cancelar
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() => {
                                            if (this.state.mode === 'update') {
                                                this.hotelApi.update(this.state.hotel, this.state.filesToDelete, this.state.newFiles, this.state.originalAmenitiesId, cookies.load('token'))
                                                    .then(() => this.redirectToList())
                                            } else {
                                                this.hotelApi.create(this.state.hotel, this.state.files, cookies.load('token'))
                                                    .then(() => this.redirectToList())
                                            }
                                        }}
                                    >
                                        Guardar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        )
    }
}

HotelForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(HotelForm));
