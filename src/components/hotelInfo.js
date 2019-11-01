/*
Titulo
Ubicacion
estrellas
Tipos de desayuno[]
Amenities[]
Tipos de Habitacion []
Imagenes[]

Dos grupos:
Izquierda: Titulo, Ubicacion, Estrellas 
Derecha:  Imagenes, desayunos, amenities, habitaciones
*/

import React from 'react';
import '../hotelInfo.css';
import FormLabel from '@material-ui/core/FormLabel';

export default function HotelInfo(hotelRecibido) {
   return(
        <div class="contenedor-square">
            <div class="contendor-izquierdo">
                <h3>{hotelRecibido.nombre}</h3>
                <p>{hotelRecibido.ubicacion}</p>
                <p>{hotelRecibido.estrellas}</p>
            </div>
            <div class="contenedor-derecho">
                <img src={require("../images/hotelMuestra.jpg")} alt="Hotel"/>
                <FormLabel>DESAYUNOS</FormLabel>
                <FormLabel>Amenities</FormLabel>
                <div class="amenities">
                  <img src={require("../images/amenities/bathrobes.svg")} alt="amenitie"/>
                  <img src={require("../images/amenities/beach.svg")} alt="amenitie"/>
                  <img src={require("../images/amenities/sheets.svg")} alt="amenitie"/>
                  <img src={require("../images/amenities/garden.svg")} alt="amenitie"/> 
                </div>
            </div>
        </div>
    );
}