import React, { useState } from 'react';
import Select from "react-select";
import { BaseExample } from '../Customer/GridTablesDataUnitList';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Label, Input, Accordion, AccordionItem, Collapse, Form, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter, Nav,
    NavItem, NavLink, TabContent, TabPane
} from 'reactstrap';
// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import Flatpickr from "react-flatpickr";
import classnames from "classnames";

const Unitslist = () => {
    const [col1, setcol1] = useState(false);
    const [selectedMulti, setselectedMulti] = useState(null);
    const [selectedMulti1, setselectedMulti1] = useState(null);
    function handleMulti(selectedMulti) {
        setselectedMulti(selectedMulti);
    }
    function handleMulti1(selectedMulti1) {
        setselectedMulti1(selectedMulti1);
    }
    const t_col1 = () => {
        setcol1(!col1);

    };
    const SingleOptions = [
        { value: "20' Container", label: "20' Container" },
        { value: "40' Container", label: "40' Container" },
        { value: 'Container', label: 'Container' },
        { value: 'Capsule New', label: 'Capsule New' }
    ];
    const storageUnitOpt = [
        { value: "Reserved", label: "Reserved" },
        { value: "Occupied", label: "Occupied" },

    ];

    document.title = "Widgets | Onexfort";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Storage List" pageTitle="Onexfort" />
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
                                        <Col lg={4} md={6}>
                                            <div className="mb-3">
                                                <Label htmlFor="choices-multiple-default" className="form-label text-muted">Storage Type</Label>
                                                <Select
                                                    value={selectedMulti}
                                                    isMulti={true}
                                                    onChange={() => {
                                                        handleMulti();
                                                    }}
                                                    options={SingleOptions}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={4} md={6}>
                                            <div className="mb-3">
                                                <Label htmlFor="choices-multiple-default" className="form-label text-muted">Storage Unit</Label>
                                                <Select

                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={4} md={6}>
                                            <div className="mb-3">
                                                <Label htmlFor="choices-multiple-default" className="form-label text-muted">Allocation Status</Label>
                                                <Select
                                                    value={selectedMulti1}
                                                    isMulti={true}
                                                    onChange={() => {
                                                        handleMulti1();
                                                    }}
                                                    options={storageUnitOpt}
                                                />
                                            </div>
                                        </Col>

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



                                        <Col lg={4}>
                                            <div className="text-start">
                                                <button type="submit" className="btn form-btn-marg btn-primary">Apply</button>
                                                <button type="submit" className="btn form-btn-marg btn-primary">Reset</button>
                                            </div>

                                        </Col>
                                    </Row>
                                </div>
                            </Collapse>
                        </AccordionItem>
                    </Accordion>
                    <Card>
                        <CardBody>  
                            <h5>Storage Units:</h5>
                            <div id="table-gridjs">
                                <BaseExample />
                            </div>
                            </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Unitslist;
