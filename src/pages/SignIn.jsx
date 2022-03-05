import React from "react";
import firebase from "firebase/app";
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
import { auth } from "../mics/config";
// import Col from "rsuite/lib/Carousel";

const SignIn = () => {
  const signInWithProvider = async (provider) => {
    const result = await auth.signInWithPopup(provider);
    console.log(result);
  };

  const onFacebookSignIn = () => {
    signInWithProvider(new firebase.auth.FacebookAuthProvider());
  };

  const onGoogleSignIn = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
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
                  <Button
                    block
                    color="blue"
                    appearance="primary"
                    onClick={onFacebookSignIn}
                  >
                    Continue with Facebook
                  </Button>
                  <Button
                    block
                    color="green"
                    appearance="primary"
                    onClick={onGoogleSignIn}
                  >
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
