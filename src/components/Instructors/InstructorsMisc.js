import { makeStyles } from "@material-ui/core/styles";

export const useInstructorsStyles = makeStyles(() => ({
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

export const INSTRUCTOR_IMG =
  "https://react.semantic-ui.com/images/avatar/large/elliot.jpg";
