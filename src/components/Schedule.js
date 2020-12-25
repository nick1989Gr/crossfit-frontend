import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
} from "@material-ui/core/";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import {
  formatDate,
  getPreviousWeekDate,
  getNextWeekDate,
  getWeekDays,
  NUM_WEEK_DAYS,
} from "../utils/dateUtils";

const WORKING_HOURS = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
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
    backgroundColor: "#9F3410",
  },
  headerCell: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export const Schedule = () => {
  const classes = useStyles();
  const [startDay, setStartDay] = useState(new Date());

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
              {formatDate(d)}
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
            {Array.from(Array(NUM_WEEK_DAYS), (_, index) => index + 1).map(
              (i) => (
                <TableCell key={i}>a</TableCell>
              )
            )}
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
