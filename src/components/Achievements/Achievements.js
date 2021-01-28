import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getToken } from "../../utils/authenticationUtils.js";
import { getAthleteByEmail } from "../../api/athleteApi";
import Loading from "../misc/Loading";
import LoginAlert from "../misc/LoginAlert";
import {
  getAchievementsLogForAthlete,
  getTopAchievementsForExercise,
} from "../../api/achievementsApi";
import BarGraph from "../Graphs/BarGraph.js";
import Grid from "@material-ui/core/Grid";
import {
  useAchievementsStyles,
  EXERCISES_COLORS,
  EXERCISES,
} from "./AchievementsMisc";

export const Achievements = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [id, setId] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [athleteAchievements, setAthleteAchievements] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const classes = useAchievementsStyles();

  const updateAchievements = async () => {
    try {
      const accessToken = await getToken(getAccessTokenSilently);

      const athlete = await getAthleteByEmail(user.email, accessToken);
      setId(athlete.data.id);

      const promises = [
        getTopAchievementsForExercise(EXERCISES.SNATCH, accessToken),
        getTopAchievementsForExercise(EXERCISES.CLEAN, accessToken),
        getTopAchievementsForExercise(EXERCISES.BURPEES, accessToken),
        getAchievementsLogForAthlete(athlete.data.id, accessToken),
      ];

      const [
        snatchData,
        cleanData,
        burpeesData,
        athleteAchievementsData,
      ] = await Promise.all(promises);

      setExercises([snatchData.data, cleanData.data, burpeesData.data]);
      setAthleteAchievements(athleteAchievementsData.data);
      setLoading(false);
    } catch (e) {
      setError(new Error(e.response.status));
    }
  };

  useEffect(() => {
    updateAchievements();
    // eslint-disable-next-line
  }, []);

  if (!isAuthenticated) return <LoginAlert />;
  if (loading) return <Loading />;
  if (error) throw error;

  return (
    <>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={0}>
            {exercises.map((exercise) => (
              <Grid key={exercise.exerciseName} item>
                <h2
                  className={classes.h2}
                >{`Top ${exercise.exerciseName} athletes`}</h2>
                <BarGraph
                  data={exercise}
                  color={EXERCISES_COLORS[exercise.exerciseName]}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Achievements;
