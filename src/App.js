
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    Image: '/Images/clear.webp'

  })

  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleclick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=dea6f3853e83ac904d4f59475cb5035f&units=metric`;
      axios.get(apiUrl)
        .then(res => {
          let imagepath = '';
          if (res.data.weather[0].main == "cloud") {
            imagepath = '/Images/cloud.png'
          } else if (res.data.weather[0].main == "clear") {
            imagepath = 'Images/clear.webp'
          } else if (res.data.weather[0].main == "Rain") {
            imagepath = 'Images/rainnn.jpg'
          } else if (res.data.weather[0].main == "Drizzle") {
            imagepath = 'Images/drizzle.webp'
          } else if (res.data.weather[0].main == "Mist") {
            imagepath = 'Images/mist.png'
          } else {
            imagepath = 'Images/cloud.png'
          }

          console.log(res.data);
          setData({ ...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, image: imagepath })
          setError('');
        })
        .catch(err =>{
          if(err.response.status == 404){
            setError("invalid city name")
          }else{
            setError('');
          }
           console.log(err)
        });


    }
  }

  return (
    <div className="App">
      <div className='container'>
        <div className='weather'>
          <div className='search'>
            <input type='text' placeholder='Enter city Name' onChange={e => setName(e.target.value)} />
            <button><img src='/Images/search.png' onClick={handleclick} alt='' /></button>
          </div>

          <div className='error'>
          <p>{error}</p>

          <div className='winfo'>
            <img src={data.image} alt='' className='icon'/>
            <h1>{Math.round(data.celcius)}°C</h1>
            <h2>{data.name}</h2>
            <div className='details'>
            
              <div className='col'>
                <img src='/Images/humidity.jpg' alt='' />
                <div className='humidity'>
                  <p>{Math.round(data.humidity)}%</p>
                  <p>humidity</p>
                </div>
              </div>
              <div className='col'>
                <img src='/Images/wind.png' alt='' />
                <div className='wind'>
                  <p>{Math.round(data.speed)}km/h</p>
                  <p>wind</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
