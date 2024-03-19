import { useEffect, useState, useCallback } from "react";
import { formatWeatherDataDaily } from "./utils/formatWeatherDataDaily";
import TodayCard from "./components/TodayCard";
import WeekDayCard from "./components/WeekDayCard";

function App() {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const [geoLoc, setGeoLoc] = useState({ latitude: 0, longitude: 0 });
  const [weatherUnits, setweatherUnits] = useState({});
  const [weatherData, setweatherData] = useState([]);

  const fetchWeather = useCallback(async (url) => {
    setError(false);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      if (Object.keys(data).length === 0) {
        setError(true);
      } else {
        // formatted daily data
        const formattedDailyData = formatWeatherDataDaily(data.daily);
        setweatherData(formattedDailyData);
        //unité
        setweatherUnits({
          rain: data.daily_units.precipitation_sum,
          temperature: data.daily_units.temperature_2m_max,
          wind: data.daily_units.wind_speed_10m_max,
        });
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    setIsloading(true);

    if (!navigator.geolocation) {
      window.alert(
        "Votre navigateur ne permet pas la géolocalisation pour utiliser cette application !"
      );
    }

    getGeolocalisation();

    fetchWeather(
      `https://api.open-meteo.com/v1/forecast?latitude=${geoLoc.latitude}&longitude=${geoLoc.longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max&timezone=Europe%2FLondon`
    ).then(() => setIsloading(false));
  }, [fetchWeather, geoLoc.latitude, geoLoc.longitude]);

  const getGeolocalisation = () => {
    navigator.geolocation.getCurrentPosition(
      (postion) => {
        setGeoLoc({
          latitude: postion.coords.latitude,
          longitude: postion.coords.longitude,
        });
      },
      () => {
        setError(true);
      }
    );
  };

//si Chrgm

if (isLoading) {
  return (
    <div className="min-h-screen h-max  bg-cyan-600 flex justify-center items-start p-8 md:px-20">
      <p className="text-center">Chargement ...</p>
    </div>
  );
}

if (!isLoading && weatherData.length === 0) {
  return (
    <div className="min-h-screen h-max  bg-cyan-600 flex justify-center items-start p-8 md:px-20">
      <p className="text-center">
        Aucune données n'a pu être récupérée. Merci de réessayer.
      </p>
    </div>
  );
}


//si Erreur

if (error) {
  return (
    <div className="min-h-screen h-max  bg-cyan-600 flex justify-center items-start p-8 md:px-20">
      <p className="text-red-500 text-center">
        Une erreur est survenue lors de la récupération des prévisions météo
        ...
      </p>
    </div>
  );
}

return (
  <div className="min-h-screen h-max  bg-gradient-to-r from-p-bluef to-p-redf flex justify-center items-center p-8 md:px-20 ">
    <div className="w-full max-w-7xl bg-gradient-to-r from-p-blue to-p-red rounded-lg drop-shadow-xl px-4 py-4 xl:py-12 xl:px-28 md:px-12 md:py-8 ">
      <TodayCard data={weatherData[0]} weatherUnits={weatherUnits} />
      <div className=" grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-6">
        {weatherData &&
          weatherData
            .slice(1, weatherData.length)
            .map((data, index) => (
              <WeekDayCard
                key={index}
                data={data}
                weatherUnits={weatherUnits}
              />
            ))}
      </div>
    </div>
  </div>
);
}


export default App;
