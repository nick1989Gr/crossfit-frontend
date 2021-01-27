import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import {
  menuItemsNoLogin,
  menuItemsForAthlete,
  menuItemsForNewUser,
} from "../../utils/menuOptionsData";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getToken } from "../../utils/authenticationUtils.js";
import { getAthleteByEmail } from "../../api/athleteApi";
import { NO_ATHLETE_FOUND_WITH_EMAIL_ADR } from "../../globalConsts";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    maxWidth: 1000,
    maxHeight: 1000,
    height: 500,
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  image: {
    cursor: "pointer",
  },
}));

export const TitlebarGridList = () => {
  const classes = useStyles();
  let history = useHistory();

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [menuItems, setMenuItems] = useState(menuItemsNoLogin);

  useEffect(() => {
    const updateAthlete = async () => {
      const accessToken = await getToken(getAccessTokenSilently);
      getAthleteByEmail(user.email, accessToken)
        .then((_) => {
          setMenuItems(menuItemsForAthlete);
        })
        .catch((error) => {
          if (error.response.status === NO_ATHLETE_FOUND_WITH_EMAIL_ADR) {
            setMenuItems(menuItemsForNewUser);
          } else {
            throw error;
          }
        });
    };

    if (isAuthenticated) {
      updateAthlete();
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const getCellHeight = () => {
    if (JSON.stringify(menuItems) === JSON.stringify(menuItemsNoLogin))
      return 350;
    return 200;
  };

  const getCols = () => {
    if (JSON.stringify(menuItems) === JSON.stringify(menuItemsNoLogin))
      return 2;
    return 3;
  };

  return (
    <div className={classes.root}>
      <GridList cellHeight={getCellHeight()} spacing={30} cols={getCols()}>
        <GridListTile
          key="Subheader"
          cols={getCols()}
          style={{ height: "auto" }}
        ></GridListTile>
        {menuItems.map((tile) => (
          <GridListTile key={tile.title}>
            <img
              className={classes.image}
              src={tile.img}
              alt={tile.title}
              onClick={() => history.push(tile.path)}
            />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>{tile.subtitle}</span>}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default TitlebarGridList;
