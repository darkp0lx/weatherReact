import React, { useState, useEffect } from "react";
import "../assets/styles/WeekDate.scss";
import { useSelector } from "react-redux";
const WeekDate = () => {
  const [icon, setIcon] = useState();
  useEffect(() => {
    setIcon(weatherData);
  });
  const logo = "http://openweathermap.org/img/wn/";
  const weatherData = useSelector((data) => data.weather.data.weather);
  const dataAll = useSelector((data) => data.weather.data);
  return (
    <div className="weekDate">
      <div className="item">
        {!icon ? (
          <h1>loading...</h1>
        ) : (
          <div className="time-text">
            <h2 className="day">time {icon[0].description}</h2>
            <img
              className="logo_time"
              src={`${logo}${icon[0].icon}@2x.png`}
              alt=""
            />
            <div className="time">
              <p>
                <span>tempMax</span> {Math.round(dataAll.main.temp_min)}°C
              </p>
              <p>
                <span>tempMin</span> {Math.round(dataAll.main.temp_max)}°C
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="item">
        {!icon ? (
          <span>loading...</span>
        ) : (
          <div className="time-text">
            <h2 className="day">winds</h2>
            <img
              className="logo_time"
              src={`${logo}${icon[0].icon}@2x.png`}
              alt=""
            />
            <div className="time">
              <p>
                <span>vientos </span> {dataAll.wind.speed} m/s
              </p>
              <p>
                <span>vientos </span> angulo {dataAll.wind.deg}°
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default WeekDate;
