import React, {Component} from 'react'
import '../index.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Button, Col, Container, Form, Row} from "react-bootstrap";

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
                    <Col>
                        <h1 className="text-center white">Check-In</h1>
                        <h4 className="text-center white">Hace check-in en los mejores hoteles en todo el mundo al mejor
                            precio</h4>
                    </Col>
                </Row>
                <Row>
                    <Col lg={{span: 10, offset: 1}} md={{span: 10, offset: 1}}>
                        <Form>
                            <Form.Row className={'justify-content-center'}>
                                <Col xs={12} md={12} lg={4}>
                                    <Form.Label className={'font-label'}>¿A donde vas?</Form.Label>
                                    <Form.Control/>
                                </Col>
                                <Col xs={12} md={12} lg={2}>
                                    <Form.Label className={'font-label'}>¿Cuándo llegas?</Form.Label>
                                    <Form.Control type={'date'}></Form.Control>
                                </Col>
                                <Col xs={12} md={12} lg={2}>

                                    <Form.Label className={'font-label'}>¿Cuándo te vas?</Form.Label>
                                    <Form.Control type={'date'}></Form.Control>
                                </Col>
                                <Col xs={12} md={12} lg={1}>
                                    <Form.Label className={'font-label'}>Personas</Form.Label>
                                    <Form.Control
                                        type={'number'}
                                    />
                                </Col>
                            </Form.Row>
                            <Form.Row className={'justify-content-center'}>
                                <Col xs={12} md={12} lg={9}>
                                    <Button className={'w-100 mt-2'} href={"/Hoteles"}>Search</Button>
                                </Col>
                            </Form.Row>
                        </Form>


                    </Col>
                </Row>
            </Container>
        )
    }
}
