import { useState, useEffect } from 'react'
import './App.css'
import Viewport from './Viewport'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)
  const [weather, setWeather] = useState(null);

  const apiCall = async () => {
    try {
      const response = await fetch("API_URL_HERE");
      const data = response.json();
      setWeather(data);
    } catch(error) {
      console.log("Problem in apiCall", error);
    }

  }

  useEffect(() => {
    apiCall();
  }, [])

  return (
    <>
    <div>Testing localhost</div>
    <Viewport />
    </>
  )
}

export default App
