import {Card, Col, Button, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons/faPlusSquare";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";
import {faUndo} from "@fortawesome/free-solid-svg-icons/faUndo";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import {useHistory} from "react-router-dom";
import axios from "axios";
import MyMessage from "../components/MyMessage";

export function Permission(props) {

    const [initialState] = useState({permissionId: '0', permissionTitle: "", permissionConstantName: "", roles: [{roleId: 0, roleTitle: ""}]});

    const [formValue, setFormValue] = useState({permissionId: initialState.id, permissionTitle: initialState.permissionTitle, permissionConstantName: initialState.permissionConstantName, roles: [{roleId: initialState.roles[0].roleId, roleTitle: initialState.roles[0].roleTitle}]});

    const [showState, setShowState] = useState(false);

    const history = useHistory();

    useEffect(() => {
        // setup the initial data
        if(!formValue.permissionId) {
            setFormValue(initialState);
        }
        else {
            const permissionId = props.match.params.permissionId;

            if (permissionId) {
                findPermissionById(permissionId);
            }
        }
    },[formValue.permissionId, initialState, props.match.params.permissionId]);

    const findPermissionById = (permissionId) => {

        axios.get("/permission/"+permissionId)
            .then(response => {
               if (response != null) {
                   setFormValue({permissionId: response.data.permissionId,
                       permissionTitle: response.data.permissionTitle,
                       permissionConstantName: response.data.permissionConstantName,
                       roles: response.data.roles
                   })
               };
            });
    };

    const submitPermission = (e) => {
        e.preventDefault();

        const permission = {
            permissionId: formValue.permissionId,
            permissionTitle: formValue.permissionTitle,
            permissionConstantName: formValue.permissionConstantName
        };

        axios.post("/permission/", permission)
            .then(response => {
                if (response.data != null) {
                    setShowState(true);
                    setTimeout(() => setShowState(false), 3000);
                } else {
                    setShowState(false);
                }
            });
        setFormValue(initialState);
    }

    const updatePermission = (e) => {
        e.preventDefault();

        const permission = {
            permissionId: formValue.permissionId,
            permissionTitle: formValue.permissionTitle,
            permissionConstantName: formValue.permissionConstantName
        };

        axios.put("/permission/"+permission.permissionId, permission)
            .then(response => {
                setShowState(true);
                setTimeout(() => setShowState(false), 3000);
                setTimeout( () => goPermissionList(), 3000);
            });
        setTimeout(() => setFormValue(initialState), 3500);
    }

    const resetPermission = () => {
        setFormValue(initialState);
    }
    
    function goPermissionList() {
        return history.push("/Permissions");
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setFormValue((initialState) => {
           return {
               ...initialState,
               [name]: value,
           }
        });
    }

    return (<div>
    <div style={{"display":showState ? "block" : "none"}}>
        <MyMessage show = {showState} message = {formValue.permissionId !== '0' ? "Permission has been updated successfully." : "New permission has been saved successfully."} type = {"success"} />
    </div>
    <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header><FontAwesomeIcon icon={formValue.permissionId === '0' ? faPlusSquare : faEdit} />{' '}{formValue.permissionId === '0' ? "Add Permission" : "Update Permission"}</Card.Header>
        <Form onSubmit={formValue.permissionId === '0' ? e => submitPermission(e) : e => updatePermission(e)} onReset={resetPermission} id={"permissionFormId"}>
            <Card.Body>
                <Form.Row>
                    <Form.Control name={"permissionId"} type={"hidden"} value={formValue.permissionId} className={"bg-dark text-white"} />

                    <Form.Group as={Col} className={"mb-3"} controlId={"formPermissionTitle"}>
                        <Form.Label>Permission Title</Form.Label>
                        <Form.Control required name="permissionTitle" type="permissionTitle" value={formValue.permissionTitle} onChange={handleChange} className={"bg-dark text-white"} placeholder="Enter the title for permission." />
                        <Form.Text className="text-muted">
                            The title of permission is required.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formPermissionConstant">
                        <Form.Label>Permission Constant</Form.Label>
                        <Form.Control required name="permissionConstantName" type="permissionConstantName" value={formValue.permissionConstantName} onChange={handleChange} className={"bg-dark text-white"} placeholder="Enter the permission constant." />
                        <Form.Text className="text-muted">
                            The constant of Permission is required.
                        </Form.Text>
                    </Form.Group>

                </Form.Row>
            </Card.Body>
            <Card.Footer style={{"textAlign" : "right"}}>
                <Button size={"sm"} variant={"info"} type={"submit"}><FontAwesomeIcon icon={faSave} />{' '}{formValue.permissionId === '0' ? "Submit" : "Update"}</Button>{' '}
                <Button size={"sm"} variant={"info"} type={"reset"} ><FontAwesomeIcon icon={faUndo} />{' '}Reset</Button>{' '}
                <Button size={"sm"} variant={"info"} type={"button"} onClick={goPermissionList}><FontAwesomeIcon icon={faList} />{' '}Permission List</Button>
            </Card.Footer>
        </Form>
    </Card>
    </div>);
}

export default Permission;