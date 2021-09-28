import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import { response } from "express";
import { Card, Button } from "react-bootstrap/";
import FormModal from './FormModal'

class FavFruit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruidata: [],
      show: false,
      selectedobj: {},
    };
  }
  componentDidMount = () => {
    axios
      .get(`http://localehost:3005/fruit?email=${this.props.auth0.user.email}`)
      .then((response) => {
        this.setState({ fruidata: response.data });
      });
  };
  delet = (deleted) => {
    axios.delete(`http://localehost:3005/fruit/${deleted}`).then(() => {
      axios
        .get(
          `http://localehost:3005/fruit?email=${this.props.auth0.user.email}`
        )
        .then((response) => {
          this.setState({ fruidata: response.data });
        });
    });
  };
  update = async (updated) => {
    await this.setState({
      show: !this.state.show,
      selectedobj: updated,
    });
  };

  handleform = (e) => {
    e.preventDefault();
    const request = {
      name: e.target.value.name,
      image: e.target.value.image,
      price: e.target.value.price,
    };
    axios
      .put(
        `http://localehost:3005/fruit/${this.state.selectedobj}`,request
      )
      .then((responed) => {
        const arr = this.state.fruidata.map((item) => {
          if (item._id === this.state.selectedobj._id) {
            return item;
          }
          return item;
        });
        this.setState({ fruidata: arr });
        this.update();
      });
  };

  render() {
    return (
      <>
        <h1>My Favorite Fruits</h1>

        {this.state.show && (
          <FormModal
            show={this.state.show}
            handleform={this.handleform}
            handleclose={this.update}
            selectedobj={this.state.selectedobj}
          />
        )}

        {this.state.fruidata.map((element) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={element.image} />
              <Card.Body>
                <Card.Title>{element.name}</Card.Title>
                <Card.Text>
                {element.price}
                </Card.Text>
                <Button variant="primary" onClick={()=>{this.update(element)}}>update fruit</Button>
              </Card.Body>
            </Card>
          );
        })}
      </>
    );
  }
}

export default withAuth0(FavFruit);
