import React, { useState } from 'react';

import { Card, CardBody, CardHeader, Col, Container, Row, Table } from "reactstrap";
import TableInput from './checklist.js';
import { Link } from "react-router-dom";
// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';


const PeopleSettings = () => {



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
    document.title = "Widgets | Onexfort";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Roles & Permission" pageTitle="Onexfort" />
                    <Row>
                        <Col xl={3}>
                            <Card>
                                <CardHeader> <h6 className='text-brown'> <i className='bx bx-list-ol '></i> Roles & Permission</h6></CardHeader>
                            </Card>
                        </Col>

                        <Col xl={9}>
                            <Card>
                                <CardBody>
                                    <Table className="table table-bordered   align-middle mb-3">
                                        <thead className="bg-light">
                                            <tr>
                                                <th className="listTypeHead" >

                                                    Role Name
                                                </th>
                                                <th>
                                                    Description
                                                </th>
                                                <th>
                                                    Action
                                                </th>

                                            </tr>

                                        </thead>
                                        <tbody className="mb-3">
                                            <tr>
                                                <td className="fw-medium">App Administrator</td>
                                                <td className="fw-medium">Admin is allowed to manage everything of the app.</td>
                                                <td>
                                                    <div className="hstack gap-3 flex-wrap">
                                                        <Link to="#" className="link-success fs-15"><i className="ri-edit-2-line"></i></Link>
                                                        <Link to="#" className="link-danger fs-15"><i className="ri-delete-bin-line"></i></Link>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Field worker</td>
                                                <td className="fw-medium">Drivers and field workers can see only jobs assigned to them</td>
                                                <td>
                                                    <div className="hstack gap-3 flex-wrap">
                                                        <Link to="#" className="link-success fs-15"><i className="ri-edit-2-line"></i></Link>
                                                        <Link to="#" className="link-danger fs-15"><i className="ri-delete-bin-line"></i></Link>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Operations Manager</td>
                                                <td className="fw-medium">Operation Manager</td>
                                                <td>
                                                    <div className="hstack gap-3 flex-wrap">
                                                        <Link to="#" className="link-success fs-15"><i className="ri-edit-2-line"></i></Link>
                                                        <Link to="#" className="link-danger fs-15"><i className="ri-delete-bin-line"></i></Link>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Sales Person</td>
                                                <td className="fw-medium">Sales Person</td>
                                                <td>
                                                    <div className="hstack gap-3 flex-wrap">
                                                        <Link to="#" className="link-success fs-15"><i className="ri-edit-2-line"></i></Link>
                                                        <Link to="#" className="link-danger fs-15"><i className="ri-delete-bin-line"></i></Link>
                                                    </div>
                                                </td>
                                            </tr>
                                            <TableInput rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />

                                        </tbody>

                                        <button className="btn btn-primary mt-3" onClick={addTableRows} >+</button>
                                    </Table>
                                </CardBody>

                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default PeopleSettings;
