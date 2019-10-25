import React from 'react'
import '../index.css';


export default function Home (){
    return(
       <header>
           <head>
                <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet"/>
                <meta name="viewport" content="width=device-width, user-scalable=no"/>
                <link rel="apple-touch-icon" href="logo192.png" />
                <link rel="stylesheet" href="../src/index.css"></link>
            </head>
            <div class="menu">
                <div class="contenedor">
                <p class="logo">Check-In</p>
                <img class="menu-icon" src="../images/menu.png" alt=""/>
                <nav>
                    <ul class="lista-menu">
                    <li><a href="#">Login</a></li>
                    <li><a href="#">Signup</a></li>
                    </ul>
                </nav>
                </div>
            </div>
            <div class="contenedor" id="contenedor-titulo-flex">
            <div class="contenedor-titulo">
                <h1>Check-In</h1>
                <h2>Hacé Check-In en los mejores hoteles</h2>
                <input type="text" placeholder="¿A dónde vas?" id="selector-destino"/>
                <input type="date" id="selector-fecha"/>
                <input type="date" id="selector-fecha"/>
                <input type="number" id="selector-personas"/>
                <a href="#hoteles">Buscar</a>
            </div>
            </div>
        </header>
    )
}