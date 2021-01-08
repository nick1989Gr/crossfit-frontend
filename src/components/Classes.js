import React, { useState, useEffect } from "react";
import { getCrossfitClassesInfo } from "../api/crossfitClassesApi";
import { makeStyles } from "@material-ui/core/styles";
import wod from "../resources/images/wod.PNG";
import { Card } from "semantic-ui-react";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  card: {
    textAlign: "center",
    top: 20,
    left: "30%",
    marginLeft: 20,
  },
}));

export const Classes = () => {
  const [classInfo, setClassInfo] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getCrossfitClassesInfo()
      .then((r) => setClassInfo(r))
      .catch((e) => {
        throw e;
      });
  }, []);

  return (
    <>
      <h1> About our classes</h1>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={1}>
          {classInfo.map((c) => (
            <Grid item xs={3} key={c.id}>
              <Card
                className={classes.card}
                image={wod}
                header={`${c.className}`}
                meta="Available class"
                description={c.description}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Classes;
