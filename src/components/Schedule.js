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
  getWeekNumber,
  getOneWeekBack,
  getOneWeekForward,
  formatDate,
  getWeekDates,
  NUM_WEEK_DAYS,
} from "../utils/dateUtils";

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
    backgroundColor: "#484648",
  },
  headerCell: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export const Schedule = () => {
  const classes = useStyles();
  const [weekInYear, setWeekInYear] = useState(getWeekNumber(new Date()));
  console.log(weekInYear);

  const getCallendarHeader = () => {
    return (
      <TableHead className={classes.tableHeader}>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell className={classes.headerCell}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => setWeekInYear(getOneWeekBack(weekInYear))}
            >
              <ArrowBackIcon />
            </IconButton>
          </TableCell>
          <TableCell className={classes.headerCell}>
            {weekInYear.weekNo}
          </TableCell>
          <TableCell className={classes.headerCell}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => setWeekInYear(getOneWeekForward(weekInYear))}
            >
              <ArrowForwardIcon />
            </IconButton>
          </TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          {getWeekDates(weekInYear.firstDay).map((d, i) => (
            <TableCell className={classes.headerCell} key={i}>
              {formatDate(d)}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const getCallendarBody = () => {};

  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        {getCallendarHeader()}
      </Table>
      <TableBody></TableBody>
    </TableContainer>
  );
};

export default Schedule;
