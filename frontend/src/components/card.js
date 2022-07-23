import Card from "react-bootstrap/Card";
import React, { useState } from "react";

const CardComponent = (props) => {
  return (
    <Card>
      <div className="p-2">
        <img
          src={require(`../images/${props.imageSrc}`)}
          width={"100%"}
          height={"300px"}
        />
      </div>

      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text></Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{props.title}</small>
      </Card.Footer>
    </Card>
  );
};
export default CardComponent;
