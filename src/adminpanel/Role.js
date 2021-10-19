import {Button, Card, Col, Form, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useHistory} from "react-router-dom";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons/faPlusSquare";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import MultiSelectionList from "../components/MultiSelectionList";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";
import {faUndo} from "@fortawesome/free-solid-svg-icons/faUndo";
import {faList} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyMessage from "../components/MyMessage";

function Role(props) {

    const [showState, setShowState] = useState(false);

    const [appUsers, setAppUsers] = useState([]); // {appUserId: 0, username: "", password: "", email: "", isSuperAdmin: false}

    const [initialState, setInitialState] = useState({roleId: "0", role:{roleId: "0", roleTitle: "", appUsers: [], permissions:[]}, permissions:[]});

    const [roleRequest, setRoleRequest] = useState({roleId: initialState.roleId, role:{ roleId: initialState.role.roleId, roleTitle: initialState.role.roleTitle, appUsers: appUsers, permissions: initialState.role.permissions}, permissions: initialState.permissions});

    const [formValue, setFormValue] = useState({roleId: initialState.roleId, roleTitle: initialState.role.roleTitle});

    const [allOptions, setAllOptions] = useState([]);

    const [selectedOptions, setSelectedOptions] = useState([]);

    const history = useHistory();

    const [selectedPermissions, setSelectedPermissions] = useState([]);

    const [state, setState] = useState( () => {
        axios.get("/permissions")
            .then(response => response.data)
            .then((data) => {
                setRoleRequest({roleId: initialState.roleId,
                    Role:
                        {},
                    permissions: data

                });

                refreshPermissionList(data);
            });
    })

    useEffect(() => {
        // setup the initial data

        if(!formValue.roleId) {
            setFormValue({roleId:initialState.roleId, roleTitle: initialState.role.roleTitle});
        }
        else {
            const roleId = props.match.params.roleId;

            if (roleId) {
                findRoleById(roleId);
            }
            else {
                if (allOptions.length === 0) {
                    defaultValues();
                }
            }
        }
    }, [allOptions]);

    const findRoleById = (roleId) => {

        axios.get("/role/"+roleId)
            .then(response => {
                if (response != null) {
                    setRoleRequest({roleId: response.data.roleId,
                        role:
                            {
                                roleId: response.data.role.roleId,
                                roleTitle: response.data.role.roleTitle,
                                appUsers: response.data.role.appUsers,
                                permissions: response.data.role.permissions,
                            },
                        permissions: response.data.permissions

                    });

                    roleRequest.role.permissions = response.data.role.permissions;
                    roleRequest.permissions = response.data.permissions;

                    if(allOptions.length === 0) {
                        refreshPermissionList(roleRequest.permissions);
                    }

                    if(selectedOptions.length === 0) {
                        Object.entries(roleRequest.role.permissions).forEach(
                            entry => {
                                const [key, value] = entry;
                                selectedOptions.push({"id": value.permissionId, "name": value.permissionTitle});
                            }
                        );
                    }

                    refreshSelectedPermission();

                    setFormValue({roleId: response.data.role.roleId, roleTitle: response.data.role.roleTitle});

                };
            });
    };

    const defaultValues = () => {
        axios.get("/permissions")
            .then(response => response.data)
            .then((data) => {
                setRoleRequest({roleId: initialState.roleId,
                    Role:
                        {},
                    permissions: data

                });

                refreshPermissionList(data);
            });
    }

    const submitRole = (e) => {
        e.preventDefault();
        refreshSelectedPermission();

        const newRoleRequest = ({
                roleId: formValue.roleId,
                role:{
                    roleId: formValue.roleId,
                    roleTitle: formValue.roleTitle,
                    appUsers: appUsers,
                    permissions: selectedPermissions},
                permissions: roleRequest.permissions}
        );

        axios.post("/role/", newRoleRequest)
            .then(response => {
                if (response.data != null) {
                    setShowState(true);
                    setTimeout( () => setShowState(false), 3000);
                } else {
                    setShowState(true);
                }
            });

        setFormValue({roleId: initialState.roleId, roleTitle: initialState.role.roleTitle});
        setSelectedOptions([]);
        setSelectedPermissions([]);
    }

    const updateRole = (e) => {
        e.preventDefault();

        refreshSelectedPermission();

        const updateRoleRequest = ({
                roleId: formValue.roleId,
                role:{
                    roleId: formValue.roleId,
                    roleTitle: formValue.roleTitle,
                    appUsers: appUsers,
                    permissions: selectedPermissions},
                permissions: roleRequest.permissions}
        );

        axios.put("/role/"+updateRoleRequest.roleId, updateRoleRequest)
            .then(response => {
                if (response.data != null) {
                    setShowState(true);
                    setTimeout( () => setShowState(false), 3000);
                    setTimeout( () => goRoleList(), 3000);
                } else {
                    setShowState(true);
                }
            });
        setFormValue({roleId: initialState.roleId, roleTitle: initialState.role.roleTitle});
        setSelectedOptions([]);
        setSelectedPermissions([]);
    }

    const resetRole = () => {
        setFormValue(initialState);
    }

    function refreshPermissionList(permissions) {
        if (allOptions.length === 0) {
            Object.entries(permissions).forEach(
                entry => {
                    const [key, value] = entry;
                    allOptions.push({"id": value.permissionId, "name": value.permissionTitle});
                }
            );
        }
    }

    function refreshSelectedPermission() {
        setSelectedPermissions([]);
        let permissionList;
        Object.entries(selectedOptions).forEach(
            entry => {
                const [key, value] = entry;
                permissionList = roleRequest.permissions.slice().filter(item => item.permissionId === value.id);
                Object.entries(permissionList).forEach(
                    record => {
                        const [id, text] = record;
                        selectedPermissions.push({permissionId: text.permissionId, permissionTitle: text.permissionTitle, permissionConstantName: text.permissionConstantName});
                    }
                );
            }
        );
    }

    function goRoleList() {
        return history.push("/roles");
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
            <MyMessage show = {showState} message = {formValue.roleId !== '0' ? "Role has been updated successfully." : "New role has been saved successfully."} type = {"success"} />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header><FontAwesomeIcon icon={formValue.roleId === "0" ? faPlusSquare : faEdit} />{' '}{formValue.roleId === "0" ? "Add Role" : "Update Role"}</Card.Header>
            <Form onSubmit={formValue.roleId === "0" ? e => submitRole(e) : e => updateRole(e)} onReset={resetRole} id={"roleFormId"}>
                <Card.Body>
                    <Form.Row>
                        <Form.Control name={"roleId"} type={"hidden"} value={formValue.roleId} className={"bg-dark text-white"} />

                        <Form.Group as={Col} className={"mb-3"} controlId={"formRoleTitle"}>
                            <Form.Label>Role Title</Form.Label>
                            <Form.Control required name="roleTitle" type="roleTitle" value={formValue.roleTitle} onChange={handleChange} className={"bg-dark text-white"} placeholder="Enter the title for role." />
                            <Form.Text className="text-muted">
                                The title of role is required.
                            </Form.Text>
                        </Form.Group>

                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} className={"mb-3"} controlId={"formPermissions"}>
                            <MultiSelectionList key={allOptions} opts={allOptions} selectedOpts={selectedOptions} onChange={ currentSelectedOptions => {

                                Object.entries(selectedOptions).forEach(
                                  entry => {
                                      selectedOptions.pop();
                                  }
                                );

                                Object.entries(currentSelectedOptions).forEach(
                                    entry => {
                                        const [key, value] = entry;
                                        selectedOptions.push({"id": value.id, "name": value.name});
                                    }
                                );

                                refreshSelectedPermission();

                            }} />
                        </Form.Group>

                    </Form.Row>
                </Card.Body>
                <Card.Footer style={{"textAlign" : "right"}}>
                    <Button size={"sm"} variant={"info"} type={"submit"}>
                        <FontAwesomeIcon icon={faSave} />{' '}{formValue.roleId === '0' ? "Submit" : "Update"}
                    </Button>{'  '}
                    <Button size={"sm"} variant={"info"} type={"reset"}>
                        <FontAwesomeIcon icon={faUndo} />{' '}Reset
                    </Button>{'  '}
                    <Button size={"sm"} variant={"info"} type={"button"} onClick={goRoleList}>
                        <FontAwesomeIcon icon={faList} />{' '}Role List
                    </Button>
                </Card.Footer>
            </Form>
        </Card>
    </div>);
}

export default Role;