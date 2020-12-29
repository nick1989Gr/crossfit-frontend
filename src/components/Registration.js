import React, { useState, useEffect } from "react";
import {
  getClassInfo,
  registerAthleteToClass,
  unregisterAthleteToClass,
} from "../api/crossfitClassesApi";
import Loading from "../components/misc/Loading";
import { Card, Image } from "semantic-ui-react";
import { formatDateVerbose, formatTime } from "../utils/dateUtils";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";
import { currentUserId } from "../globalVars";

export const Registration = (props) => {
  const [classInfo, setClassInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateClassInfo = () => {
    getClassInfo(props.id)
      .then((r) => {
        setClassInfo(r);
        setLoading(false);
      })
      .catch((e) => setError(e));
  };

  useEffect(() => {
    updateClassInfo();
    // eslint-disable-next-line
  }, []);

  const getInstructorCard = () => {
    return (
      <>
        <h2>Instructor(s)</h2>
        {classInfo.instructors.map((instructor) => {
          return (
            <Card key={instructor.id}>
              <Card.Content>
                <Image
                  floated="left"
                  size="mini"
                  src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                />
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
                    <Image
                      floated="left"
                      size="mini"
                      src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                    />
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
        {classInfo.athletes.some((a) => a.id === currentUserId) ? (
          <>
            <Alert severity="success">You are enrolled for this class</Alert>
            <Button
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

  const registerAthlete = () => {
    registerAthleteToClass(currentUserId, classInfo.id)
      .then((r) => updateClassInfo())
      .catch((e) => {
        throw e;
      });
  };

  const unregisterAthlete = () => {
    unregisterAthleteToClass(currentUserId, classInfo.id)
      .then((r) => updateClassInfo())
      .catch((e) => {
        throw e;
      });
  };

  const getAvailableSlots = () => {
    return classInfo.maxParticipants - classInfo.athletes.length;
  };

  if (loading) return <Loading />;
  if (error) throw error;

  // Handle what happens in case of no space left
  return (
    <>
      <h1>
        {classInfo.type} | {formatDateVerbose(new Date(classInfo.ts))} |{" "}
        {formatTime(new Date(classInfo.ts))}
      </h1>
      {getRegisterButton()}

      {getInstructorCard()}
      {getAthletesCards()}
    </>
  );
};

export default Registration;
