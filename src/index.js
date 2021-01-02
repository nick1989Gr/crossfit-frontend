import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Auth0Provider
        domain="crossfitapp-dev.eu.auth0.com"
        clientId="I9McoPMQ4kxhKDUhlJ9NILvXNvBB6U5G"
        redirectUri="http://localhost:3000/"
        audience="https://crossfitapp-dev.eu.auth0.com/api/v2/"
        scope="read:current_user update:current_user_metadata"
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
