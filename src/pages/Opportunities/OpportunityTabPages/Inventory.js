import React, { useState } from 'react'
import { Accordion, AccordionItem, Button, Card, CardBody, CardHeader, Col, Collapse, Table, Form, Label, Input, Container, Row } from 'reactstrap';
import classnames from "classnames";
import TableRows from "./TableRow";
import { Link } from 'react-router-dom';
export const Inventory = () => {

  const [col1, setcol1] = useState(true);
  const [col2, setcol2] = useState(false);
  const [col3, setcol3] = useState(false);

  const t_col1 = () => {
    setcol1(!col1);

  };

  const t_col2 = () => {
    setcol2(!col2);

  };

  const t_col3 = () => {
    setcol3(!col3);

  };
  const [blueCounter, setblueCounter] = useState(5);
  function countUP(id, prev_data_attr) {
    id(prev_data_attr + 1);
  }

  function countDown(id, prev_data_attr) {
    id(prev_data_attr - 1);
  }
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
    <Card>
      <CardHeader>
        <Row>
          <Col lg={8}>
            <div className='hstack gap-5'>
              <span><b>Cubic Volume: </b> 25.00 <b>m3</b></span>
              <span><b>Goods Value: </b> $40,000 </span>
              <span><b>Insurance Based on: </b> Value <b><i className='bx bx-pencil' /></b></span>
            </div>
          </Col>
          <Col lg={4}>
            <div className='hstack gap-2'>
              <Button className='btn btn-light'> Generate Inventory PDF</Button>
              <Link
                to="#"
                className=" btn btn-sm btn-success fs-13 pt-1" >
                <i className="bx bxs-download fs-20 p-1"></i>
              </Link>
              <Button className='btn btn-teal'>Calculate</Button>
            </div>

          </Col>
        </Row>

      </CardHeader>
      <CardBody>
        <div className='hstack gap-2'>

          <div className='mt-2'>
            <Input className='form-control' placeholder='Search for inventory' />
          </div>
          <div className='justify-content-end'> <a>Expand all</a></div>

        </div>
        <Accordion id="default-accordion-example" className='mt-3'>
          <AccordionItem>
            <h2 className="accordion-header" id="headingOne">
              <button
                className={classnames("accordion-button fw-semibold", { collapsed: !col1 })} type="button" onClick={t_col1} style={{ cursor: "pointer" }} >
                Study
              </button>
            </h2>
            <Collapse isOpen={col1} className="accordion-collapse" id="collapseOne" >
              <div className="accordion-body hstack gap-3 p-1 pt-3 justify-content-center">
                <b>Bookcase - large </b>
                <div className="input-step step-primary">

                  <button
                    type="button"
                    className="minus"
                    onClick={() => {
                      countDown(setblueCounter, blueCounter);
                    }}
                  >
                    –
                  </button>
                  <Input
                    type="number"
                    className="product-quantity"
                    value={blueCounter}
                    min="0"
                    max="100"
                    readOnly
                  />
                  <button
                    type="button"
                    className="plus"
                    onClick={() => {
                      countUP(setblueCounter, blueCounter);
                    }}
                  >
                    +
                  </button>
                </div>
                <Link
                  to="#"
                >
                  <i className="bx bxs-trash fs-15  p-1"></i>
                </Link>
              </div>
              <div className="accordion-body hstack gap-3 p-1 pb-3 justify-content-center">
                <b>Bookcase - small </b>
                <div className="input-step step-primary">

                  <button
                    type="button"
                    className="minus"
                    onClick={() => {
                      countDown(setblueCounter, blueCounter);
                    }}
                  >
                    –
                  </button>
                  <Input
                    type="number"
                    className="product-quantity"
                    value={blueCounter}
                    min="0"
                    max="100"
                    readOnly
                  />
                  <button
                    type="button"
                    className="plus"
                    onClick={() => {
                      countUP(setblueCounter, blueCounter);
                    }}
                  >
                    +
                  </button>
                </div>
                <Link
                  to="#"
                >
                  <i className="bx bxs-trash fs-15  p-1"></i>
                </Link>
              </div>
            </Collapse>
          </AccordionItem>
          <AccordionItem>
            <h2 className="accordion-header" id="headingTwo">
              <button
                className={classnames("accordion-button fw-semibold", { collapsed: !col2 })} type="button" onClick={t_col2} style={{ cursor: "pointer" }} >
                Bedroom
              </button>
            </h2>
            <Collapse isOpen={col2} className="accordion-collapse" >
              <div className="accordion-body hstack gap-3 p-1 pt-3 justify-content-center">
                <b>Bookcase - large </b>
                <div className="input-step step-primary">

                  <button
                    type="button"
                    className="minus"
                    onClick={() => {
                      countDown(setblueCounter, blueCounter);
                    }}
                  >
                    –
                  </button>
                  <Input
                    type="number"
                    className="product-quantity"
                    value={blueCounter}
                    min="0"
                    max="100"
                    readOnly
                  />
                  <button
                    type="button"
                    className="plus"
                    onClick={() => {
                      countUP(setblueCounter, blueCounter);
                    }}
                  >
                    +
                  </button>
                </div>
                <Link
                  to="#"
                >
                  <i className="bx bxs-trash fs-15  p-1"></i>
                </Link>
              </div>
              <div className="accordion-body hstack gap-3 p-1 pb-3 justify-content-center">
                <b>Bookcase - small </b>
                <div className="input-step step-primary">

                  <button
                    type="button"
                    className="minus"
                    onClick={() => {
                      countDown(setblueCounter, blueCounter);
                    }}
                  >
                    –
                  </button>
                  <Input
                    type="number"
                    className="product-quantity"
                    value={blueCounter}
                    min="0"
                    max="100"
                    readOnly
                  />
                  <button
                    type="button"
                    className="plus"
                    onClick={() => {
                      countUP(setblueCounter, blueCounter);
                    }}
                  >
                    +
                  </button>
                </div>
                <Link
                  to="#"
                >
                  <i className="bx bxs-trash fs-15  p-1"></i>
                </Link>
              </div>

            </Collapse>
          </AccordionItem>
          <AccordionItem>
            <h2 className="accordion-header" id="headingThree">
              <button
                className={classnames("accordion-button fw-semibold", { collapsed: !col3 })} type="button" onClick={t_col3} style={{ cursor: "pointer" }} >
                Cartons & Bags
              </button>
            </h2>
            <Collapse isOpen={col3} className="accordion-collapse" >
              <div className="accordion-body hstack gap-3 justify-content-center">
                <b>Bookcase - large </b>
                <div className="input-step step-primary">

                  <button
                    type="button"
                    className="minus"
                    onClick={() => {
                      countDown(setblueCounter, blueCounter);
                    }}
                  >
                    –
                  </button>
                  <Input
                    type="number"
                    className="product-quantity"
                    value={blueCounter}
                    min="0"
                    max="100"
                    readOnly
                  />
                  <button
                    type="button"
                    className="plus"
                    onClick={() => {
                      countUP(setblueCounter, blueCounter);
                    }}
                  >
                    +
                  </button>
                </div>
                <Link
                  to="#"
                >
                  <i className="bx bxs-trash fs-15  p-1"></i>
                </Link>
              </div>
            </Collapse>
          </AccordionItem>
        </Accordion>

        <Button className='btn btn-teal float-righ mt-3'>Calculate</Button>
        <div className='mt-3'>
          <span className="badge badge-soft-success badge-border fs-14 mt-2">Miscellaneous Items</span>
        </div>
        <Table className='table-bordered mt-3'>
          <thead className='bg-soft-purple'>
            <tr>
              <th>Item Name</th>
              <th>CBM</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Input placeholder='item #1'></Input></td>
              <td><Input placeholder='CBM'></Input></td>
              <td><Input placeholder='quantity'></Input></td>
            </tr>
            <tr>
              <td><Input placeholder='item #1'></Input></td>
              <td><Input placeholder='CBM'></Input></td>
              <td><Input placeholder='quantity'></Input></td>
            </tr>
            <tr>
              <td><Input placeholder='item #1'></Input></td>
              <td><Input placeholder='CBM'></Input></td>
              <td><Input placeholder='quantity'></Input></td>
            </tr>
            <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
          </tbody>
        </Table>
        <Button className="btn btn-brown" onClick={addTableRows} >+</Button>
        <div>
          <Button className='btn btn-teal mt-4'>Calculate</Button>
        </div>
      </CardBody>

    </Card>
  )
}
