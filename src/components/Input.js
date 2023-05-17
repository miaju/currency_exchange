import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';

import "./Input.scss";

//form for the user to choose countries to convert curency to and from as well as the amount
export default function Input({state, setError, findData, countries, setCountries, setAmount}) {

  function handleSubmit() {
    console.log(state)
    if (state.to_name && state.from_name && (state.amount > 0)) {
      findData(state.from_name, state.to_name, state.amount)
    } else {
      setError();
    }
  }

  function swap() {
    findData(state.to_name, state.from_name, state.amount);
  }

  return (
    <Form id='input'>
      <Row>
        <Col>
        <FloatingLabel
          controlId="floatingInput"
          label="Currency I Have: "
        >
          <Form.Select value={state.from_name} onChange={(e) => setCountries("from_name",e.target.value)}>
            {countries?.map((country) => {
              const code = Object.keys(country.currencies)[0];
              return <option key={country.name.common} value={country.name.common}>{country.name.common} ({code})</option>
            })}
          </Form.Select>
        </FloatingLabel>
        </Col>
        <Col xs="auto">
        <Button id="swap" onClick={swap}><FontAwesomeIcon icon={faRightLeft} /></Button>
        </Col>
        <Col>
        <FloatingLabel
        controlId="floatingInput"
        label="Currency I Want: "
      >
          <Form.Select value={state.to_name} onChange={(e) => setCountries("to_name",e.target.value)}>
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
          <Form.Control type="number" pattern="^\d*(\.\d{0,2})?$" step="0.01" min="0" placeholder="100.00" onChange={(e) => setAmount(e.target.value)}/>
        </FloatingLabel>
      </Col>
      </Row>
      <Button id="con-bttn" onClick={handleSubmit}>Convert Currency</Button>
    </Form>
  )
}