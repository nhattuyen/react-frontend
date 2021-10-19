import MyMessage from "../components/MyMessage";
import {ButtonGroup, Card, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import axios from "axios";

function RoleList() {

    const iconMenu = <FontAwesomeIcon icon={faList} />

    const [showState, setShowState] = useState(false);

    const [roleList, setRoleList] = useState([{}]);

    useEffect( () => {
        getAllRoles();
    }, []);

    function getAllRoles() {
        axios.get("/roles")
            .then(response => response.data)
            .then((data) => {
                setRoleList(data);
            });
    }

    function deleteRole(roleId) {
        axios.delete("/role/" + roleId)
            .then(response  => {
                    if(response.data != null) {
                        setShowState(true);
                        setTimeout(() => setShowState(false), 3000);
                        setRoleList(roleList.filter(role => role.roleId !== roleId));
                    } else {
                        setShowState(false);
                    }
                }
            )
    }

    return (<div>
        <div style={{"display":showState ? "block" : "none"}}>
            <MyMessage show = {showState} message = {"Role has been deleted successfully."} type = {"success"}/>
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>{iconMenu} Role List</Card.Header>
            <Card.Body>
                <Table bordered hover striped variant={"dark"}>
                    <thead>
                    <th>#</th>
                    <th>Role Title</th>
                    <th>Actions</th>
                    </thead>
                    <tbody>{roleList.length === 0 ?
                        <tr align={"center"}><td colSpan="5">No Role available.</td></tr> :
                        roleList.map((role) =>(<tr>
                            <td>{role.roleId}</td>
                            <td>{role.roleTitle}</td>
                            <td>
                                <ButtonGroup>
                                    <Link to={"role/"+role.roleId} className={"nav-link"}><FontAwesomeIcon icon={faEdit} />{' '}Edit</Link>
                                    <button type={"button"} className={"btn btn-outline-danger btn-sm"} onClick={deleteRole.bind(this, role.roleId)}><FontAwesomeIcon icon={faTrash} />{' '}Delete</button>
                                </ButtonGroup>
                            </td>
                        </tr>))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    </div>);
}

export default RoleList;