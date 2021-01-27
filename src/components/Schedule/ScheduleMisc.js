import { makeStyles } from "@material-ui/core/";

export const WORKING_HOURS = [
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
  "18:00:00",
  "19:00:00",
  "20:00:00",
  "21:00:00",
];

export const useScheduleStyles = makeStyles({
  container: {
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
    overflow: "visible ",
  },
  table: {
    minWidth: 50,
    maxWidth: 850,
    border: "2px solid black",
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
    top: 20,
  },
  tableHeader: {
    backgroundColor: "#424242",
  },
  headerCell: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    margin: 1,
  },
});

export const getButtonStyle = (buttonType, availableSlots) => {
  if (availableSlots === 0) buttonType = "no room left";
  const noRoomButton = {
    backgroundColor: "#ff5722",
  };
  const wodButton = {
    backgroundColor: "#80cbc4",
  };
  const calisthenicsButton = {
    backgroundColor: "#cddc39",
  };
  const weightLiftingButton = {
    backgroundColor: "#43a047",
  };
  const defaultButton = {
    backgroundColor: "#b39ddb",
  };

  switch (buttonType) {
    case "wod":
      return wodButton;
    case "calisthenics":
      return calisthenicsButton;
    case "weight lifting":
      return weightLiftingButton;
    case "no room left":
      return noRoomButton;
    default:
      return defaultButton;
  }
};
