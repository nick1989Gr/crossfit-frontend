import "./App.css";
import PageNotFound from "./components/misc/PageNotFound";
import NavigationBar from "./components/misc/NavigationBar";
import { Switch, Route } from "react-router-dom";
import MenuList from "./components/misc/MenuList";
import AthletesTable from "./components/AthletesTable";
import Instructors from "./components/Instructors";
import Schedule from "./components/Schedule";
import Profile from "./components/Profile";
import Classes from "./components/Classes";
import Achievements from "./components/Achievements";
import NewAthlete from "./components/NewAthlete";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route exact path="/">
          <MenuList />
        </Route>
        <Route exact path="/athletes">
          <AthletesTable />
        </Route>
        <Route exact path="/instructors">
          <Instructors />
        </Route>
        <Route exact path="/schedule">
          <Schedule />
        </Route>
        <Route exact path="/classes">
          <Classes />
        </Route>
        <Route exact path="/achievements">
          <Achievements />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/new_athlete">
          <NewAthlete />
        </Route>
        <Route path="/">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
