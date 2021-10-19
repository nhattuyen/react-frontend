import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

function AdminNavigationBar() {
    return (
        <Navbar bg="blue" variant={"dark"}>
            <Nav className="navbar-right">
                <Link to={"appuser"} className={"nav-link"}>Add AppUser</Link>
                <Link to={"appusers"} className={"nav-link"}>AppUser List</Link>
            </Nav>
            <Nav className="navbar-right">
                <Link to={"role"} className={"nav-link"}>Add Role</Link>
                <Link to={"roles"} className={"nav-link"}>Role List</Link>
            </Nav>
            <Nav className="navbar-right">
                <Link to={"permission"} className={"nav-link"}>Add Permission</Link>
                <Link to={"permissions"} className={"nav-link"}>Permission List</Link>
            </Nav>
            <Nav className="navbar-right">
                <Link to={"user"} className={"nav-link"}>Register</Link>
                <Link to={"login"} className={"nav-link"}>Login</Link>
            </Nav>
        </Navbar>
    );
}

export default AdminNavigationBar;