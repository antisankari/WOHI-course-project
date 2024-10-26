import React from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

function Searchfield() {
    return (
            <Container>
                <Row>
                    <Col sm={8}>
                        <Form.Control
                            id="inputCity"
                        />
                        <Form.Text id="cityNameBlock" muted>
                            Enter city name here
                        </Form.Text>
                    </Col>
                    <Col sm={4}>
                        <Button variant="outline-primary">Get weather!</Button>
                    </Col>
                </Row>
            </Container>
    )
}

export default Searchfield;