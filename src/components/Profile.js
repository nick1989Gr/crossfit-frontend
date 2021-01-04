import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginAlert from "../components/misc/LoginAlert";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) return <LoginAlert />;
  return (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
