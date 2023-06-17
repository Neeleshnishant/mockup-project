import { Card, CardBody, Col, Row, Button, CardHeader } from "reactstrap";
import React from "react";
import connectcover from "../../../assets/images/connectcover.jpg"

export const ConnectCoverfright = () => {

  return (
    <div>
      <Card>
        <CardHeader> <Row>
          <Col md={10} className="paymentCredHead"><h5 className="mb-0 text-primary">Connect CoverFreight</h5></Col>
          <Col md={2}><Button className="btn btn-success"> Disconnect  </Button></Col>
        </Row></CardHeader>

        <CardBody>
          <img src={connectcover} className="img img-responsive img-powered-by-stripe" alt="Connect CoverFreight" />
          <p>CoverFreight provides Comprehensive Moving Insurance for household goods and personal effects. The insurance provides cover for accidental damage to household and personal goods in transit.</p>

        </CardBody>
      </Card>
    </div>
  )
}
