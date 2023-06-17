import { Card, CardBody, } from "reactstrap";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from 'reactstrap'
import "../../../assets/scss/pages/_settings.scss";
// Import Images
import connectXero from "../../../assets/images/connectxero.jpg";
import {
  CardHeader,
} from "reactstrap"
import 'react-toastify/dist/ReactToastify.css';
export const ConnectXero = () => {

  return (
    <div>
      <Card>
        <CardHeader>
          <h5 className="mb-0 text-brown">Connect XERO</h5>
        </CardHeader>
        <CardBody>
          <img src={connectXero} className="img img-responsive img-powered-by-stripe " alt="Connect XERO" />
          <p><span style={{ color: "black" }}>  <p>Connect XERO and Onexfort will automatically add invoices, payments & customers to your XERO account.
            When you click connect, a XERO window will open. There are following quick steps to do there
          </p>
            <p>1 - Login to your XERO account</p>
            <p>2 - Select the organization you want to sync with Onexfort</p>
            <p>3 - Authorize the connection to Onexfort</p>
            <p>4 - XERO accounts configuration</p></span></p>
        </CardBody>
        <CardBody>
          <Button color="info"  > Connect with Xero </Button>
        </CardBody>

      </Card>
    </div>
  )
}
