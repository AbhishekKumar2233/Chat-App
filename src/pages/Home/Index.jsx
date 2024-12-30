import React from "react";
import { Grid, Row, Col } from "rsuite";
import Sidebar from "../../components/Sidebar";
import { RoomsProvider } from "../../context/RoomContext";
import { Room2Provider } from "../../context/Room2Context";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Chat from "./Chat";
import { useMediaQuery } from "../../mics/custom-hook";


const Home = () => {
  const isDesktop = useMediaQuery("(min-width:992px)");
  const { isExact } = useRouteMatch();

  const canRenderSidebar = isDesktop || isExact;

  return (
    <>
      <RoomsProvider>
        <Grid fluid className="h-100">
          <Row className="h-100">
            {canRenderSidebar && (
              <Col xs={24} md={8} className="h-100">
                <Sidebar />
              </Col>
            )}

            <Switch>
              <Route exact path="/chat/:chatId">
                <Col xs={24} md={16} className="h-100">
                  <Chat />
                </Col>
              </Route>
            </Switch>
          </Row>
        </Grid>
      </RoomsProvider>
      {/* <Room2Provider>
        <Grid fluid className="h-100">
          <Row className="h-100">
            {canRenderSidebar && (
              <Col xs={24} md={8} className="h-100">
                <Sidebar />
              </Col>
            )}

            <Switch>
              <Route exact path="/chat/:chatId">
                <Col xs={24} md={16} className="h-100">
                  <Chat />
                </Col>
              </Route>
            </Switch>
          </Row>
        </Grid>
      </Room2Provider> */}
    </>
  );
};

export default Home;
