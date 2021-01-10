import React from "react";
import Alert from "@material-ui/lab/Alert";

export const LoginAlert = () => {
  return <Alert severity="warning"  data-testid="login-alert">You need to log in first</Alert>;
};

export default LoginAlert;
