import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginAlert from "../misc/LoginAlert";
import { Card } from "semantic-ui-react";
import { useProfileStyles } from "./ProfileMisc";
import { getToken } from "../../utils/authenticationUtils.js";
import Loading from "../misc/Loading";
import { getAthleteByEmail } from "../../api/athleteApi";
import { formatDate } from "../../utils/dateUtils";

const Profile = () => {
  const classes = useProfileStyles();
  const [athlete, setAthlete] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const updateAthlete = async () => {
      const accessToken = await getToken(getAccessTokenSilently);
      getAthleteByEmail(user.email, accessToken)
        .then((r) => {
          setAthlete(r);
          setLoading(false);
        })
        .catch((e) => setError(e));
    };
    updateAthlete();
    // eslint-disable-next-line
  }, []);

  if (!isAuthenticated) return <LoginAlert />;
  if (loading) return <Loading />;
  if (error) throw error;

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
