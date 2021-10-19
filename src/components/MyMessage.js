import React, {Component} from "react";
import {Toast, ToastBody, ToastHeader} from "react-bootstrap";

export default class MyMessage extends Component {
    render() {

        const messageStyle = {
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: '1',
            boxShadow: '0 4px 8px 0  rgba(0, 0, 0, 0.2)'
        }
        return (
            <div style={this.props.show ? messageStyle : null}>
                <Toast
                    className={`border text-white ${this.props.type === "success" ? "border-success bg-success" : "border-danger bg-danger"}`}
                    show={this.props.show}>
                <ToastHeader
                    className={`text-white ${this.props.type === "success" ? "bg-success" : "bg-danger"}`}
                    closeButton={false}>
                <strong class Name={"mt-auto"}>Success</strong>
                </ToastHeader>
                <ToastBody>
                    {this.props.message}
                </ToastBody>
                </Toast>
            </div>
    );
  }
}