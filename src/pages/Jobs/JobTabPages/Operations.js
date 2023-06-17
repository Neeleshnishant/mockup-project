import React, { useState } from 'react'
import { Accordion, AccordionItem, Button, Card, CardBody, CardHeader, Col, Collapse, Table, Form, Label, Input, Container, Row } from 'reactstrap';
import { Link } from "react-router-dom";
import TableRows from "./TableRow";
import Flatpickr from "react-flatpickr";
export const Operations = () => {

    //rowsdata
    const [rowsData, setRowsData] = useState([]);
    const [coll1, setcoll1] = useState(false);

    const t_coll1 = () => {
        setcoll1(!coll1);
    };
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
                <Row className='m-3'>
                    <Col lg={6} className='border-end'>
                        <Row>
                            <Col lg={2} className="p-1">
                                <p className="p-2">
                                    <b>#1</b>
                                </p>
                            </Col>
                            <Col lg={10} className="p-2">
                                <p className="mb-3">
                                    <b>06/05/2023</b>
                                    <span><b>08:00 - 10:!2</b></span>
                                </p>
                                <ul className='mb-3'>
                                    <li><a>Menindee NSW</a></li>
                                    <li><a>Menindee NSW</a></li>
                                </ul>
                                <div>
                                    <p>
                                        <b>Dispatch Notes:</b>
                                    </p>
                                </div>
                            </Col>
                        </Row>

                    </Col>
                    <Col lg={6}>
                        <Row>
                            <Col lg={6}>
                                <Table className='table-borderless'>
                                    <tbody>
                                        <tr>
                                            <td><b>Driver</b></td>
                                            <td>"Ammy Driver"</td>
                                        </tr>
                                        <tr>
                                            <td><b>Vehicle:</b></td>
                                            <td>20T interstate Truck</td>
                                        </tr>
                                        <tr>
                                            <td><b>Multiple Trips:</b></td>
                                            <td>No</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                            <Col lg={6} >
                                <div className='hstack gap-2 justify-content-end m-3'>
                                    <button className="btn btn-sm btn-soft-info edit-list">
                                        <i className="bx bxs-pencil fs-12 pt-1"></i>
                                    </button>

                                    <Link
                                        to="#"
                                        className=" btn btn-sm btn-soft-danger fs-13 pt-1" >
                                        <i className="bx bxs-trash fs-12"></i>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                        <Row className='p-2'>
                            <div className='hstack gap-3 '>
                                <Button className='btn btn-teal'>Notify Driver</Button>
                                <Button className='btn btn-teal'>(Re) Assign Driver</Button>
                            </div>
                        </Row>
                    </Col>
                </Row>
                <Row className='m-3'>
                    <h6 className='p-0'>Offsiders</h6>
                    <Col lg={12}>
                        <Table className='table-bordered mt-2'>
                            <thead  className='bg-soft-purple'>
                                <tr>
                                    <th>Name</th>
                                    <th>System User?</th>
                                    <th>Status</th>
                                    <th>Notify</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>John Doe</td>
                                    <td>Y</td>
                                    <td className='text-success'>New</td>
                                    <td><Button className='btn btn-sm btn-soft-dark'>Notify</Button></td>
                                    <td> <div className='hstack gap-2'>
                                        <button className="btn btn-sm btn-soft-info edit-list">
                                            <i className="bx bxs-pencil fs-12 pt-1"></i>
                                        </button>

                                        <Link
                                            to="#"
                                            className=" btn btn-sm btn-soft-danger fs-13 pt-1" >
                                            <i className="bx bxs-trash fs-12"></i>
                                        </Link>
                                    </div></td>
                                </tr>
                                <tr>
                                    <td>Jane Doe</td>
                                    <td>N</td>
                                    <td className='text-success'>New</td>
                                    <td><Button className='btn btn-sm btn-soft-dark'>Notify</Button></td>
                                    <td> <div className='hstack gap-2'>
                                        <button className="btn btn-sm btn-soft-info edit-list">
                                            <i className="bx bxs-pencil fs-12 pt-1"></i>
                                        </button>

                                        <Link
                                            to="#"
                                            className=" btn btn-sm btn-soft-danger fs-13 pt-1" >
                                            <i className="bx bxs-trash fs-12"></i>
                                        </Link>
                                    </div></td>
                                </tr>
                                <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
                            </tbody>
                        </Table>
                        <button className="btn btn-primary" onClick={addTableRows} >+</button>
                    </Col>
                </Row>
                <div className='m-4'>
                    <Button
                        className='btn btn-teal'
                        onClick={t_coll1}
                        style={{ cursor: "pointer" }}
                    >
                        + Add New Leg
                    </Button>
                    <Collapse isOpen={coll1} id="collapseExample">
                        <div className="card mb-0">
                            <CardBody>
                                <Row>
                                    <Col lg={6} className='border'>
                                        <Row className='mb-3'>
                                            <Col lg={4}>
                                                <Flatpickr
                                                    className="form-control"
                                                    options={{
                                                        dateFormat: "d M, Y",
                                                        defaultDate: ["2022-01-20"]
                                                    }}

                                                />
                                            </Col>
                                            <Col lg={4}>
                                                <Flatpickr
                                                    className="form-control"
                                                    placeholder='--:--'
                                                    options={{
                                                        enableTime: true,
                                                        noCalendar: true,
                                                        dateFormat: "H:i",
                                                        time_24hr: true
                                                    }}
                                                />
                                            </Col>
                                            <Col lg={4}>
                                                <Flatpickr
                                                    className="form-control"
                                                    placeholder='--:--'
                                                    options={{
                                                        enableTime: true,
                                                        noCalendar: true,
                                                        dateFormat: "H:i",
                                                        time_24hr: true
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className='mb-3'>
                                            <Col lg={8}>
                                                <Input value=" Menindee NSW"></Input>
                                            </Col>
                                        </Row>
                                        <Row className='mb-3'>
                                            <Col lg={8}>
                                                <Input value=" Mentone VIC"></Input>
                                            </Col>
                                        </Row>
                                        <h6> Dispatch notes</h6>
                                        <Row>
                                            <Col>
                                                <textarea className='form-control' rows="2"></textarea></Col>
                                        </Row>
                                    </Col>
                                    <Col lg={6}>
                                        <Row>
                                            <Col lg={3}>
                                                <label> <h6>Status</h6></label>
                                            </Col>
                                            <Col lang={9}>
                                                <select className="form-select mb-3" aria-label="Default select example">
                                                    <option defaultValue="1">New</option>
                                                    <option defaultValue="2">Picked up</option>
                                                </select>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={3}>
                                                <label> <h6>Driver</h6></label>
                                            </Col>
                                            <Col lang={9}>
                                                <select className="form-select mb-3" aria-label="Default select example">
                                                    <option defaultValue="1">Ammy</option>
                                                    <option defaultValue="2">Jason</option>
                                                </select>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={3}>
                                                <label> <h6>Vehicle</h6></label>
                                            </Col>
                                            <Col lang={9}>
                                                <select className="form-select mb-3" aria-label="Default select example">
                                                    <option defaultValue="1">20 T</option>
                                                    <option defaultValue="2">Caddy</option>
                                                </select>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={3}>
                                                <label> <h6>Multiple Trips?</h6></label>
                                            </Col>
                                            <Col lang={9}>

                                            </Col>
                                        </Row>

                                        <div className='hstack gap-3 mt-3'>
                                            <Button className='btn btn-success'>Save</Button>
                                            <Button className='btn btn-danger'>Cancel</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </div>
                    </Collapse>
                </div>

            </Card>
            <div>
                <h5>Trips</h5>
                <Input className='mt-3' placeholder='No trip record found!'></Input>
            </div>

            <hr></hr>
            <div>
                <h5> Material Issues </h5>
                <Button className='btn btn-teal mt-3 mb-3'>Update & Generate Invoice</Button>
                <Card className='mb-1'>
                    <Table className='table-bordered mb-0 '>
                        <thead>
                            <tr>
                                <th>Item Name & Description</th>
                                <th>Qty</th>
                                <th>Date Issues</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>No records available</td>
                            </tr>
                            <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
                        </tbody>
                    </Table>
                </Card>
                <button className="btn btn-primary" onClick={addTableRows} >+</button>
            </div>
            <div className='mt-3'>
                <h5> Material Returns </h5>
                <Card className='mb-1 mt-2'>
                    <Table className='table-bordered mb-0 '>
                        <thead>
                            <tr>
                                <th>Item Name & Description</th>
                                <th>Qty</th>
                                <th>Date Issues</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>No records available</td>
                            </tr>
                            <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
                        </tbody>
                    </Table>
                </Card>
                <button className="btn btn-primary" onClick={addTableRows} >+</button>
            </div>
            <div className='mt-3'>
                <h5> Pickup - OHS Risk Assessment</h5>
                <Card className='mb-1 mt-2'>
                    <Table className='table-bordered mb-0 '>
                        <thead>
                            <tr>
                                <th>Site Risk Assessment</th>
                                <th>Y/N/NA</th>
                                <th>Control Measures</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>No records available !</td>
                            </tr>
                            <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
                        </tbody>
                    </Table>
                </Card>
                <button className="btn btn-primary" onClick={addTableRows} >+</button>
            </div>
            <div className='mt-3'>
                <h5> Delivery - OHS Risk Assessment</h5>
                <Card className='mb-1 mt-2'>
                    <Table className='table-bordered mb-0 '>
                        <thead>
                            <tr>
                                <th>Site Risk Assessment</th>
                                <th>Y/N/NA</th>
                                <th>Control Measures</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>No records available !</td>
                            </tr>
                            <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
                        </tbody>
                    </Table>
                </Card>
                <button className="btn btn-primary" onClick={addTableRows} >+</button>
            </div>

            <h5 className='mt-3 mb-2'> Customer Signature</h5>
            <Card className='p-2'>
                No signatures found.
            </Card>
            <h5>Attachments</h5>
            <Card className='p-3 mt-2'></Card>
        </div>
    )
}
