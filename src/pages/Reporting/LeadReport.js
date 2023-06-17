import React, { useState } from 'react';
import { Col, Input, Label, Row, CardHeader, CardBody, Accordion, AccordionItem, Collapse, Card, Container, Table } from 'reactstrap';
import Flatpickr from "react-flatpickr";
import classnames from "classnames";

// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';


const LeadReport = () => {
    const [col1, setcol1] = useState(false);
    const t_col1 = () => {
        setcol1(!col1);

    };
    document.title="Widgets | Onexfort";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Lead Report" pageTitle="Onexfort" />
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
                                                            <Label for="Sortingorder" className="form-label">Source</Label>
                                                            <select className="form-select mb-3" aria-label="Default select example">
                                                                <option >Google</option>
                                                                <option defaultValue="1">Facebook</option>
                                                                <option defaultValue="2">Friend</option>
                                                                <option defaultValue="3">Return Customer</option>
                                                             
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

                                    <Table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Source</th>
                                                <th>Quotes Created</th>
                                                <th>Jobs Confirmed</th>
                                                <th>Quotes Lost</th>                                 
                                                <th>Total Sales</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Tom Offsider</td>
                                                <td>0</td>
                                                <td>0</td>
                                                <td>0</td>
                                                <td>000.0</td>
                                            </tr>
                                            <tr>
                                                <td>Usman Ali</td>
                                                <td>0</td>
                                                <td>6</td>
                                                <td>0</td>
                                                <td>1,40.70</td>
                                            </tr>
                                            <tr>
                                                <td>JJ</td>
                                                <td>8</td>
                                                <td>6</td>
                                                <td>0</td>
                                                <td>13240.70</td>
                                            </tr>
                                        </tbody>
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

export default LeadReport;
