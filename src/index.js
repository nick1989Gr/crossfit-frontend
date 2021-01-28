import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../node_modules/react-vis/dist/style.css";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { AUTH0_AUDIENCE, AUTH0_REDIRECT_URI } from "./globalConsts";

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={AUTH0_REDIRECT_URI}
        audience={AUTH0_AUDIENCE}
        scope="read:athletes"
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
