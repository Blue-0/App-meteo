import React, { useEffect, useState } from "react";
import { emojis } from "../utils/Emojis";
import { formatDateToHoursMinutes } from "../utils/formatDateToHoursMinutes";
import { getEmojis } from "../utils/getEmojis";

const TodayCard = ({ data, weatherUnits }) => {
  const [weatherEmojis, setWeatherEmojis] = useState("");

  useEffect(() => {
    if (!data) return;

    const avTemp = (
      (data.temperature_2m_max + data.temperature_2m_min) /
      2
    ).toFixed(1);

    const weatherEmojis = getEmojis(
      avTemp,
      data.precipitation_sum,
      data.windspeed_10m_max
    );

    setWeatherEmojis(weatherEmojis);
  }, [data]);

  if (!data || !weatherUnits) {
    return (
      <div className="text-2xl text-center text-red-500">
        Aucune données. Affichage impossible.
      </div>
    );
  }

  // Fonction pour envelopper chaque emoji dans un span avec un drop-shadow
  const renderEmoji = (emoji) => (
    <span className="drop-shadow">{emoji}</span>
  );

  return (
    <div className="max-w-max xl:ml-auto mx-auto">
      <div className="flex mb-20 mt-12 flex-col xl:flex-row items-center">
        <div className="flex flex-col">
          <div className="text-8xl mb-8 text-center xl:text-right ">
            {weatherEmojis.split('').map(renderEmoji)}
          </div>
          <div className="font-dongle text-6xl font-bold text-center text-white mt-auto mb-8 xl:mt-auto xl:mb-0">
            Aujourd'hui, {data.day}
          </div>
        </div>
        <div className="font-dongle grid lg:grid-cols-2 gap-4 text-3xl ml-12 xl:pl-4 xl:border-l-2 xl:border-l-indigo-500">
          <p className="p-4 border border-gray-200 rounded shadow-sm bg-gray-50">
            {renderEmoji(emojis.calendar)} Jour : {data.day}
          </p>
          <p className="p-4 border border-gray-200 rounded shadow-sm bg-gray-50">
            {renderEmoji(emojis.rain)} Pluie : {data.precipitation_sum} {weatherUnits.rain}
          </p>
          <p className="p-4 border border-gray-200 rounded shadow-sm bg-gray-50">
            {renderEmoji(emojis.sunrise)} Lever du soleil : {formatDateToHoursMinutes(new Date(data.sunrise))}
          </p>
          <p className="p-4 border border-gray-200 rounded shadow-sm bg-gray-50">
            {renderEmoji(emojis.sunset)} Coucher du soleil : {formatDateToHoursMinutes(new Date(data.sunset))}
          </p>
          <p className="p-4 border border-gray-200 rounded shadow-sm bg-gray-50">
            {renderEmoji(emojis.hot)} Température Max : {data.temperature_2m_max} {weatherUnits.temperature}
          </p>
          <p className="p-4 border border-gray-200 rounded shadow-sm bg-gray-50">
            {renderEmoji(emojis.cold)} Température Min : {data.temperature_2m_min} {weatherUnits.temperature}
          </p>
          <p className="p-4 border border-gray-200 rounded shadow-sm bg-gray-50">
            {renderEmoji(emojis.wind)} Vent : {data.windspeed_10m_max} {weatherUnits.wind}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodayCard;
