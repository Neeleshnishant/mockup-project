import { Card, CardBody, Col,  Row, } from "reactstrap";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import "../../../assets/scss/pages/_settings.scss";
import {
  CardHeader,
  Input,
  Table,
} from "reactstrap";
import 'react-toastify/dist/ReactToastify.css';
export const ConfigureEmail = () => {

  return (
    <div>
      <Card>
        <CardHeader>
          <h5 className="mb-0 text-primary">Configure Email Settings</h5>
        </CardHeader>
        <CardBody>
          <Row className="mb-3">
            <Col lg={4}>
              <h5 >Email server Created</h5>
            </Col>
            <Col lg={3}>
              <i className="bx bxs-check-circle check-icon"></i>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={4}>
              <h5 >Domain</h5>
            </Col>
            <Col lg={3}>
              <i className="bx bxs-check-circle check-icon"></i>
            </Col>
          </Row>

          <Col lg={6}>
            <div className="input-group mb-4">
              <Input type="text" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" placeholder="Your website domain here" />
              <button className="btn btn-brown" type="button" disabled >Configure Domain</button>

            </div>
          </Col>
          <h5 >DNS Setting</h5>

          <p>Head over to DNS provider and add the following records to verify your domain for sending emails through Onexfort.</p>
          <p>ReturnPathDomain </p>

          <div className="live-preview">

            <Table className="table table-bordered table-nowrap align-middle">
              <thead className="table-light">
                <tr>
                  <th ></th>
                  <th >Hostname</th>
                  <th >Type</th>
                  <th >Add this value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>DKIM<br /><span className="badge bg-success">Active</span></td>
                  <td> 20210119064148pm._domainkey.schoolboard.com.au</td>
                  <td>TXT</td>
                  <td>
                    k=rsa;p=MIGfM
                  </td>
                </tr>
                <tr>
                  <td>Return-Pat</td>
                  <td>pm-bounces.schoolboard.com.au</td>
                  <td>CNAME</td>
                  <td>
                    pm.mtasv.net
                  </td>
                </tr>
              </tbody>
            </Table>

          </div>
          <div className="mb-4">
            <p>Help Article: Resources for adding DNS records for common hosts and DNS providers</p>
          </div>

          <h5>Default Email For Communication</h5>
          <Col lg={6}>
            <div className="input-group mb-4">
              <Input type="text" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" placeholder="info@schoolboard.com.au" />
              <button className="btn btn-success" type="button" id="button-addon2" >Update</button>
            </div>
          </Col>

          <h5>Email Forwarding</h5>
          <p>Head over to your Email service provider and set up to forward a copy of the email received as follows:</p>
          <p>
            info@schoolboard.com.au&nbsp; &nbsp; &nbsp;
            <b>forward a copy to</b>
            &nbsp; &nbsp; &nbsp;
            a23e24beed8df159e52436319bb3398b@inbound.postmarkapp.com
          </p>
          <p> Help Article:<a className="text-info" href="Configuring email forwarding in Gmail/Google Apps"> Configuring email forwarding in Gmail/Google Apps</a></p>

        </CardBody>
      </Card>
    </div>
  )
}
