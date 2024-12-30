import "./styles.css";
import "./styles/main.scss";
import React from "react";
import { Switch } from "react-router";
import Home from "../src/pages/Home/Index";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { ProfileProvider } from "./context/ProfileContext";
// import "rsuite/dist/styles/rsuite-default.css";
import "rsuite/dist/rsuite.min.css";

export default function App() {

  return (
    <ProfileProvider>
      <Switch>
      <PublicRoute path="/signin">
       <SignIn />
     </PublicRoute>
    <PrivateRoute path="/">
     <Home />
     </PrivateRoute>
     </Switch>
    </ProfileProvider>
  );
}
