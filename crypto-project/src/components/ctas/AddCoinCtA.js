import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const AddCoinCtA = () => (
  <Card centered>
    <Card.Content textAlign="center">
      <Card.Header>Add new coin</Card.Header>
      <Link to="/coins/new">
        <Icon name="plus circle" size="massive" />
      </Link>
    </Card.Content>
  </Card>
);

export default AddCoinCtA;
