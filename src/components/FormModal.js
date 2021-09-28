import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withAuth0 } from "@auth0/auth0-react";
import {Form,Modal,Button} from 'react-bootstrap/'
class FormModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>fruit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.props.hanleform}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={this.props.selectedobj.name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>image</Form.Label>
              <Form.Control
                type="text"
                name="image"
                defaultValue={this.props.selectedobj.image}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                defaultValue={this.props.selectedobj.price}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default FormModal;
