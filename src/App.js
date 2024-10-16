import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    Image: '/Images/clear.webp'
  });

  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=dea6f3853e83ac904d4f59475cb5035f&units=metric`;
      axios.get(apiUrl)
        .then(res => {
          let imagePath = '';
          if (res.data.weather[0].main === "cloud") {
            imagePath = '/Images/cloud.png';
          } else if (res.data.weather[0].main === "clear") {
            imagePath = 'Images/clear.webp';
          } else if (res.data.weather[0].main === "Rain") {
            imagePath = 'Images/rainnn.jpg';
          } else if (res.data.weather[0].main === "Drizzle") {
            imagePath = 'Images/drizzle.webp';
          } else if (res.data.weather[0].main === "Mist") {
            imagePath = 'Images/mist.png';
          } else {
            imagePath = 'Images/cloud.png';
          }

          setData({ ...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, image: imagePath });
          setError('');
        })
        .catch(err => {
          if (err.response.status === 404) {
            setError("Invalid city name");
          } else {
            setError('');
          }
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-300">
      <div className="w-full max-w-md p-6 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg shadow-lg text-center">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <input 
              type="text" 
              placeholder="Enter city name" 
              className="w-full py-3 px-6 text-lg bg-blue-200 text-black rounded-full border border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none" 
              onChange={(e) => setName(e.target.value)} 
            />
            <button 
              className="ml-4 p-4 bg-blue-500 hover:bg-blue-700 rounded-full flex items-center justify-center w-16 h-16" 
              onClick={handleClick}>
              <img src="/Images/search.png" alt="Search" className="w-8" />
            </button>
          </div>
          {error && <p className="text-red-500 text-left">{error}</p>}
        </div>
        <div className="winfo">
          <img src={data.image} alt="Weather icon" className="w-24 mx-auto mb-4" />
          <h1 className="text-6xl font-bold">{Math.round(data.celcius)}°C</h1>
          <h2 className="text-3xl mt-2">{data.name}</h2>
        </div>
        <div className="mt-8 flex justify-around">
          <div className="flex items-center">
            <img src="/Images/humidity.jpg" alt="Humidity icon" className="w-12 mr-2" />
            <div>
              <p className="text-lg font-bold">{Math.round(data.humidity)}%</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className="flex items-center">
            <img src="/Images/wind.png" alt="Wind icon" className="w-12 mr-2" />
            <div>
              <p className="text-lg font-bold">{Math.round(data.speed)}km/h</p>
              <p>Wind</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
