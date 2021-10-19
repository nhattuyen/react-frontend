import React from "react";
import {Jumbotron, Button} from "react-bootstrap";

function AdminWelcome(props) {
    return (
        <Jumbotron className={'bg-dark text-white'}>
            <h1>{props.heading}</h1>
            <p>
                {props.desc}
            </p>
            <p>
                <Button variant="primary">Introduction</Button>
            </p>
        </Jumbotron>
    );
}

export default AdminWelcome;