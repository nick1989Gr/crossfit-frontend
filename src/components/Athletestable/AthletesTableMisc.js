import { makeStyles } from "@material-ui/core/";

export const useAthleteTableStyles = makeStyles({
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

export const athletesFields = [
  "First name",
  "Last name",
  "Date of Birth",
  "Enrolled Date",
  "Phone number",
  "Email address",
];
