import React from "react";
import {useState, useEffect} from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import {useTranslation} from 'react-i18next'

function Searchfield(props) {
    const { t, i18n } = useTranslation();
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
    
    // for some reason text in Button wont change according to localization without useEffect
    useEffect(() => {
        const handleLanguageChange = () => {
          setInputCity(inputCity); // Trigger re-render
        };
    
        i18n.on("languageChanged", handleLanguageChange);
    
        return () => {
          i18n.off("languageChanged", handleLanguageChange);
        };
      }, [i18n, inputCity]);

    return (
            <Container className="d-flex justify-content-center">
                <Row className="w-100 justify-content-center">
                    <Col sm={8}>
                        <Form.Control
                            id="inputCity"
                            value={inputCity}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder={t('searchPlaceholder')}
                        />
                        <Form.Text id="cityNameBlock" muted>
                        </Form.Text>
                    </Col>
                    <Col sm="auto">
                        <Button onClick={handleButtonClick} variant="outline-primary">{t('searchButton')}</Button>
                    </Col>
                </Row>
            </Container>
    )
}

export default Searchfield;