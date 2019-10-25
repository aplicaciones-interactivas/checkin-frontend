import React from 'react';
import './App.css';
import Home from './components/Home';
import ImgMediaCard from './components/navMain';
import IntegrationReactSelect from './components/searchCountry';
import MaterialUIPickers from './components/datePicker';
import InputField from './components/inputPeople';
import Buttons from  './components/primaryButton';
import TransitionsModal from './components/modal';
import FormControlLabelPosition from './components/checkBox'

function App() {
   
  const results = [
    {
    nombre: "Sheraton",
    precio: "150",
    ubicacion: "Buenos Aires"
  },
  {
    nombre: "Hilton",
    precio: "100",
    ubicacion: "Buenos Aires"
  },
  {
    nombre: "Hilton",
    precio: "100",
    ubicacion: "Buenos Aires"
  },
  {
    nombre: "Hilton",
    precio: "100",
    ubicacion: "Buenos Aires"
  },
  {
    nombre: "Hilton",
    precio: "100",
    ubicacion: "Buenos Aires"
  },
  {
    nombre: "Hilton",
    precio: "100",
    ubicacion: "Buenos Aires"
  },
]


const [open, setOpen] = React.useState(false);

const handleOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

  return (
  
  <div class="principal">  
  <div class="home">
      <Home/>
  </div>
  <div class="hoteles" id="hoteles">
    <div class="contenedor-hoteles">
      {results.map(hotel => <div class="hotel"><ImgMediaCard hotel={hotel} handleOpen={handleOpen}/></div>)}
    </div>
    <div class="contenedor-filtros">
        <form>
          <IntegrationReactSelect/>
          <MaterialUIPickers label="Desde"/>
          <MaterialUIPickers label="Hasta"/>
          <InputField/>
          <Buttons id="formButton"/>
        </form>
        <div class="contenedor-otros_filtros">
            <FormControlLabelPosition nameLabel="1 estrella"/>
            <FormControlLabelPosition nameLabel="2 estrellas"/>
            <FormControlLabelPosition nameLabel="3 estrellas"/>
            <FormControlLabelPosition nameLabel="4 estrellas"/>
            <FormControlLabelPosition nameLabel="5 estrellas"/>
        </div>
    </div>
  </div>
  <div>

  </div>
  <TransitionsModal open={open} handleClose={handleClose}/>
  </div>
  
  );
}

export default App;
