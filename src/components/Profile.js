import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginAlert from "../components/misc/LoginAlert";
import { Card } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";
import { getToken } from "../utils/authenticationUtils.js";
import Loading from "../components/misc/Loading";
import { getAthleteByEmail } from "../api/athleteApi";
import { formatDate } from "../utils/dateUtils";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  card: {
    textAlign: "center",
    top: 20,
    left: "40%",
    marginLeft: 20,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [athlete, setAthlete] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function updateAthlete() {
    const accessToken = await getToken(getAccessTokenSilently);
    getAthleteByEmail(user.email, accessToken)
      .then((r) => {
        setAthlete(r);
        setLoading(false);
      })
      .catch((e) => setError(e));
  }

  useEffect(() => {
    updateAthlete();
  }, []);

  if (!isAuthenticated) return <LoginAlert />;
  if (loading) return <Loading />;
  if (error) throw error;
  console.log(athlete);
  return (
    <div className={classes.root}>
      <Card
        className={classes.card}
        image={user.picture}
        header={user.name}
        meta={user.email}
        description={
          <>
            <p>Date of birth: {formatDate(athlete.dateOfBirth)}</p>
            <p>Enrolled date: {formatDate(athlete.enrolledDate)}</p>
            <p>Phone number: {athlete.phoneNumber}</p>
          </>
        }
      />
    </div>
  );
};

export default Profile;
