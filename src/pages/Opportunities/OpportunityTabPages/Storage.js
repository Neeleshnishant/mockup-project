import React, { useState } from 'react'
import { Accordion, AccordionItem, Button, Card, CardBody, CardHeader, Col, Collapse, Table, Form, Label, Input, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Flatpickr from "react-flatpickr";
import TableRows from "./TableRow";
export const Storage = () => {
  const [rowsData, setRowsData] = useState([]);
  const addTableRows = () => {

    const rowsInput = {
      fullName: '',
      emailAddress: '',
      salary: ''
    }
    setRowsData([...rowsData, rowsInput])

  }

  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  }
  const handleChange = (index, evnt) => {

    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);

  }
  return (
    <div>
      <Card>
        <CardHeader>
          <h5>Reservation</h5>
        </CardHeader>
        <CardBody>
 
          <Row className='hstack gap-3'>
            <Col lg={3} className='mt-3'>
              <Label><h6>Storage Type</h6></Label>
              <select className="form-select mb-3" aria-label="Default select example">
                <option >20' COntainer</option>
                <option defaultValue="1">40' COntainer</option>
                <option defaultValue="2">Capsule New</option>
                <option defaultValue="3">Container</option>
              </select>
            </Col>
            <Col lg={3} className='mt-3'>
              <Label><h6>Location</h6></Label>
              <select className="form-select mb-3" aria-label="Default select example">
                <option >Ware</option>
                <option defaultValue="1">Sydney Warehouse</option>
              </select>
            </Col>
            <Col lg={3}>
              <Label><h6>Start Date</h6></Label>
              <Flatpickr
                className="form-control"
                options={{
                  dateFormat: "d M, Y",
                  defaultDate: ["2022-01-20"]
                }}
              />
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col lg={9} className='text-muted'>
              <p > *Use the search when you want to add a new resrvation <br />Enter the parameters for the search and click on the Search</p>
            </Col>
            <Col lg={3} className='hstack gap-3'>
              <Button className='btn btn-success'>Search</Button>
              <Button className='btn btn-dark'>Reset</Button>

            </Col>
          </Row>
          <Table className='mt-5 table-bordered' >
            <thead className='bg-soft-purple'>
              <tr>
                <th>Storage Job Number</th>
                <th>Move In</th>
                <th>Move Out</th>
                <th>Status</th>
                <th>Volume</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>2312/mm/dd</td>
                <td>yyyy/mm/dd</td>
                <td>Active</td>
                <td>0 cbm</td>
                <td className='hstack gap-2'>
                  <button className="btn btn-sm btn-soft-info edit-list">
                    <i className="bx bxs-pencil fs-12 pt-1"></i>
                  </button>

                  <Link
                    to="#"
                    className=" btn btn-sm btn-soft-danger fs-13 pt-1" >
                    <i className="bx bxs-trash fs-12"></i>
                  </Link>
                </td>
              </tr>
            </tbody>
          </Table>
          <Table className='mt-5 table-bordered' >
            <thead className='bg-soft-purple'>
              <tr>
                <th>Storage Unit</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> No Reservations found!</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <h5>Estimate</h5>
        </CardHeader>
        <CardBody>
          <p className='text-muted'>Generate an estimate in this section only if you want the storage invoice seperate from the removals job invoice</p>
          <Table className='table-bordered mt-4'>
            <thead className='bg-soft-purple'>
              <tr>
                <th>Item Name & Description</th>
                <th>Tax</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Total Inc Tax</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No record available!</td>
              </tr>
              <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
            </tbody>
          </Table>
          <Button className="btn btn-brown" onClick={addTableRows} >+</Button>
          <Row>
            <Col lg={6}></Col>
            <Col lg={6}>
              <Table className="table-bordered ">
                <tbody>
                  <tr>
                    <th className='bg-soft-purple'><span>Total (excl tax)</span></th>
                    <td><span id="grand_total_tax">$16.00</span></td>
                  </tr>
                  <tr>
                    <th className='bg-soft-purple'><span>Tax</span></th>
                    <td><span id="grand_total_incl_tax">$7.00</span></td>
                  </tr>
                  <tr>
                    <th className='bg-soft-purple'><span>Total (incl tax)</span></th>
                    <td><span id="grand_total_incl_tax">$177.00</span></td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>
     
    </div>
  )
}
