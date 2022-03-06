import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";
import { Container, Loader } from "rsuite";

export default function PublicRoute({ children, ...routeProps }) {
  const { profile, isLoading } = useProfile();

  if (isLoading && !profile) {
    return (
      <Container>
        <Loader center vertical size="md" content="Loading" speed="slow" />
      </Container>
    );
  }

  if (profile && !isLoading) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Route {...routeProps}>{children}</Route>
    </div>
  );
}
