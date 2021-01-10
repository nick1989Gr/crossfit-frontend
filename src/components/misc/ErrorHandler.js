import React, { useEffect, useState } from "react";
import Alert from "@material-ui/lab/Alert";

export const ErrorHandler = (props) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    let msg = `Code error: ${props.error.status} | `;
    switch (props.error.status) {
      case 403:
        msg += "You are not authorized to access this page";
        setMessage(msg);
        break;
      default:
        break;
    }
  }, [props]);

  return <Alert severity="error" data-testid="error-handler">{message}</Alert>;
};

export default ErrorHandler;
