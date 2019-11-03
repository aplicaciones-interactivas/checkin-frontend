import React, {Component} from 'react'
import '../index.css';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Button, Col, Container, Row} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            from: new Date().toISOString(),
            until: new Date().toISOString(),
        };
    }

    render() {
        return (
            <Container fluid={true} className={"header"}>
                <Navbar variant="dark">
                    <Navbar.Brand href="/">Check-In</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Link href="/SignIn">Sign in</Nav.Link>
                            <Nav.Link href="/SignUp">Sign up</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Row className='mt-5'>
                    <Col xs={12}>
                        <h1 className="text-center white">Check-In</h1>
                        <h4 className="text-center white">Find your ideal hotel worldwide at the best price</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Where are you go?"
                                aria-label="where-u-go"
                            />
                            <InputGroup.Prepend>
                                <InputGroup.Text>From</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type={'date'}></FormControl>
                            <InputGroup.Prepend>
                                <InputGroup.Text>To</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type={'date'}></FormControl>
                            <InputGroup.Prepend>
                                <InputGroup.Text>Persons</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type={'number'}></FormControl>
                            <Button href={"/Hoteles"}>Search</Button>
                        </InputGroup>

                    </Col>
                </Row>
            </Container>
            /*<div class="contenedor" id="contenedor-titulo-flex">
                <div class="contenedor-titulo">
                    <h1>Check-In</h1>
                    <h2>Hacé Check-In en los mejores hoteles</h2>
                    <input type="text" placeholder="¿A dónde vas?" id="selector-destino"/>
                    <input type="date" id="selector-fecha"/>
                    <input type="date" id="selector-fecha"/>
                    <input type="number" id="selector-personas"/>
                    <Link to="/Hoteles">Buscar</Link>
                </div>
            </div>*/

        )
    }
}
