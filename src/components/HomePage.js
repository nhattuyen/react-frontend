import React from "react";
import {Route, useLocation} from "react-router-dom"
import NavigationBar from "./NavigationBar";
import {Col, Container, Row} from "react-bootstrap";
import Welcome from "./Welcome";
import Footer from "./Footer";

const HomePage = ({component: Component, ...rest}) => {

    const location = useLocation();

    const marginTop = {
        marginTop:"20px"
    };
    const heading = "Hello, world!";
    const description = "This is the React and Spring Boot Restful API app.";

    return (
      <Route {...rest}>
          <NavigationBar/>
          <Container>
              <Row>
                  <Col lg={12} style={marginTop}>
                      <Welcome heading={heading} desc={description}/>
                  </Col>
              </Row>
          </Container>
          <Footer/>
      </Route>
    );
}

export default HomePage;