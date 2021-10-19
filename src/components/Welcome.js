import React from "react";
import {Jumbotron, Button} from "react-bootstrap";

function Welcome(props) {
    return (
        <Jumbotron className={'bg-dark text-white'}>
            <h1>{props.heading}</h1>
            <p>
                {props.desc}
            </p>
            <p>
                <Button variant="primary">Learn more</Button>
            </p>
        </Jumbotron>
    );
}

export default Welcome;