import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { menuOptionsData } from "../../utils/menuOptionsData";

const useStyles = makeStyles((theme) => ({
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

export default function TitlebarGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} spacing={30} cols={3}>
        <GridListTile
          key="Subheader"
          cols={3}
          style={{ height: "auto" }}
        ></GridListTile>
        {menuOptionsData.map((tile) => (
          <GridListTile key={tile.img}>
            <img
              className={classes.image}
              src={tile.img}
              alt={tile.title}
              onClick={() => console.log("Hello")}
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
}
