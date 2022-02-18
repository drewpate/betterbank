import React from "react";
import {Card, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import img from "../assets/images/bank.png";

const Home = () => {

    let navigate = useNavigate();

  return (
  <div className="container">
    <Card style={{
        width: "18rem",
        height: "600",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: "auto",
        marginTop: 50,
      }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>Welcome to the Better Bank</Card.Title>
        <Card.Text>
          (The Bad Bank 2.0)
          <br /> 
        </Card.Text>
        <Button variant="primary" onClick={() => {navigate("/createaccount")}} >
          Let's Get Started
        </Button>
      </Card.Body>
    </Card>
      
  </div>
)};
    

export default Home;
