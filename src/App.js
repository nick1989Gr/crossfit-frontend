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
        <Route exact path="/athletes" component={AthletesTable} />
        <Route exact path="/instructors" component={Instructors} />
        <Route exact path="/schedule" component={Schedule} />
        <Route exact path="/classes" component={Classes} />
        <Route exact path="/achievements" component={Achievements} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/new_athlete" component={NewAthlete} />
        <Route path="/" component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
