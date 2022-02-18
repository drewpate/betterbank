import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import background from "./assets/images/moneyjar.jpeg";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(

  <React.StrictMode>
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
      }}
    > 
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);