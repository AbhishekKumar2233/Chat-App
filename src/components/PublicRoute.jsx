import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";

export default function PublicRoute({ children, ...routeProps }) {
  const { profile } = useProfile();

  if (profile) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Route {...routeProps}>{children}</Route>
    </div>
  );
}
