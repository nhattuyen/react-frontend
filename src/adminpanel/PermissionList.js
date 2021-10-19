import {ButtonGroup, Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import MyMessage from "../components/MyMessage";

export function PermissionList(props) {

    const iconMenu = <FontAwesomeIcon icon={faList} />

    const [showState, setShowState] = useState(false);

    const [permissionList, setPermissionList] = useState([]);

    useEffect( () => {
        getAllPermissions();
    },[]);

    function getAllPermissions() {
        axios.get("/permissions")
            .then(response => response.data)
            .then((data) => {
                setPermissionList(data);
            });
    }
    
    function deletePermission(permissionId) {

        axios.delete("/permission/" + permissionId)
            .then(response  => {
                    if(response.data != null) {
                        setShowState(true);
                        setTimeout(() => setShowState(false), 3000);
                        setPermissionList(permissionList.filter(permission => permission.permissionId !== permissionId));
                    } else {
                        setShowState(false);
                    }
                }
            )
    }

    return (
        <div>
            <div style={{"display":showState ? "block" : "none"}}>
                <MyMessage show = {showState} message = {"Permission has been deleted successfully."} type = {"success"}/>
            </div>
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>{iconMenu} Permission List</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant={"dark"}>
                        <thead>
                            <th>#</th>
                            <th>Permission Title</th>
                            <th>Permission Constant Name</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>{permissionList.length === 0 ?
                            <tr align={"center"}>
                                <td colSpan="4">No Permission available.</td>
                            </tr> :
                            permissionList.map((permission) =>(
                                <tr>
                                    <td>{permission.permissionId}</td>
                                    <td>{permission.permissionTitle}</td>
                                    <td>{permission.permissionConstantName}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Link to={"permission/"+permission.permissionId} className={"nav-link"} ><FontAwesomeIcon icon={faEdit} />{' '}Edit</Link>
                                            <button type={"button"} className={"btn btn-outline-danger btn-sm"} onClick={deletePermission.bind(this, permission.permissionId)}><FontAwesomeIcon icon={faTrash} />{' '}Delete</button>
                                        </ButtonGroup>
                                </td>
                            </tr>))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
}

export default PermissionList;