import React from "react";
import { Card } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useFetch } from "../services/useFetch";
import Loading from "../components/misc/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    textAlign: "center",
    top: 20,
    left: "20%",
    marginLeft: 20,
  },
}));

export const Instructors = () => {
  const classes = useStyles();
  const { data: instructors, loading, error } = useFetch("/api/v1/instructors");

  if (loading) return <Loading />;
  if (error) throw error;

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={2}>
          {instructors.map((instructor) => (
            <Grid item xs={4} key={instructor.id}>
              <Card
                className={classes.card}
                image={
                  instructor.image
                    ? instructor.image
                    : "https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
                }
                header={`${instructor.firstName} ${instructor.lastName}`}
                meta={instructor.email}
                description={instructor.bio}
                // extra={extra}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
  // return instructors.map((instructor) => (
  //   <Card
  //     key={instructor.id}
  //     image={
  //       instructor.image
  //         ? instructor.image
  //         : "https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
  //     }
  //     header={`${instructor.firstName} ${instructor.lastName}`}
  //     meta={instructor.email}
  //     description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
  //     // extra={extra}
  //   />
  // ));
};

export default Instructors;