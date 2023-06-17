import React, { useState } from 'react';
import { Col, Input, Label, Row, CardHeader, CardBody, Accordion, AccordionItem, Collapse, Card, Container, Table } from 'reactstrap';
import Flatpickr from "react-flatpickr";
import classnames from "classnames";

// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';

const OperationsReport = () => {
    const [col1, setcol1] = useState(false);
    const t_col1 = () => {
        setcol1(!col1);

    };
    document.title = "Widgets | Onexfort";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Field Worker Pay Sheet" pageTitle="Onexfort" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <Accordion id="default-accordion-example">
                                        <AccordionItem>
                                            <h2 className="accordion-header" id="headingOne">
                                                <button
                                                    className={classnames("accordion-button fw-semibold", { collapsed: !col1 })} type="button" onClick={t_col1} style={{ cursor: "pointer" }} >
                                                    Search Filters
                                                </button>
                                            </h2>
                                            <Collapse isOpen={col1} className="accordion-collapse" id="collapseOne" >
                                                <div className="accordion-body">

                                                    <Row>
                                                        <Col lg={2}>
                                                            <div className="mb-3">
                                                                <Label for="createdDateinput" className="form-label">Created Date</Label>
                                                                <Flatpickr
                                                                    className="form-control" placeholder='Start Date'
                                                                    options={{
                                                                        dateFormat: "d M, Y"
                                                                    }}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col lg={2}>
                                                            <div className="mb-3">
                                                                <Label for="createdDateinput" className="form-label" >End Date</Label>
                                                                <Flatpickr
                                                                    className="form-control" placeholder='End Date'
                                                                    options={{
                                                                        dateFormat: "d M, Y"
                                                                    }}
                                                                />

                                                            </div>
                                                        </Col>

                                                        <Col lg={3}>
                                                            <Label for="Sortingorder" className="form-label">User</Label>
                                                            <select className="form-select mb-3" aria-label="Default select example">
                                                                <option >Jpoe Davids</option>
                                                                <option defaultValue="1">JJ</option>
                                                                <option defaultValue="2">Tom Offsider</option>
                                                                <option defaultValue="1">Usman Ali</option>
                                                                <option defaultValue="1">Erroro</option>
                                                            </select>
                                                        </Col>


                                                        <Col lg={5}>
                                                            <div className="text-end">
                                                                <button type="submit" className="btn form-btn-marg btn-primary">Apply</button>
                                                                <button type="submit" className="btn form-btn-marg btn-primary">Reset</button>
                                                            </div>
                                                        </Col>

                                                    </Row>
                                                </div>
                                            </Collapse>
                                        </AccordionItem>
                                    </Accordion>
                                </CardHeader>
                                <CardBody>
                                    <Table className="table table-bordered mb-5">
                                        <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>Number of Jobs</th>
                                                <th>Hours Worked</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Tom Offsider</td>
                                                <td>1</td>
                                                <td>000.0</td>
                                            </tr>
                                            <tr>
                                                <td>Usman Ali</td>
                                                <td>2</td>
                                                <td>10.70</td>
                                            </tr>
                                            <tr>
                                                <td>JJ</td>
                                                <td>8</td>
                                                <td>13.70</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <h5 className='mb-3' >Local Jobs</h5>
                                    <Table className="table table-bordered mb-5">
                                        <thead>
                                            <tr>
                                                <th>Job Date</th>
                                                <th>Job</th>
                                                <th>Actual Hours</th>
                                                <th>Total Invoice</th>
                                                <th>Payments Received</th>
                                                <th>Balance</th>
                                                <th>Employee</th>
                                                <th>Employe Payment</th>
                                                <th>Company Profit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Tom Offsider</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>000.0</td>
                                            </tr>
                                            <tr>
                                                <td>Usman Ali</td>
                                                <td>2</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>10.70</td>
                                            </tr>
                                            <tr>
                                                <td>JJ</td>
                                                <td>8</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>13.70</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <h5 className='mb-3'>Interstate Trips</h5>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    );
};

export default OperationsReport;
