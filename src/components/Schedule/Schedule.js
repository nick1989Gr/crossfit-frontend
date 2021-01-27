import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogContent,
} from "@material-ui/core/";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import IconButton from "@material-ui/core/IconButton";
import {
  formatDate,
  formatDateVerbose,
  getPreviousWeekDate,
  getNextWeekDate,
  getWeekDays,
  FIRST,
  LAST,
} from "../../utils/dateUtils";
import Loading from "../misc/Loading";
import LoginAlert from "../misc/LoginAlert";
import { getScheduleForAthlete } from "../../api/scheduleApi";
import Registration from "../Registration";
import { useAuth0 } from "@auth0/auth0-react";
import { getToken } from "../../utils/authenticationUtils.js";
import { getAthleteByEmail } from "../../api/athleteApi";
import {
  useScheduleStyles,
  getButtonStyle,
  WORKING_HOURS,
} from "./ScheduleMisc";

export const Schedule = () => {
  const classes = useScheduleStyles();
  const [startDay, setStartDay] = useState(new Date());
  const [schedule, setSchedule] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [popup, setPopup] = useState({
    open: false,
    classId: null,
    availableSlots: null,
  });

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const updateSchedule = async () => {
    const accessToken = await getToken(getAccessTokenSilently);
    const athlete = await getAthleteByEmail(user.email, accessToken);
    setUserId(athlete.data.id);

    const weekDays = getWeekDays(startDay);
    getScheduleForAthlete(
      weekDays[FIRST],
      weekDays[LAST],
      athlete.data.id,
      accessToken
    )
      .then((r) => {
        setSchedule(r.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(new Error(error.response.status));
      });
  };

  useEffect(() => {
    updateSchedule();
    // eslint-disable-next-line
  }, [startDay]);

  const getButtonIcon = (availableSlots, athleteIsEnrolled) => {
    if (athleteIsEnrolled) return <HowToRegIcon />;
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
                      endIcon={getButtonIcon(
                        c.availableSlots,
                        c.athleteEnrolled
                      )}
                      onClick={() => {
                        setPopup({
                          open: true,
                          classId: c.crossfitClassId,
                          availableSlots: c.availableSlots,
                        });
                      }}
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

  const getPopUpWindow = () => {
    return (
      <>
        {popup.open && (
          <Dialog
            open={popup.open}
            onClose={() => {
              setPopup({
                open: false,
                classId: null,
                availableSlots: null,
              });
              updateSchedule();
            }}
            fullWidth={true}
          >
            <DialogContent>
              <Registration id={popup.classId} userId={userId} />
            </DialogContent>
          </Dialog>
        )}
      </>
    );
  };

  if (!isAuthenticated) return <LoginAlert />;
  if (loading) return <Loading />;
  if (error) throw error;

  return (
    <>
      <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          {getCallendarHeader()}
          <TableBody>{getCallendarBody()}</TableBody>
        </Table>
      </TableContainer>
      {getPopUpWindow()}
    </>
  );
};

export default Schedule;
