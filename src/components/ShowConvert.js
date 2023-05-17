import Card from "react-bootstrap/Card";

import './ShowConvert.scss';

// shows the results of the conversion
export default function ShowConvert({conversion, to, from, amount, rate}) {
  return (
    <Card id="result">
      <Card.Body>
        {`${from.symbol}${amount} (${from.code}) is ${to.symbol}${conversion.toFixed(2)} (${to.code}) at a conversion rate of ${rate}`}
      </Card.Body>
    </Card>
  )
};