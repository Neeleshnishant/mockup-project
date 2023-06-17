import React from 'react'
import { Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane, Label, UncontrolledTooltip, Button, CardHeader, Input } from "reactstrap";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const Invoices = () => {
  document.title = "Widgets | Onexfort";
  return (


    <Container fluid>
      <Card>
        <CardHeader><h5 className='m-0'>Update Invoice Settings </h5></CardHeader>
        <CardBody>
          <Row>
            <Col lg={12} className='mb-3'>
              <Label>Invoice Prefix</Label>
              <Input>INV</Input>
            </Col>
            <Col lg={6}>
              <Label> Due After </Label>
              <Input placeholder='Days'>
              </Input>
            </Col>
            <Col lg={6}>
              <Label>Mobile App- Send Email to Customer - Email Template </Label>
              <select className="form-select mb-3" aria-label="Default select example">

                <option defaultValue="1">Follow up - 1 Box Removals</option>
                <option defaultValue="2">Insurance Quote</option>
                <option defaultValue="3">Inventory PDF Attached</option>
                <option defaultValue="4">Proof Of Delivery </option>
                <option defaultValue="5">Your Invoice is Ready </option>
                <option defaultValue="6">Your Move is in Two Days </option>
                <option defaultValue="7">Your Quote is Ready </option>
                <option defaultValue="8">Your Work Order </option>
              </select>
            </Col>
            <Col lg={12} className='mb-3'>
              <Label>Invoice Terms</Label>
              <CKEditor
                editor={ClassicEditor}
                data="<p>All Payments are COD</p>"
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.

                }}
                onChange={(editor) => {
                  editor.getData();
                }}
              />
            </Col>
            <Col lg={6}>
              <Label>Credit Card Processing Free Percentx</Label>
              <Input value={2.00}></Input>
            </Col>
            <Col lg={6}>
              <Label>Credit Card Processing Product Item </Label>
              <select className="form-select mb-3" aria-label="Default select example">

                <option defaultValue="1">Credit Card Processing fee</option>
                <option defaultValue="2">Zero Price Product</option>
                <option defaultValue="3">Call Out Fee</option>
                <option defaultValue="4">Tax Test </option>
                <option defaultValue="5">Testing </option>
                <option defaultValue="6">Interstate Fixed Price </option>
                <option defaultValue="7">Weekend Surcharge</option>
                <option defaultValue="8">Your Work Order </option>
              </select>
            </Col>
            <Col lg={6} className='mb-3'>
              <Label className="form-check-label" for="customSwitchsizelg">Strip Pre Authorised Opportunity Status</Label>
              <div className="form-check form-switch form-switch-lg" dir="ltr">
                <Input type="checkbox" className="form-check-input" id="customSwitchsizelg" defaultChecked="" />

              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Label>Strip Pre Authorised Opportunity Status </Label>
              <select className="form-select mb-3" aria-label="Default select example">

                <option defaultValue="1">New</option>
                <option defaultValue="2">Quote Sent</option>
                <option defaultValue="3">Follow up 1</option>
                <option defaultValue="4">Follow up 2 </option>
                <option defaultValue="5">Confirmed </option>
                <option defaultValue="6">Lost </option>
                <option defaultValue="7">Pre Authorised</option>
              </select>
            </Col>
          </Row>
        </CardBody>
        <hr></hr>
        <div className='hstack mb-3 gap-2 flex-wrap justify-content-center'>
        <Button className='btn btn-success'>Update</Button>
        <Button className='btn btn-danger'>Reset</Button>
        </div>
    
      </Card>
    </Container>

  )
}
