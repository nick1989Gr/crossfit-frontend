import React from "react";

import wod from "../../resources/images/wod.PNG";
import { Card } from "semantic-ui-react";
import Grid from "@material-ui/core/Grid";
import { useFetch } from "../../services/useFetch";
import Loading from "../misc/Loading";
import { useClassesStyles } from "./ClassesMisc";

export const Classes = () => {
  const classes = useClassesStyles();
  const { data: classInfo, loading, error } = useFetch("/api/v1/classes/info");

  if (loading) return <Loading />;
  if (error) throw error;

  return (
    <>
      <h1 data-testid="h1"> About our classes</h1>
      <Grid container spacing={1} data-testid="class-grid">
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
