import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  Button,
} from "@material-ui/core/";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import {
  formatDate,
  formatDateVerbose,
  getPreviousWeekDate,
  getNextWeekDate,
  getWeekDays,
  FIRST,
  LAST,
} from "../utils/dateUtils";
import Loading from "../components/misc/Loading";
import { getSchedule } from "../api/scheduleApi";

const WORKING_HOURS = [
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
const useStyles = makeStyles({
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

export const Schedule = () => {
  const classes = useStyles();
  const [startDay, setStartDay] = useState(new Date());
  const [schedule, setSchedule] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const weekDays = getWeekDays(startDay);
    getSchedule(weekDays[FIRST], weekDays[LAST])
      .then((r) => {
        setSchedule(r);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, [startDay]);

  if (loading) return <Loading />;
  if (error) throw error;
  console.log(schedule);

  const getButtonStyle = (buttonType, availableSlots) => {
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

  const getButtonIcon = (availableSlots) => {
    return availableSlots === 0 ? <CloseIcon /> : <AddIcon />;
  };

  const getCallendarHeader = () => {
    return (
      <TableHead className={classes.tableHeader}>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell className={classes.headerCell}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => setStartDay(getPreviousWeekDate(startDay))}
            >
              <ArrowBackIcon />
            </IconButton>
          </TableCell>
          <TableCell className={classes.headerCell}> Week</TableCell>
          <TableCell className={classes.headerCell}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => setStartDay(getNextWeekDate(startDay))}
            >
              <ArrowForwardIcon />
            </IconButton>
          </TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.headerCell}>Time</TableCell>
          {getWeekDays(startDay).map((d, i) => (
            <TableCell className={classes.headerCell} key={i}>
              {formatDateVerbose(d)}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const getCallendarBody = () => {
    return (
      <>
        {WORKING_HOURS.map((hour) => (
          <TableRow key={hour}>
            <TableCell>{hour}</TableCell>
            {getWeekDays(startDay).map((day) => (
              <TableCell key={day}>
                {schedule
                  .filter(
                    (c) =>
                      c.classTime === hour && c.classDate === formatDate(day)
                  )
                  .map((c, i) => (
                    <Button
                      style={getButtonStyle(c.classType, c.availableSlots)}
                      key={i}
                      variant="contained"
                      size="small"
                      color="inherit"
                      className={classes.button}
                      endIcon={getButtonIcon(c.availableSlots)}
                    >
                      {c.classType}({c.availableSlots})
                    </Button>
                  ))}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    );
  };

  return (
    <>
      <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          {getCallendarHeader()}
          <TableBody>{getCallendarBody()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Schedule;
