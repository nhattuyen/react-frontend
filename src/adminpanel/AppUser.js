import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import {Button, Card, Col, Form} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlusSquare, faEdit, faList} from "@fortawesome/free-solid-svg-icons";
import MyMessage from "../components/MyMessage";
import SelectionOnlyList from "../components/SelectionOnlyList";
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";
import {faUndo} from "@fortawesome/free-solid-svg-icons/faUndo";
import axios from "axios";
import data from "bootstrap/js/src/dom/data";

function AppUser(props) {

const history = useHistory();

const handleChangeIsSuperAdmin = (e) => {
    setFormValue(prevState => ({
        ...prevState,
        isSuperAdmin: e.target.checked
    }));
}

const [initialState, setInititalState] = useState({appUserId: "0", appUser:{appUserId: "0", username: "", password: "", email: "", isSuperAdmin: false, role: {}}, roles:[]});

const [allOptions, setAllOptions] = useState([]);

const [showState, setShowState] = useState(false);

const [formValue, setFormValue] = useState({appUserId: initialState.appUserId, username: initialState.appUser.username, password: initialState.appUser.password, email: initialState.appUser.email, isSuperAdmin: initialState.appUser.isSuperAdmin, role: {}, roles: initialState.roles}); //useState({appUserId: initialState.appUserId, appUser: {appUserId: initialState.appUser.appUserId, username: initialState.appUser.username, password: initialState.appUser.password, email: initialState.appUser.email, isSuperAdmin: initialState.appUser.isSuperAdmin, role: {}}, roles: initialState.roles});

const [appUserRequest, setAppUserRequest] = useState({appUserId: initialState.appUserId, username: initialState.appUser.username, password: initialState.appUser.password, email: initialState.appUser.email, isSuperAdmin: initialState.appUser.isSuperAdmin, role: {}, roles: initialState.roles});

const [currentRoleState, setCurrentRoleState] = useState([]);

const [selectedRoleList, setSelectedRoleList] = useState([]);

    const [state, setState] = useState( () => {
        axios.get("/roles")
            .then(response => response.data)
            .then((data) => {
                setAppUserRequest({appUserId: initialState.appUserId, username: initialState.appUser.username, password: initialState.appUser.password, email: initialState.appUser.email, isSuperAdmin: initialState.appUser.isSuperAdmin, role: initialState.appUser.role, roles: initialState.roles});//appUserId: initialState.appUserId, username: initialState.username, password: initialState.password, email: initialState.email, isSuperAdmin: initialState.isSuperAdmin, role: {roleId: initialState.appUser.role.roleId, roleTitle: initialState.appUser.role.roleTitle}, roles: data});
                appUserRequest.roles = data;

                refreshRoleList();
            });
    });

    useEffect( () => {

        if(!formValue.appUserId) {
            setFormValue({appUserId: initialState.appUserId, username: initialState.appUser.username, password: initialState.appUser.password, email: initialState.appUser.email, isSuperAdmin: initialState.appUser.isSuperAdmin, role: initialState.appUser.role, roles: initialState.roles});
        } else {
            const appUserId = props.match.params.appUserId;

            if (appUserId) {
                findAppUserById(appUserId);
            }
            else {
                if (allOptions.length === 0) {
                    defaultValues();
                }
            }
        }
    }, [allOptions]);

    const findAppUserById = (appUserId) => {
        axios.get("/appuser/"+appUserId)
            .then(response => {
                if(response != null) {

                    setAppUserRequest(
                        {appUserId : response.data.appUserId,
                            appUser:{appUserId: response.data.appUserId, username: response.data.username, password: response.data.password, email: response.data.email, isSuperAdmin: !response.data.isSuperAdmin ? false : true,
                            role: !response.data.appUser.role ? [] : [{roleId: response.data.appUser.role[0].roleId, roleTitle: response.data.appUser.role[0].roleTitle}], roles: response.data.roles }}
                    );
                    appUserRequest.roles = response.data.roles;

                    if(allOptions.length === 0) {
                        refreshRoleList();
                    }

                    if(currentRoleState.length === 0) {
                        if (appUserRequest.role) {
                            Object.entries(appUserRequest.role).forEach(
                                entry => {
                                    const [key, value] = entry;
                                    currentRoleState.push({"id":value.roleId, "name":value.roleTitle});
                                }
                            );
                        }

                    }

                    refreshSelectedRoleList(currentRoleState);
                    setFormValue({appUserId: response.data.appUserId, username: response.data.appUser.username, password: response.data.appUser.password, email: response.data.appUser.email, isSuperAdmin: !response.data.isSuperAdmin ? false : true, role: !response.data.role ? {} : {roleId: response.data.role.roleId, roleTitle: response.data.role.roleTitle}, roles: response.data.roles });

                }
            });
    }

function handleChange(event) {
    const {name, value} = event.target;
    setFormValue((initialState) => {
        return {
            ...initialState,
            [name]: value,
        };
    });
};

    const defaultValues = () => {
        axios.get("/roles")
            .then(response => response.data)
            .then((data) => {
                setAppUserRequest({appUserId: initialState.appUser.appUserId, username: initialState.appUser.username, password: initialState.appUser.password, email: initialState.appUser.email, isSuperAdmin: initialState.appUser.isSuperAdmin, role: initialState.appUser.role, roles: appUserRequest.roles});

                if(appUserRequest.roles.length === 0) {
                    Object.entries(data).forEach(
                        entry => {
                            const [key, value] = entry;
                            appUserRequest.roles.push({roleId: value.roleId, roleTitle: value.roleTitle});
                        }
                    );
                }
                refreshRoleList();
            });

    }

    const resetState = () => {
        setFormValue({appUserId: initialState.appUser.appUserId, username: initialState.appUser.username, password: initialState.appUser.password, email: initialState.appUser.email, isSuperAdmin: initialState.appUser.isSuperAdmin, role: initialState.appUser.role, roles: appUserRequest.roles});
    };

function refreshRoleList() {
    axios.get("/roles")
        .then(response => response.data)
        .then((data) => {
            setAppUserRequest(prevState => ({
                ...prevState,
                roles: data
            }));
            if(appUserRequest.roles.length === 0) {
                Object.entries(data).forEach(
                    entry => {
                        const [key, value] = entry;
                        appUserRequest.roles.push({roleId: value.roleId, roleTitle: value.roleTitle, appUsers: value.appUsers, permissions: value.permissions});
                    }
                );
            }
        });

    if(allOptions.length === 0) {
        Object.entries(appUserRequest.roles).forEach(
            entry => {
                const [key, value] = entry;
                allOptions.push({"id":value.roleId, "name": value.roleTitle});
            }
        )
    }
}

function refreshSelectedRoleList(currentRoles) {
    setSelectedRoleList([]);
    let roleList = [];

    Object.entries(currentRoles).forEach(
        entry => {
            const [key, value] = entry;
            roleList = appUserRequest.roles.slice().filter(item => item.roleId === value.id);
            Object.entries(roleList).forEach(
                record => {
                    const [id, text] = record;
                    selectedRoleList.push({roleId: text.roleId, roleTitle: text.roleTitle, appUsers: text.appUsers, permissions: text.permissions});
                }
            )
        }
    );
}

    const submitAppUser = (e) => {
        e.preventDefault();
        refreshSelectedRoleList(currentRoleState);

        const newAppUserRequest = ({
            appUserId: formValue.appUserId,
            appUser: {
                appUserId: formValue.appUserId,
                username: formValue.username,
                password: formValue.password,
                email: formValue.email,
                isSuperAdmin: formValue.isSuperAdmin,
                role: selectedRoleList.length === 1 ? {roleId: selectedRoleList[0].roleId, roleTitle: selectedRoleList[0].roleTitle, appUsers: selectedRoleList[0].appUsers, permissions: selectedRoleList[0].permissions} : {},
            },

            roles: appUserRequest.roles
    });

        axios.post("/appuser/", newAppUserRequest)
            .then(response => {
               if (response.data !== null) {
                   setShowState(true);
                   setTimeout(() => setShowState(false), 3000);
               } else {
                   setShowState(true);
               }
            });

        setFormValue({appUserId: initialState.appUser.appUserId, username: initialState.appUser.username, password: initialState.appUser.password, email: initialState.appUser.email, isSuperAdmin: initialState.appUser.isSuperAdmin, role: initialState.appUser.role, roles: appUserRequest.roles});
        setSelectedRoleList([]);
        setCurrentRoleState([]);
}

    const updateAppUser = (e) => {
        e.preventDefault();
        refreshSelectedRoleList(currentRoleState);
        refreshRoleList();

        const newAppUserRequest = ({
            appUserId: formValue.appUserId,
            appUser: {
                appUserId: formValue.appUserId,
                username: formValue.username,
                password: formValue.password,
                email: formValue.email,
                isSuperAdmin: formValue.isSuperAdmin,
                role: selectedRoleList.length > 0 ? {roleId: selectedRoleList[0].roleId, roleTitle: selectedRoleList[0].roleTitle} : {} // , "appUsers": selectedRoleList[0].appUsers, "permissions": selectedRoleList[0].permissions
            },

            roles: appUserRequest.roles
        });

        axios.put("/appuser/"+newAppUserRequest.appUserId, newAppUserRequest)
            .then(response => {
                if (response.data !== null) {
                    setShowState(true);
                    setTimeout(() => setShowState(false), 3000);
                    setTimeout(() => goAppUserList(), 3000);
                } else {
                    setShowState(true);
                }
            });
        console.log(newAppUserRequest);

        setFormValue({appUserId: initialState.appUser.appUserId, username: initialState.appUser.username, password: initialState.appUser.password, email: initialState.appUser.email, isSuperAdmin: initialState.appUser.isSuperAdmin, role: initialState.appUser.role, roles: appUserRequest.roles});
        setSelectedRoleList([]);
        setCurrentRoleState([]);
    };

function goAppUserList() {
    return history.push("/appUsers");
}

    return (<div>
        <div style={{"display":showState ? "block" : "none"}}>
            <MyMessage show = {showState} message = {formValue.appUserId !== "0" ? "The new App User has been created successfully." : "The App User has been saved successfully."} type = {"success"} />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header><FontAwesomeIcon icon={formValue.appUserId === "0" ? faPlusSquare : faEdit} />{' '}{formValue.appUserId === "0" ? "Add App User" : "Update App User" }</Card.Header>
            <Form onSubmit={formValue.appUserId === "0" ? e => submitAppUser(e) : e => updateAppUser(e)} onReset={resetState} id={"appUserFormId"}>
                <Card.Body>

                    <Form.Row>
                        <Form.Control name="id" type="hidden" value={formValue.appUserId} onChange={handleChange} className={"bg-dark text-white"} />

                        <Form.Group as={Col} className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control required name="username" type="username" value={formValue.username} onChange={handleChange} className={"bg-dark text-white"} placeholder="Enter Username" />
                            <Form.Text className="text-muted">
                                Username is required.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required name="password" type="password" value={formValue.password} onChange={handleChange} className={"bg-dark text-white"} placeholder="Enter Password" />
                            <Form.Text className="text-muted">
                                Password is required.
                            </Form.Text>
                        </Form.Group>

                    </Form.Row>
                    <Form.Row>

                        <Form.Group as={Col} className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required name="email" type="email" value={formValue.email} onChange={handleChange} className={"bg-dark text-white"} placeholder="Enter Email" />
                            <Form.Text className="text-muted">
                                Email is required.
                            </Form.Text>
                        </Form.Group>

                    </Form.Row>
                    <Form.Row>

                        <Form.Group as={Col} className="mb-3" controlId="formIsSuperAdmin">
                            <Form.Check name="isSuperAdmin" type="checkbox" checked={formValue.isSuperAdmin} label={"Is Super Admin"} onChange={ (e) => handleChangeIsSuperAdmin(e)} className={"bg -dark text-white"} />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="formRole">
                            <Form.Label name={"role"} value={formValue.roleTitle} className={"bg -dark text-white"}></Form.Label>
                            <SelectionOnlyList key={allOptions}  currentRoleState = {currentRoleState} rolesState = {allOptions} onChange={
                                selectedRole => { Object.entries(selectedRole).forEach(
                                entry => {
                                    const [key, value] = entry;
                                    formValue.roleId = value.id;
                                    formValue.roleTitle = value.roleTitle;
                                    currentRoleState.push({"id": value.id, "name": value.name});
                                } );

                                    refreshSelectedRoleList(currentRoleState);
                                }} />
                            <Form.Text className="text-muted">
                                Role is required.
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                </Card.Body>
                <Card.Footer style={{"textAlign" : "right"}}>
                    <Button size={"sm"} variant={"info"} type={"submit"}>
                        <FontAwesomeIcon icon={faSave} />{' '}{formValue.appUserId === '0' ? "Submit" : "Update"}
                    </Button>{'  '}
                    <Button size={"sm"} variant={"info"} type={"reset"}>
                        <FontAwesomeIcon icon={faUndo} />{' '}Reset
                    </Button>{'  '}
                    <Button size={"sm"} variant={"info"} type={"button"} onClick={goAppUserList}>
                        <FontAwesomeIcon icon={faList} />{' '}AppUser List
                    </Button>
                </Card.Footer>
            </Form>
        </Card>
    </div>);
}

export default AppUser;