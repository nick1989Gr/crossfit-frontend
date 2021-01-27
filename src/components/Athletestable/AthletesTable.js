import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core/";
import { useAuthFetch } from "../../services/useAuthFetch";
import Loading from "../misc/Loading";
import LoginAlert from "../misc/LoginAlert";
import ErrorHandler from "../misc/ErrorHandler";
import { useAthleteTableStyles, athletesFields } from "./AthletesTableMisc";

export const AthletesTable = () => {
  const classes = useAthleteTableStyles();
  const { data: athletes, loading, error, isAuthenticated } = useAuthFetch(
    "/api/v1/athletes"
  );

  if (!isAuthenticated) return <LoginAlert />;
  if (loading) return <Loading />;
  if (error) return <ErrorHandler error={error} />;

  return (
    <TableContainer className={classes.container} data-testid="table-container">
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.tableHeader}>
          <TableRow>
            {athletesFields.map((field) => (
              <TableCell key={field} className={classes.headerCell}>
                {field}
              </TableCell>
            ))}
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
