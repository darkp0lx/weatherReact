import React from "react";
import WeatherPng from "../assets/img/weather.svg";
import "../assets/styles/Header.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../redux/WeatherDucks";
const api = {
  key: "6d07f9d94795d82e4b24c055e4789754",
  base: "http://api.openweathermap.org/data/2.5/",
};
const Header = () => {
  let aux=0
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState();
  const [show, SetShow] = useState(false);
  const [lugar, SetLugar] = useState();

  useEffect(() => {
    getLocation();
  }, []);
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handlePosition);
    } else {
      console.log("error Location");
    }
  }

  const handlePosition = (position) => {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    console.log(location);
  };
  const builderDate = (d) => {
    let months = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "setiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    let days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
    let day = days[d.getDay()];
    let month = months[d.getMonth() - 1];
    let year = d.getFullYear();

    return (
      <React.Fragment>
        <h2>{day}</h2>
        <h2>{month}</h2>
        <h2>{year}</h2>
      </React.Fragment>
    );
  };

  const Search = (evt) => {
    if (evt.key == "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}
      `)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery(result.main);
          dispatch(getData(result));
          const input = document.querySelector("#input");
          input.value = "";
        });
      SetShow(true);
    }
  };
  const obtenerData = () => {
    !location == false 
      ? fetch(
          `${api.base}weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&APPID=${api.key}`
        )
          .then((res) => res.json())
          .then((result) => {
            SetLugar(result);
            if(show==false&& aux==0){
              dispatch(getData(result));
              aux++
              console.log(aux)
            }
          })
      : console.log("no puedo escribir");
  };
  return (
    <div className="Header" style={{ textAlign: "center" }}>
      <input
        type="text"
        placeholder="Buscar por lugar..."
        name="place"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyPress={Search}
        id="input"
      />
      <img src={WeatherPng} alt="" />
      {show ? (
        <div className="info">
          <div className="container">
            <div className="city">
              <h1>{Math.round(query.temp)}°C</h1>
              <h1>{weather.name}</h1>
            </div>
            <div className="date">{builderDate(new Date())}</div>
          </div>
        </div>
      ) : !location == false ? (
        <div className="info" onLoad={obtenerData()}>
          <div className="container" onLoad={() => dispatch(getData(result))}>
            {!lugar == false ? (
              <div className="city">
                <h1>{Math.round(lugar.main.temp)}°C</h1>
                <h1>{lugar.name}</h1>
              </div>
            ) : (
              ""
            )}
            <div className="date">{builderDate(new Date())}</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Header;
