import React from "react";
import { Grid, Row, Col } from "rsuite";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <Grid fluid className="h-100">
      <Row className="h-100">
        <Col xs={24} md={8} className="h-100">
          <Sidebar />
        </Col>
      </Row>
    </Grid>
  );
}
