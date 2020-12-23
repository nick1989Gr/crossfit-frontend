import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

export const Loading = () => {
  return (
    <>
      <p data-testid="loading"> Loading... </p>
      <CircularProgress />
    </>
  );
};

export default Loading;
