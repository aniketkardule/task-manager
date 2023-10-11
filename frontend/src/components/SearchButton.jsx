import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export default function SearchButton({getFilterValue}) {
    const [filterValue, setFilterValue] = useState('');
  return (
    <Container className="mt-5">
      <Row>
        <Col style={{marginLeft:'auto'}} sm={4}>
          <Form className="d-flex">
            <Form.Control
            style={{marginLeft:'auto', width:'200px'}}
              type="search"
              placeholder="Search Task"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setFilterValue(e.target.value)}
            />
            <Button onClick={getFilterValue(filterValue)}>
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}