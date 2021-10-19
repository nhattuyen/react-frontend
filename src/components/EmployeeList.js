import React from "react";
import {ButtonGroup, Button, Card, Table} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import MyMessage from "./MyMessage";
import {Link} from "react-router-dom";

class EmployeeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            employeeList : []
        };
    }

    componentDidMount() {
        this.findAllEmployees();
    }

    findAllEmployees() {
        axios.get("/employees")//.get("http://localhost:8080/employees")
            .then(response => response.data)
            .then((data) => {
                this.setState({employeeList: data});
            });
    }

    deleteEmployee(employeeEmpNo) {
        axios.delete("/employee/"+employeeEmpNo)
            .then( response => {
                    if (response.data != null) {
                        this.setState({"show":true});
                        setTimeout(() => this.setState({"show":false}), 3000);
                        this.setState({employeeList: this.state.employeeList.filter(employee => employee.empNo !== employeeEmpNo)})
                    } else {
                        this.setState({"show":false});
                    }
                }
            );

    }

    render() {

        const iconMenu = <FontAwesomeIcon icon={faList} />

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyMessage show = {this.state.show} message = {"Employee has been deleted successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>{iconMenu} Employee List</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant={"dark"}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Employee ID</th>
                                <th>Full Name</th>
                                <th>Hire Date</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.state.employeeList.length === 0 ?
                                <tr align="center">
                                    <td colSpan="5">No Employee available.</td>
                                </tr> :
                                this.state.employeeList.map((employee) => (
                                    <tr>
                                        <td>{employee.id}</td>
                                        <td>{employee.empNo}</td>
                                        <td>{employee.fullname}</td>
                                        <td>{employee.hireDate}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"Employee/"+employee.empNo} className={"nav-link"} ><FontAwesomeIcon icon={faEdit} />{' '}Edit</Link>
                                                <Button size={"sm"}  variant={"outline-danger"} onClick={this.deleteEmployee.bind(this, employee.empNo)} ><FontAwesomeIcon icon={faTrash} />{' '}Delete</Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default EmployeeList;