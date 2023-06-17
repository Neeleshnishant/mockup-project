import { Card, CardBody, } from "reactstrap";
import React from "react";
import { Button } from 'reactstrap';
import "../../../assets/scss/pages/_settings.scss";
// Import Images
import connectmyob from "../../../assets/images/connectmyob.png"
import {
  CardHeader,
} from "reactstrap";
import 'react-toastify/dist/ReactToastify.css';

export const ConnectMYOB = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <h5 className="mb-0 text-primary">Connect MYOB</h5>
        </CardHeader>
        <CardBody>

          <img src={connectmyob} className="img img-responsive img-powered-by-stripe" alt="Connect MYOB" />
          <p><span  >Connect MYOB and Onexfort will automatically add invoices, payments & customers to your MYOB account.
            When you click connect, a MYOB window will open. There are following quick steps to do there<p>
              1- Login to your MYOB account
            </p><p>2- Select the organization you want to sync with Onexfort</p>
            <p>3- Authorize the connection to Onexfort</p>
            <p>4- MYOB accounts configuration</p>
          </span></p>
        </CardBody>
        <CardBody>
          <Button color="success">
            Connect</Button>
        </CardBody>

      </Card>
    </div>
  )
}
