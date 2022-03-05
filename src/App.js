import "./styles.css";
import "./styles/main.scss";
import React from "react";
import { Switch } from "react-router";
import Home from "../src/pages/Home";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
// import "rsuite/dist/styles/rsuite-default.css";

export default function App() {
  return (
    <Switch>
      <PublicRoute path="/signin">
        <SignIn />
      </PublicRoute>
      <PrivateRoute path="/">
        <Home />
      </PrivateRoute>
    </Switch>
  );
}
