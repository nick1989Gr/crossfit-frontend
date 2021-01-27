import React from "react";
import { Card } from "semantic-ui-react";

import Grid from "@material-ui/core/Grid";
import { useAuthFetch } from "../../services/useAuthFetch";
import Loading from "../misc/Loading";
import LoginAlert from "../misc/LoginAlert";
import { useInstructorsStyles, INSTRUCTOR_IMG } from "./InstructorsMisc";

export const Instructors = () => {
  const classes = useInstructorsStyles();

  const { data: instructors, error, loading, isAuthenticated } = useAuthFetch(
    "/api/v1/instructors"
  );

  if (!isAuthenticated) return <LoginAlert />;
  if (loading) return <Loading />;
  if (error) throw error;

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={2} data-testid="instructors-grid">
          {instructors.map((instructor) => (
            <Grid item xs={4} key={instructor.id}>
              <Card
                className={classes.card}
                image={instructor.image ? instructor.image : INSTRUCTOR_IMG}
                header={`${instructor.firstName} ${instructor.lastName}`}
                meta={instructor.email}
                description={instructor.bio}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Instructors;
