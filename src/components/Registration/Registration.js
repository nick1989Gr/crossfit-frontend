import React, { useState, useEffect } from "react";
import {
  getAnalyticalClassInfo,
  registerAthleteToClass,
  unregisterAthleteToClass,
} from "../../api/crossfitClassesApi";
import Loading from "../../components/misc/Loading";
import LoginAlert from "../../components/misc/LoginAlert";
import { Card, Image } from "semantic-ui-react";
import { formatDateVerbose, formatTime } from "../../utils/dateUtils";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";
import { useAuth0 } from "@auth0/auth0-react";
import { getToken } from "../../utils/authenticationUtils.js";

export const Registration = (props) => {
  const [classInfo, setClassInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const PERSONA_IMG =
    "https://react.semantic-ui.com/images/avatar/large/steve.jpg";

  const updateClassInfo = async () => {
    const accessToken = await getToken(getAccessTokenSilently);
    await getAnalyticalClassInfo(props.classId, accessToken)
      .then((r) => {
        setClassInfo(r.data);
        setLoading(false);
      })
      .catch((e) => setError(new Error(e.response.status)));
  };

  useEffect(() => {
    updateClassInfo();
    // eslint-disable-next-line
  }, [props]);

  const getInstructorCard = () => {
    return (
      <>
        <h2>Instructor(s)</h2>
        {classInfo.instructors.map((instructor) => {
          return (
            <Card key={instructor.id}>
              <Card.Content>
                <Image floated="left" size="mini" src={PERSONA_IMG} />
                <Card.Header>
                  {instructor.firstName} {instructor.lastName}
                </Card.Header>
                <Card.Meta>{instructor.email}</Card.Meta>
                <Card.Description>{instructor.bio}</Card.Description>
              </Card.Content>
            </Card>
          );
        })}
      </>
    );
  };

  const getAthletesCards = () => {
    return (
      <>
        <h2>Enrolled Athletes</h2>
        {classInfo.athletes.length !== 0 ? (
          <Card.Group>
            {classInfo.athletes.map((athlete) => {
              return (
                <Card key={athlete.id}>
                  <Card.Content>
                    <Image floated="left" size="mini" src={PERSONA_IMG} />
                    <Card.Header>
                      {athlete.firstName} {athlete.lastName}
                    </Card.Header>
                    <Card.Meta>{athlete.email}</Card.Meta>
                  </Card.Content>
                </Card>
              );
            })}
          </Card.Group>
        ) : (
          <Alert severity="info">Class is empty.</Alert>
        )}
      </>
    );
  };

  const getRegisterButton = () => {
    return (
      <>
        {classInfo.athletes.some((a) => a.id === props.userId) ? (
          <>
            <Alert severity="success">You are enrolled for this class</Alert>
            <Button
              data-testid="unregister-button"
              style={{ margin: 15 }}
              variant="contained"
              size="large"
              color="inherit"
              endIcon={<DeleteIcon />}
              onClick={() => unregisterAthlete()}
            >
              Unregister
            </Button>
          </>
        ) : getAvailableSlots() !== 0 ? (
          <>
            <Alert severity="info">{getAvailableSlots()} available slots</Alert>
            <Button
              data-testid="register-button"
              style={{ margin: 15 }}
              variant="contained"
              size="large"
              color="inherit"
              endIcon={<BorderColorIcon />}
              onClick={() => registerAthlete()}
            >
              Register
            </Button>
          </>
        ) : (
          <Alert severity="error">Class is Full</Alert>
        )}
      </>
    );
  };

  const registerAthlete = async () => {
    const accessToken = await getToken(getAccessTokenSilently);
    registerAthleteToClass(props.userId, classInfo.id, accessToken)
      .then((r) => updateClassInfo())
      .catch((e) => {
        throw new Error(error.response.status);
      });
  };

  const unregisterAthlete = async () => {
    const accessToken = await getToken(getAccessTokenSilently);
    unregisterAthleteToClass(props.userId, classInfo.id, accessToken)
      .then((r) => updateClassInfo())
      .catch((e) => {
        throw new Error(error.response.status);
      });
  };

  const getAvailableSlots = () => {
    return classInfo.maxParticipants - classInfo.athletes.length;
  };

  if (!isAuthenticated) return <LoginAlert />;
  if (loading) return <Loading />;
  if (error) throw error;

  return (
    <div data-testid="registration">
      <h1>
        {classInfo.type} | {formatDateVerbose(new Date(classInfo.ts))} |{" "}
        {formatTime(new Date(classInfo.ts))}
      </h1>
      {getRegisterButton()}

      {getInstructorCard()}
      {getAthletesCards()}
    </div>
  );
};

export default Registration;
