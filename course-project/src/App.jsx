import { useState, useEffect } from 'react'
import './App.css'
import Weather from './Weather'
import Forecast from './Forecast'
import Searchfield from './Searchfield'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap'

function App() {
  const [count, setCount] = useState(0)
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const city = "helsinki";
    const apiKey = import.meta.env.VITE_API_KEY;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.log("Problem in apiCall", error);
    }

  }

  useEffect(() => {
    fetchWeather();
  }, [])

  useEffect(() => {
    document.body.style.backgroundColor = 'darkgray';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <>
      <Container fluid>
        <Searchfield />
      </Container>

      <Container fluid className="pt-5 mt-5">
        <Row>
          <Col>
            <Weather />
          </Col>
          <Col>
            <Forecast/>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
