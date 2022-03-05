import React from "react";
// import { Container, Grid, Row, Col, Panel } from "rsuite/dist/styles/rsuite-default.css";
import {
  Container,
  Grid,
  Col,
  Row,
  Panel,
  Button,
  ButtonToolbar,
  IconButton,
  FacebookOfficialIcon
} from "rsuite";
import firebase from "firebase/app";
import { auth, database } from "../mics/config";

const SignIn = () => {
  const signInWithProvider = async (provider) => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        });
      }

      alert.success("Sign In", 4000);
    } catch (err) {
      alert.error(err.message, 4000);
    }
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to Chat App</h2>
                <p>Dear User</p>
              </div>

              <div className="mt-3">
                <ButtonToolbar>
                  <Button block color="blue" appearance="primary">
                    Continue with Facebook
                  </Button>
                  <Button block color="green" appearance="primary">
                    Continue with Google
                  </Button>
                </ButtonToolbar>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
