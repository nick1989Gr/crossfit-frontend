import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#484648",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "transparent",
    color: "#F9F6F5",
  },
  avantar: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export const NavigationBar = () => {
  const classes = useStyles();
  let history = useHistory();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const onHomeButtonClick = () => {
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={onHomeButtonClick}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Crossfit App
          </Typography>
          {!isAuthenticated ? (
            <LoginButton />
          ) : (
            <div className={classes.avantar}>
              <Avatar alt={user.name} src={user.picture} />
              <LogoutButton />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
