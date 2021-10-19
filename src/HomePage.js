import './App.css';
import {Container, Row, Col} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer"
import Employee from "./components/Employee";
import EmployeeList from "./components/EmployeeList";
import UserList from "./components/UserList";

function App() {
    const marginTop = {
        marginTop:"20px"
    };

    const heading = "Hello, world!";
    const desciption = "This is the React and Spring Boot Restful API app.";

    return (
        <Router>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} style={marginTop}>
                        <Switch>
                            <Route path="/" exact component={ () => <Welcome heading={heading} desc={desciption}/>} />
                            <Route path="/employee" exact component={Employee} />
                            <Route path="/employees" exact component={EmployeeList} />
                            <Route path="/employee/:id" exact component={Employee} />
                            <Route path="/users" exact component={UserList} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </Router>
    );
}

export default App;