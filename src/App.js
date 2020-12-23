import "./App.css";
import PageNotFound from "./components/PageNotFound";
import NavigationBar from "./components/misc/NavigationBar";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route exact path="/">
          {/* <MenuList /> */}
        </Route>
        <Route path="/">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
