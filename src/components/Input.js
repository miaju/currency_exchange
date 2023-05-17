import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./Input.scss";

//form for the user to choose countries to convert curency to and from as well as the amount
export default function Input({state, setState, findData, countries}) {

  function handleSubmit() {
    if (state.to && state.from && (state.amount > 0)) {
      findData(state.from, state.to, state.amount)
    } else {
      setState({...state, errMes: "Please enter valid input for all required values"})
    }
  }

  return (
    <Form id='input'>
      <Row>
        <Col>
        <FloatingLabel
          controlId="floatingInput"
          label="Currency I Have: "
        >
          <Form.Select onChange={(e) => setState({...state, from: e.target.value})}>
            {countries?.map((country) => {
              const code = Object.keys(country.currencies)[0];
              return <option key={country.name.common} value={country.name.common}>{country.name.common} ({code})</option>
            })}
          </Form.Select>
        </FloatingLabel>
        </Col>
        <Col>
        <FloatingLabel
        controlId="floatingInput"
        label="Currency I Want: "
      >
          <Form.Select onChange={(e) => setState({...state, to: e.target.value})}>
            {countries?.map((country) => {
              const code = Object.keys(country.currencies)[0];
                return <option key={country.name.common} value={country.name.common}>{country.name.common} ({code})</option>
              })}
          </Form.Select>
        </FloatingLabel>
        </Col>
      </Row>
      <Row>
      <Col>
      <FloatingLabel
          controlId="floatingInput"
          label="Amount to Convert: "
        >
          <Form.Control type="number" pattern="^\d*(\.\d{0,2})?$" step="0.01" min="0" placeholder="100.00" onChange={(e) => setState({...state, amount: e.target.value})}/>
        </FloatingLabel>
      </Col>
      </Row>
      <Button id="con-bttn" onClick={handleSubmit}>Convert Currency</Button>
    </Form>
  )
}