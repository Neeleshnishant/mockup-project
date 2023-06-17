import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Accordion, AccordionItem, Button, Card, CardBody, CardHeader, Col, Collapse, Table, Form, Label, Input, Container, Row } from 'reactstrap';
import TableRows from "./TableRow";
export const Invoice = () => {
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
      <Card  >
        <Row className='m-3'>
          <Col lg={3} className='hstack gap-2 p-0'>
            <Button className='btn btn-soft-dark'><i className='bx bxs-file-pdf fs-15' /> Generate Invoice PDF</Button>
            <Link
              to="#"
              className=" btn btn-sm btn-success fs-13 pt-1" >
              <i className="bx bxs-download fs-20 p-1"></i>
            </Link>
          </Col>
          <Col lg={3} className='hstack gap-2 p-0'>
            <Button className='btn btn-soft-dark'><i className='bx bxs-file-pdf fs-15' /> Generate POD PDF</Button>
            <Link
              to="#"
              className=" btn btn-sm btn-success fs-13 pt-1" >
              <i className="bx bxs-download fs-20 p-1"></i>
            </Link>
          </Col>
          <Col lg={3} className='hstack gap-2 p-0'>
            <Button className='btn btn-soft-dark'><i className='bx bxs-file-pdf fs-15' /> Generate Work Order PDF</Button>
            <Link
              to="#"
              className=" btn btn-sm btn-success fs-13 pt-1" >
              <i className="bx bxs-download fs-20 p-1"></i>
            </Link>
          </Col>
          <Col lg={3} className='hstack gap-2 justify-content-end p-0'>
            <Button className='btn btn-soft-dark'><i className='bx bxs-file-pdf fs-15' /> Generate Insurance Quote</Button>
            <Link
              to="#"
              className=" btn btn-sm btn-success fs-13 pt-1" >
              <i className="bx bxs-download fs-20 p-1"></i>
            </Link>
          </Col>
        </Row>
        <div className='m-3'>
          <h5> Invoice #321 - 0</h5>
          <Table className='table-bordered mt-3'>
            <thead className='bg-soft-purple'>
              <tr>
                <th>Item Name & Description</th>
                <th>Tax</th>
                <th>Unit Price</th>
                <th>QTY</th>
                <th>Total Inc Tax</th>
                <th></th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Call out fee</td>
                <td> GST</td>
                <td> $20.99</td>
                <td> 1.00</td>
                <td> $20.99</td>
                <td>
                  <div className='hstack gap-2'>
                    <button className="btn btn-sm btn-soft-info edit-list">
                      <i className="bx bxs-pencil fs-12 pt-1"></i>
                    </button>

                    <Link
                      to="#"
                      className=" btn btn-sm btn-soft-danger fs-13 pt-1" >
                      <i className="bx bxs-trash fs-12"></i>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td>40m3 truck</td>
                <td> GST</td>
                <td> $20.99</td>
                <td> 1.00</td>
                <td> $120.99</td>
                <td>
                  <div className='hstack gap-2'>
                    <button className="btn btn-sm btn-soft-info edit-list">
                      <i className="bx bxs-pencil fs-12 pt-1"></i>
                    </button>

                    <Link
                      to="#"
                      className=" btn btn-sm btn-soft-danger fs-13 pt-1" >
                      <i className="bx bxs-trash fs-12"></i>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td>20' container</td>
                <td> GST</td>
                <td> $60.99</td>
                <td> 1.00</td>
                <td> $60.99</td>
                <td>
                  <div className='hstack gap-2'>
                    <button className="btn btn-sm btn-soft-info edit-list">
                      <i className="bx bxs-pencil fs-12 pt-1"></i>
                    </button>

                    <Link
                      to="#"
                      className=" btn btn-sm btn-soft-danger fs-13 pt-1" >
                      <i className="bx bxs-trash fs-12"></i>
                    </Link>
                  </div>
                </td>
              </tr>
              <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
            </tbody>
          </Table>
          <button className="btn btn-primary" onClick={addTableRows} >+</button>
        </div>
        <div className='m-3 hstack gap-3'>
          <h5> Charges</h5> <Button className='btn btn-soft-dark'>Recalculate</Button>
        </div>
        <div className='m-3'>
          <Table className='table-bordered'>
            <tbody>
              <tr>
                <td> Weekend surcharge</td>
                <td>GST</td>
                <td> $1.00</td>
                <td>1.00</td>
                <td>$1.00</td>
                <td>
                  <div className='hstack gap-2'>
                    <button className="btn btn-sm btn-soft-info edit-list">
                      <i className="bx bxs-pencil fs-12 pt-1"></i>
                    </button>

                    <Link
                      to="#"
                      className=" btn btn-sm btn-soft-danger fs-13 pt-1" >
                      <i className="bx bxs-trash fs-12"></i>
                    </Link>
                  </div>
                </td>
              </tr>
              <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
            </tbody>
          </Table>
          <Button className="btn btn-brown" onClick={addTableRows} >+</Button>
        </div>
        <Row>
          <Col lg={6}></Col>
          <Col lg={6}>
            <Table className="table-bordered ">
              <tbody>
                <tr>
                  <th className='bg-soft-purple'><span>Total (excl tax)</span></th>
                  <td><span id="grand_total_excl_tax">$161.00</span></td>
                </tr>
                <tr>
                  <th className='bg-soft-purple'><span>
                    Discount
                    <span id="discount_type_label"> - fixed</span>
                    <Input type="hidden" id="discount_type_field" value="fixed" />
                    <div className="list-icons float-right">
                      <div className="dropdown">
                        <a className="list-icons-item dropdown-toggle caret-0" data-toggle="dropdown" aria-expanded="false"><i className="icon-menu"></i></a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item discount_type_option" data-val="fixed"><i className="icon-coin-dollar"></i> Fixed</a>
                          <a className="dropdown-item discount_type_option" data-val="percent"><i className="icon-percent"></i> Percent</a>
                        </div>
                      </div>
                    </div>
                  </span>
                  </th>
                  <td>
                    <span>
                      <div id="discount_value" className="form-group hidden">
                        <div className="input-group input-group-sm">
                          <Input type="number" id="discount_value_field" className="form-control" value="0" />
                        </div>
                        <div className="d-flex justify-content-start align-items-center m-t-10">
                          <Button id="cancel_discount_btn" className="btn btn-light"> Cancel</Button>
                          <Button id="save_discount_btn" className="btn btn-success ml-2"> Save</Button>
                        </div>
                      </div>
                      <div id="discount_label">
                        0%

                      </div>
                    </span>
                  </td>
                </tr>
                <tr>
                  <th className='bg-soft-purple'><span>Total (excl tax) after discount</span></th>
                  <td><span id="grand_total_excl_tax">$161.00</span></td>
                </tr>
                <tr>
                  <th className='bg-soft-purple'><span>Tax</span></th>
                  <td><span id="grand_total_tax">$16.00</span></td>
                </tr>
                <tr>
                  <th className='bg-soft-purple'><span>Total (incl tax)</span></th>
                  <td><span id="grand_total_incl_tax">$177.00</span></td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card>
      <Card>
        <div className='m-3 hstack gap-3'>
          <span className="badge badge-soft-success badge-border fs-14">PAYMENTS</span>
          <Button size="sm" className='btn btn-primary'> Add Stripe Payment </Button>
          <div className="form-check form-check-info ">
            <Input className="form-check-input" type="checkbox" id="formCheck11" defaultChecked />
            <Label className="form-check-label" for="formCheck11">
              <b>Allow Installment Payments</b>
            </Label>
          </div>
        </div>
        <div className='m-3'>
          <Table className='table-bordered'>
            <thead className='bg-soft-purple'>
              <tr>
                <th>Payment Method</th>
                <th>Reference / Notes</th>
                <th>Paid On</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bank Transfer</td>
                <td>3</td>
                <td>01/mm/yy</td>
                <td> $234</td>
                <td>
                  <div className='hstack gap-2'>
                    <button className="btn btn-sm btn-soft-info edit-list">
                      <i className="bx bxs-pencil fs-12 pt-1"></i>
                    </button>
                    <Link
                      to="#"
                      className=" btn btn-sm btn-soft-danger fs-13 pt-1" >
                      <i className="bx bxs-trash fs-12"></i>
                    </Link>
                  </div>
                </td>
              </tr>
              <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
            </tbody>

          </Table>
          <Button className="btn btn-brown" onClick={addTableRows} >+</Button>
        </div>

        <Row>
          <Col lg={6}></Col>
          <Col lg={6}>
            <Table className="table-bordered ">
              <tbody>
                <tr>
                  <th className='bg-soft-purple'><span>Payments</span></th>
                  <td><span id="grand_total_tax">$16.00</span></td>
                </tr>
                <tr>
                  <th className='bg-soft-purple'><span>Balance</span></th>
                  <td><span id="grand_total_incl_tax">$177.00</span></td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card>
      <Card>
        <div className='m-3'>
          <span className="badge badge-soft-success badge-border fs-14">ACTUAL HOURS</span>
        </div>
        <div className='m-3'>
          <Table className='table-bordered'>
            <thead className='bg-soft-purple'>
              <tr>
                <th>Leg #</th>
                <th>Leg Date</th>
                <th>Job Start Time</th>
                <th>Job ENd Time</th>
                <th>Total Hours</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>3/mm/yy</td>
                <td>--</td>
                <td> --</td>
                <td>0</td>
                <td>
                  <div className='hstack gap-2'>
                    <button className="btn btn-sm btn-soft-info edit-list">
                      <i className="bx bxs-pencil fs-12 pt-1"></i>
                    </button>
                    <Link
                      to="#"
                      className=" btn btn-sm btn-soft-danger fs-13 pt-1" >
                      <i className="bx bxs-trash fs-12"></i>
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
          <Button className='btn btn-light'> <i className='bx bx-clipboard' /> Update & Generate Invoice</Button>
        </div>
      </Card>
    </div>
  )
}
