import React from "react";
import {useState} from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

function Searchfield(props) {
    const [inputCity, setInputCity] = useState("");

    const handleInputChange = (e) => {
        setInputCity(e.target.value);
    }

    const handleButtonClick = () => {
        props.setCity(inputCity);
    }

    const handleKeyDown= (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleButtonClick();
        }
    }
    
    return (
            <Container>
                <Row>
                    <Col sm={8}>
                        <Form.Control
                            id="inputCity"
                            value={inputCity}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter city name to fetch weather!"
                        />
                        <Form.Text id="cityNameBlock" muted>
                        </Form.Text>
                    </Col>
                    <Col sm={4}>
                        <Button onClick={handleButtonClick} variant="outline-primary">Get weather!</Button>
                    </Col>
                </Row>
            </Container>
    )
}

export default Searchfield;