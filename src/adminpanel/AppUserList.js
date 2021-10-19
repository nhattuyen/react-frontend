import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBan,
    faCheck,
    faCheckCircle,
    faCheckSquare,
    faCircle,
    faEdit,
    faList, faSquare,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import {ButtonGroup, Card, Table} from "react-bootstrap";
import axios from "axios";
import * as appUserList from "react-bootstrap/ElementChildren";
import {Link} from "react-router-dom";
import MyMessage from "../components/MyMessage";

function AppUserList() {

    const iconMenu = <FontAwesomeIcon icon={faList} />

    const [showState, setShowState] = useState(false);

    const [appUserList, setAppUserList] = useState([]);

    useEffect( () => {
        getAllAppUsers();
    },[]);

    function getAllAppUsers() {
        axios.get("/appusers")
            .then(response => response.data)
            .then((data) => {
                setAppUserList(data);
            });
    }

    function deleteAppUser(appUserId) {
        axios.delete("/appuser/"+appUserId)
            .then(response => {
               if (response.data !== null) {
                   setShowState(true);
                   setTimeout(() => setShowState(false), 3000);
                   setAppUserList(appUserList.filter(appUser => appUser.appUserId !== appUserId));
               } else {
                   setShowState(false);
               }
            });
    }

    return (<div>
        <div style={{"display": showState ? "block" : "none"}}>
            <MyMessage show = {showState} message = {"AppUser has been deleted successfully."} type = {"success"} />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>{iconMenu} AppUser List</Card.Header>
            <Card.Body>
                <Table bordered hover striped variant={"dark"}>
                    <thead>
                    <th>#</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Is Super Admin</th>
                    <th>Actions</th>
                    </thead>
                    <tbody>{appUserList.length === 0 ?
                    <tr align={"center"}>
                        <td colSpan={"6"}>No AppUser available.</td>
                    </tr> : appUserList.map((appUser) => (<tr>
                        <td>{appUser.appUserId}</td>
                        <td>{appUser.username}</td>
                        <td>{!appUser.roleTitle ? " - " : appUser.role.roleTitle}</td>
                        <td>{appUser.email}</td>
                        <td>{appUser.isSuperAdmin ? <FontAwesomeIcon icon={faCheckSquare} /> : <FontAwesomeIcon icon={faSquare} />}</td>
                            <td><ButtonGroup>
                                <Link to={"/appuser/"+appUser.appUserId} className={"nav-link"} ><FontAwesomeIcon icon={faEdit} />{' '}Edit</Link>
                                <button type={"button"} className={"btn btn-outline-danger btn-sm"} onClick={deleteAppUser.bind(this, appUser.appUserId)}><FontAwesomeIcon icon={faTrash} />{' '}Delete</button>
                            </ButtonGroup></td>
                    </tr>))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    </div>);
}

export default AppUserList;