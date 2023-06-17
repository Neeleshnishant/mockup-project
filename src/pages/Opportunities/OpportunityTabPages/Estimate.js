import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Accordion, AccordionItem, Button, Card, CardBody, CardHeader, Col, Collapse, Table, Form, Label, Input, Container, Row } from 'reactstrap';
import TableRows from "./TableRow";
export const Estimate = () => {
  //rowsdata
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
    <div >
      <Card>
        <Row className='m-3'>
          <Col lg={2} >
            <h5 className='pt-2'> Opportunity # </h5>
            </Col>
            <Col lg={2}>             
            <select className="form-select" aria-label="Default select example">
              <option >Moving 335</option>
            </select>
          </Col>
          <Col lg={4} className='hstack gap-2 p-0 justify-content-end'>
            <Button className='btn btn-soft-dark'><i className='bx bxs-file-pdf fs-15' /> Generate Estimate PDF</Button>
            <Link
              to="#"
              className=" btn btn-sm btn-success fs-13 pt-1" >
              <i className="bx bxs-download fs-20 p-1"></i>
            </Link>
          </Col>

          <Col lg={4} className='hstack gap-2 justify-content-end p-0'>
            <Button className='btn btn-soft-dark'><i className='bx bxs-file-pdf fs-15' /> Generate Insurance Quote</Button>
            <Link
              to="#"
              className=" btn btn-sm btn-success fs-13 pt-1" >
              <i className="bx bxs-download fs-20 p-1"></i>
            </Link>
          </Col>
        </Row>
        <div className='m-3'>

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
        </div>
      </Card>
    </div>
  )
}
