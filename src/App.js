import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    image: '/Images/clear.webp'
  });

  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=dea6f3853e83ac904d4f59475cb5035f&units=metric`;
      axios.get(apiUrl)
        .then(res => {
          let imagepath = '';
          if (res.data.weather[0].main === "Clouds") {
            imagepath = '/Images/cloud.png';
          } else if (res.data.weather[0].main === "Clear") {
            imagepath = '/Images/clear.webp';
          } else if (res.data.weather[0].main === "Rain") {
            imagepath = '/Images/rainnn.jpg';
          } else if (res.data.weather[0].main === "Drizzle") {
            imagepath = '/Images/drizzle.webp';
          } else if (res.data.weather[0].main === "Mist") {
            imagepath = '/Images/mist.png';
          } else {
            imagepath = '/Images/cloud.png';
          }

          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagepath
          });
          setError('');
        })
        .catch(err => {
          if (err.response && err.response.status === 404) {
            setError("Invalid city name");
          } else {
            setError('');
          }
        });
    }
  };

  return (
    <div className="App flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="container max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="weather">
          {/* Search input */}
          <div className="search flex items-center space-x-4">
            <input
              type="text"
              placeholder="Enter city name"
              className="flex-grow border border-gray-300 rounded-lg p-2"
              onChange={e => setName(e.target.value)}
            />
            <button
              className="bg-blue-500 p-2 rounded-lg"
              onClick={handleClick}
            >
              <img src='/Images/search.png' alt="Search" className="h-6" />
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="error text-red-500 text-sm">
              <p>{error}</p>
            </div>
          )}

          {/* Weather info */}
          <div className="winfo text-center mt-6">
            <img src={data.image} alt="Weather icon" className="icon mx-auto h-20" />
            <h1 className="text-4xl font-bold">{Math.round(data.celcius)}°C</h1>
            <h2 className="text-2xl text-gray-700">{data.name}</h2>

            {/* Details (humidity and wind) */}
            <div className="details flex justify-between mt-4">
              {/* Humidity */}
              <div className="col flex flex-col items-center">
                <img src='/Images/humidity.jpg' alt="Humidity" className="h-12" />
                <div className="humidity text-sm">
                  <p>{Math.round(data.humidity)}%</p>
                  <p>Humidity</p>
                </div>
              </div>

              {/* Wind */}
              <div className="col flex flex-col items-center">
                <img src='/Images/wind.png' alt="Wind" className="h-12" />
                <div className="wind text-sm">
                  <p>{Math.round(data.speed)} km/h</p>
                  <p>Wind</p>
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
