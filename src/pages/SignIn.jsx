import React from "react";
// import { Container, Grid, Row, Col, Panel } from "rsuite/dist/styles/rsuite-default.css";
import { Container, Grid, Col, Row, Panel } from "rsuite";
// import Col from "rsuite/lib/Carousel";

const SignIn = () => {
  return (
    <Container>
      <Grid>
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to Chat App</h2>
                <p>Dear User</p>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
