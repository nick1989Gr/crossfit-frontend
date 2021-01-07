import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { AUDIENCE } from "./globalVars";

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Auth0Provider
        domain="crossfitapp-dev.eu.auth0.com"
        clientId="I9McoPMQ4kxhKDUhlJ9NILvXNvBB6U5G"
        redirectUri="http://localhost:3000/"
        audience={AUDIENCE}
        scope="read:classes"
        useRefreshTokens={true}
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
