import "./styles.css";
import "./styles/main.scss";
import React from "react";
import { Switch, Route } from "react-router";
import Home from "../src/pages/Home";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
// import "rsuite/dist/styles/rsuite-default.css";

export default function App() {
  return (
    <Switch>
      <Route to="/signin">
        <SignIn />
      </Route>
      <PrivateRoute path="/">
        <Home />
      </PrivateRoute>
    </Switch>
  );
}
