import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
} from "@material-ui/core/";
import { useAuthFetch } from "../services/useAuthFetch";
import Loading from "../components/misc/Loading";
import LoginAlert from "../components/misc/LoginAlert";

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
  },
});

export const AthletesTable = () => {
  const classes = useStyles();
  const { data: athletes, loading, error, isAuthenticated } = useAuthFetch(
    "/api/v1/athletes"
  );

  if (!isAuthenticated) return <LoginAlert />;
  if (loading) return <Loading />;
  if (error) throw error;

  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.tableHeader}>
          <TableRow>
            <TableCell className={classes.headerCell}>First name</TableCell>
            <TableCell className={classes.headerCell}>Last name</TableCell>
            <TableCell className={classes.headerCell}>Date of Birth</TableCell>
            <TableCell className={classes.headerCell}>Enrolled Date</TableCell>
            <TableCell className={classes.headerCell}>Phone number</TableCell>
            <TableCell className={classes.headerCell}>Email address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {athletes.map((athlete) => (
            <TableRow key={athlete.id}>
              <TableCell>{athlete.firstName}</TableCell>
              <TableCell>{athlete.lastName}</TableCell>
              <TableCell>
                {new Date(athlete.dateOfBirth).toDateString()}
              </TableCell>
              <TableCell>
                {new Date(athlete.enrolledDate).toDateString()}
              </TableCell>
              <TableCell>{athlete.phoneNumber}</TableCell>
              <TableCell>{athlete.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AthletesTable;
