import React from "react";
import {Card} from 'react-bootstrap'


function MyCard(props) {

  return (
    <Card 
      className="mb-3" 
      style={{
        width: "18rem",
        height: "600",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: "auto",
        marginTop: 50,
      }}
    >
        <Card.Header>{props.header}</Card.Header>
        <Card.Body>{props.body}<br/>{props.body2}
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>{props.text}<br/>{props.text2}</Card.Text>
        </Card.Body>
        {props.button}
    </Card>
  );
}

export default MyCard;
