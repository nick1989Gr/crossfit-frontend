import { makeStyles } from "@material-ui/core/styles";

export const EXERCISES = {
  SNATCH: 1,
  CLEAN: 2,
  BURPEES: 3,
};

export const EXERCISES_COLORS = {
  Snatch: "#08CA1B",
  Clean: "#07D4CF",
  Burpees: "#E323F6",
};

export const EXERCISES_COLORS_MARKS = {
  Snatch: "#0B7C16",
  Clean: "#0B9693",
  Burpees: "#93189F",
};

export const useAchievementsStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  h2: {
    textAlign: "center",
    marginBottom: 2,
    fontFamily: "Roboto",
    fontWeight: "normal",
  },
  athleteAchievements: {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
    marginTop: 50,
  },
  topExercise: {
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
    marginTop: 50,
  },
}));
