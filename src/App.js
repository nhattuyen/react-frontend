import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomePage from "./components/HomePage";
import AdminControlPanel from "./adminpanel/AdminControlPanel"
import Employee from "./components/Employee";
import React from "react";
import Permission from "./adminpanel/Permission";
import EmployeeList from "./components/EmployeeList";
import PermissionList from "./adminpanel/PermissionList";
import Role from "./adminpanel/Role";
import AppUser from "./adminpanel/AppUser";
import RoleList from "./adminpanel/RoleList";
import AppUserList from "./adminpanel/AppUserList";

function App() {

  return (
      <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/admin" component={AdminControlPanel} />
            <Route exact path="/employee" component={Employee} />
            <Route exact path="/employees" component={EmployeeList} />
            <Route exact path="/employee/:id" component={Employee} />
            <Route exact path="/permission" component={Permission} />
            <Route exact path="/permissions" component={PermissionList} />
            <Route exact path="/permission/:permissionId" component={Permission} />
            <Route exact path="/roles" component={RoleList} />
            <Route exact path="/role" component={Role} />
            <Route exact path="/role/:roleId" component={Role} />
            <Route exact path="/appuser" component={AppUser} />
            <Route exact path="/appusers" component={AppUserList} />
            <Route exact path="/appuser/:appUserId" component={AppUser} />
          </Switch>
      </Router>
  );
}

export default App;
