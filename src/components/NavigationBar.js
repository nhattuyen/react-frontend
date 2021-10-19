import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

function NavigationBar() {

    return (
        <Navbar bg="dark" variant="dark">
            <Link to={""} className={"navbar-brand"}>
                <img src={require('./../images/image-users.jpg')}  alt={'Logo'}/>Employee Department
            </Link>
            <Nav className="me-auto">
                <Link to={"employee"}  className={"nav-link"}>Add Employee</Link>
                <Link to={"employees"}  className={"nav-link"}>Employee List</Link>
            </Nav>
            <Nav className="navbar-right">
                <Link to={"users"} className={"nav-link"}>Register</Link>
                <Link to={"users"} className={"nav-link"}>Login</Link>
            </Nav>
        </Navbar>
    );
}

export default NavigationBar;