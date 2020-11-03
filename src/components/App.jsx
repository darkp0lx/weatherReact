import React from "react";
import Header from "./Header";
import WeekDate from "./WeekDate";
import "../assets/styles/App.scss";
import { Provider } from "react-redux";
import generateStore from "../redux/Store";
const App = () => {
  const store = generateStore();
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <WeekDate />
      </div>
    </Provider>
  );
};
export default App;
