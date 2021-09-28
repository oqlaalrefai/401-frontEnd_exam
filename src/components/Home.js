import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from "@auth0/auth0-react";

import axios from 'axios';
import { Card, Button } from "react-bootstrap/";
import FavFruit from './FavFruit';
class Home extends React.Component {
constructor(props){
  super(props)
  this.state={
    fruidata:[]
  }
  }
  componentDidMount = () => {
    axios.get('http://localehost:3005/fruit')
      .then((response) => {
        this.setState({ fruidata: response.data.fruitlist });
      });
  };
addTofav = (FavFruit)=>{axios.post('http://localehost:3005/fruit',FavFruit)}
  render() {
    return (
      <>
        <h1>API Fruits</h1>

        {
          this.state.fruidata.map(element=>{
            return(
              <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={element.image} />
              <Card.Body>
                <Card.Title>{element.name}</Card.Title>
                <Card.Text>
                {element.price}
                </Card.Text>
                <Button variant="primary" onClick={()=>{this.addTofav({name:element.name,image:element.image,price:element.price})}}>Add To favourite</Button>
              </Card.Body>
            </Card>
            )
          })
        }
      </>
    )
  }
}

export default withAuth0(Home);
