import React from "react";
import {Route} from "react-router-dom";
import AdminNavigationBar from "./AdminNavigationBar";
import {Col, Container, Row} from "react-bootstrap";
import AdminWelcome from "./AdminWelcome";


const AdminControlPanel = ({component: Component,...rest}) => {
    const marginTop = {
        marginLeft:"20px"
    };
    const heading = "Admin Panel";
    const description = "Admin panel to manipulate the React and Spring Boot Restful API app.";

    return (
        <Route {...rest}>
            <AdminNavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} style={marginTop}>
                        <AdminWelcome heading={heading} desc={description} />
                    </Col>
                </Row>
            </Container>
        </Route>
    );
}

export default AdminControlPanel