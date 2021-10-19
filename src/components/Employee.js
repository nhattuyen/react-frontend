import React from "react";
import {Card, Form, Button, Col} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSave, faPlusSquare, faEdit, faUndo, faList} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyMessage from "./MyMessage";

export default class Employee extends React.Component{

    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.state.show = false;
        this.handleChange = this.handleChange.bind(this);
        this.submitEmployee = this.submitEmployee.bind(this);
    }

    initialState = {
        id: '0', empNo: '', fullname: '', hireDate: null
    };

    componentDidMount() {
        const employeeid = +this.props.match.params.id;
        if (employeeid) {
            this.findEmployeeById(employeeid);
        }
    }

    findEmployeeById = (employeeEmpNo) => {
        axios.get("/employee/" + employeeEmpNo)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        empNo: response.data.empNo,
                        fullname: response.data.fullname,
                        hireDate: response.data.hireDate
                    });
                }
            }).catch((error) => {
            console.error(("Error: " + error));
        });
    }

    resetEmployee = () => { this.setState(() =>this.initialState); };

    updateEmployee = event => {
        event.preventDefault();

        const employee = {
            id: this.state.id,
            empNo: this.state.empNo,
            fullname: this.state.fullname,
            hireDate: this.state.hireDate
        };

        axios.put("/employee/", employee)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    setTimeout(() => this.goEmployeeList(), 3000);
                } else {
                    this.setState({"show":false});
                }
            });
        this.setState(this.initialState);
    }

    submitEmployee(event) {
        //alert('EmpNo: '+this.state.empNo + 'Fullname: '+this.state.fullname+'HireDate: '+this.state.hireDate);
        event.preventDefault();

        const employee = {
            id: this.state.id,
            empNo: this.state.empNo,
            fullname: this.state.fullname,
            hireDate: this.state.hireDate
        };

        axios.post("/employee/", employee)//post("http://localhost:8080/employee", employee)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                } else {
                    this.setState({"show":false});
                }
            });
        this.setState(this.initialState);
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    goEmployeeList = () => {
        return this.props.history.push("/employees");
    };

    render() {
        const { id, empNo, fullname, hireDate } = this.state;

        return (
            <div>
            <div style={{"display":this.state.show ? "block" : "none"}}>
                <MyMessage show = {this.state.show} message = {this.state.id !== 0 ? "Employee has been updated successfully." : "New employee has been saved successfully."} type = {"success"} />
            </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={this.state.id === "0" ? faPlusSquare : faEdit}/>{' '}{this.state.id === "0" ? "Add Employee" : "Update Employee" }</Card.Header>
                    <Form onSubmit={this.state.id === "0" ? this.submitEmployee : this.updateEmployee} onReset={this.resetEmployee} id={"employeeFormId"}>
                        <Card.Body>

                            <Form.Row>
                                <Form.Control name="id" type="hidden" value={id} onChange={this.handleChange} className={"bg-dark text-white"} />
                                <Form.Group as={Col} className="mb-3" controlId="formBasicEmpNo">
                                    <Form.Label>Employee No</Form.Label>
                                    <Form.Control required name="empNo" type="empNo" value={empNo} onChange={this.handleChange} className={"bg-dark text-white"} placeholder="Enter Employee No" />
                                    <Form.Text className="text-muted">
                                        Employee No is required.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" controlId="formBasicFullName">
                                    <Form.Label>Fullname</Form.Label>
                                    <Form.Control required name="fullname" type="fullname" value={fullname} onChange={this.handleChange} className={"bg-dark text-white"} placeholder="Enter Full name" />
                                    <Form.Text className="text-muted">
                                        Fullname is required.
                                    </Form.Text>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} className="mb-3" controlId="formBasicHireDate">
                                    <Form.Label>Hire Date</Form.Label>
                                    <Form.Control required name="hireDate" type="date" value={hireDate} onChange={this.handleChange} className={"bg-dark text-white"} placeholder="Enter Date" />
                                    <Form.Text className="text-muted">
                                        Hire Date is required.
                                    </Form.Text>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button size={"sm"} variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/>{' '}{this.state.id === "0" ? "Submit" : "Update"}
                            </Button>{'  '}
                            <Button size={"sm"} variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/>{' '}Reset
                            </Button>{'  '}
                            <Button size={"sm"} variant="info" type="button" onClick={this.goEmployeeList.bind()}>
                                <FontAwesomeIcon icon={faList}/>{' '}Employee List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}