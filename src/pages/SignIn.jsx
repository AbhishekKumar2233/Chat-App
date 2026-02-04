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
  Alert,
  IconButton,
  FacebookOfficialIcon
} from "rsuite";
import { ref, onValue, set, onDisconnect, get, serverTimestamp, getDatabase } from "firebase/database"; // Firebase v9+ imports
import { auth, database } from "../mics/config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const SignIn = () => {
  const signInWithProvider = async (provider) => {
    // const result = await auth.signInWithPopup(provider);
    // console.log(result);
    try {
      const additionalUserInfo= await signInWithPopup(auth,provider);
      console.log(additionalUserInfo,"additionalUserInfo")
      const user = result.user; // Get user information from the result
      if (additionalUserInfo.isNewUser) {
        await set(ref(database,`/profiles/${user.uid}`),{
          name: user.displayName,
          createdAt: serverTimestamp()
        });
      }
      // alert("Sign In");
    } catch (err) {
      // console.log(err,"jkjkjkjkjkkjk")
      // alert("err.message");
    }
  };

  // const signInWithProvider = async (provider) => {
  //   try {
  //     const result = await signInWithPopup(auth, provider); // Sign in with the chosen provider (Google)
  //     const user = result.user; // Get user information from the result

  //     // Check if it's a new user
  //     if (result.additionalUserInfo.isNewUser) {
  //       // Save user profile to the database
  //       await set(ref(database, `/profiles/${user.uid}`), {
  //         name: user.displayName,
  //         email: user.email,
  //         createdAt: serverTimestamp(), // Use server timestamp for creation time
  //       });
  //     }

  //     // Success alert
  //     alert("Sign In Successful");
  //   } catch (err) {
  //     // Error alert if something goes wrong
  //     alert("Error during Sign In: " + err.message);
  //   }
  // };

  const onGoogleSignIn = () => {
    const provider = new GoogleAuthProvider(); // Create Google Auth provider
    signInWithProvider(provider); // Call the sign-in function with Google provider
    console.log("Google Sign In");
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
                  {/* <Button block color="blue" appearance="primary">
                    Continue with Facebook
                  </Button> */}
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

