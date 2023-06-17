import React, { useState } from "react";
import {
    Card,
    CardBody,
    Col,
    Container,
    Row,
    CardHeader,
    Collapse,
    Button,
    Input,
    TabPane,
    TabContent,
    Nav,
    NavLink,
    NavItem
} from "reactstrap";

import classnames from "classnames";
import { Link } from "react-router-dom";
import { Activity } from "./JobTabPages/Activity";
import { Operations } from "./JobTabPages/Operations";
import { Invoice } from "./JobTabPages/Invoice";
import { Inventory } from "./JobTabPages/Inventory";
import { Storage } from "./JobTabPages/Storage";
const ListJobsDetail = () => {
    const [componentToShow, setComponentToShow] = useState(null);
    const [customActiveTab, setcustomActiveTab] = useState("Activity");
    const handleClick = (component) => {
        setComponentToShow(component);
        if (customActiveTab !== component) {
            setcustomActiveTab(component);
        }
    };
    const renderComponent = () => {
        switch (componentToShow) {
            case 'Activity':
                return <Activity />;
            case 'Operations':
                return <Operations />;
            case 'Invoice':
                return <Invoice />;
            case 'Inventory':
                return <Inventory />;
            case 'Storage':
                return <Storage />;

            default:
                return <Activity />;
        }
    }
    const [addTag, setaddTag] = useState(true);
    const t_addTag = () => {
        setaddTag(!addTag);
    };

    return (
        <div className="page-content">
            <Container fluid>
                <Row>
                    <Col xl={3}>
                        <Card>
                            <CardBody>
                                <Button className="btn btn-success btn-sm" onClick={t_addTag}>+ Tag</Button>
                                <Collapse isOpen={addTag} id="collapseWithicon">
                                    <div className="mb-0 mt-3">
                                        <Input className="form-control" placeholder="Add Tags..."></Input>
                                        <div className="hstack gap-2 mt-2">
                                            <Button className="btn btn-light" onClick={t_addTag} >Cancel</Button>
                                            <Button className="btn btn-info">Save</Button>
                                        </div>
                                    </div>
                                </Collapse>
                            </CardBody>

                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <div className="d-flex">
                                    <h5 className="card-title flex-grow-1 mb-0">
                                        <i className="mdi mdi-truck-fast-outline align-middle me-1 text-muted"></i>
                                        JOB DETAILS
                                    </h5>

                                </div>
                            </CardHeader>
                            <CardBody>
                                <div >
                                    <h5 className="fs-16 mt-2 mb-2">Onexfort</h5>
                                    <p className="text-muted mb-2">25.00 xxx</p>
                                    <Link to="#" className="badge badge-soft-warning fs-11">
                                        Quoted
                                    </Link>

                                </div>
                                <hr></hr>
                                <div>
                                    <p className="text-muted mb-2">$177</p>
                                    <p className="text-muted mb-2">$856 xxx</p>
                                    <p className="text-muted mb-2">25.00 xxx</p>
                                    <Link to="#" className="badge badge-soft-success fs-11">
                                        Partially Paid
                                    </Link>

                                </div>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="d-flex">
                                    <h5 className="card-title flex-grow-1 mb-0">
                                        PICK UP
                                    </h5>

                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="">
                                    <h6 className="fs-14 mb-2">Joseph Parkers 2876</h6>
                                    <p className="text-muted mb-0">Pickup</p>
                                </div>

                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>
                                <h5 className="card-title mb-0">
                                    <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "}
                                    DROP OFF
                                </h5>
                            </CardHeader>
                            <CardBody>
                                <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                                    <li className="fw-medium fs-14">Joseph Parker</li>
                                    <li>New York - 25645</li>
                                    <li>United States</li>
                                </ul>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>
                                <h5 className="card-title mb-0">
                                    <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "}
                                    TASKS
                                </h5>
                            </CardHeader>
                            <CardBody>

                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>
                                <h5 className="card-title mb-0">
                                    <i className="ri-secure-payment-line align-bottom me-1 text-muted"></i>{" "}
                                    CONTACTS
                                </h5>
                            </CardHeader>
                            <CardBody>
                                <div className=" align-items-center mb-2">
                                    <div className="">
                                        <h6 className=" mb-1">Storage Test</h6>
                                    </div>
                                    <div className="">
                                        <p className="mb-0 text-muted">#VLZ124561278124</p>
                                    </div>
                                </div>
                                <div className=" align-items-center mb-2">
                                    <div className="">
                                        <h6 className=" mb-1">Name</h6>
                                    </div>
                                    <div className="">
                                        <p className="mb-0 text-muted">Debit Card</p>
                                    </div>
                                </div>
                                <div className="align-items-center mb-2">
                                    <div className="flex-shrink-0">
                                        <h6 className="mb-1">Mobile</h6>
                                    </div>
                                    <div className="">
                                        <p className="mb-0 text-muted ">Joseph Parker</p>
                                    </div>
                                </div>
                                <div className="align-items-center mb-2">
                                    <div className="">
                                        <h6 className="mb-1">Email</h6>
                                    </div>
                                    <div className="text-muted ms-2">
                                        <p className="mb-0">xxxx xxxx xxxx 2456</p>
                                    </div>
                                </div>

                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl={9}>
                        <Card>
                            <CardHeader>
                                <div className="row align-items-center">
                                    <div className="col">
                                        <Nav
                                            className="nav-tabs-custom card-header-tabs border-bottom-0"
                                            role="tablist"
                                        >
                                            <NavItem className="flex-grow-1">
                                                <NavLink
                                                    href="#"
                                                    className={classnames({
                                                        active: customActiveTab === "Activity",
                                                    })}
                                                    onClick={() => { handleClick("Activity") }}
                                                >
                                                    <h5 className="text-primary text-center" >Activity</h5>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem className="flex-grow-1">
                                                <NavLink
                                                    href="#"
                                                    className={classnames({
                                                        active: customActiveTab === "Operations",
                                                    })}
                                                    onClick={() => { handleClick("Operations") }}
                                                >
                                                    <h5 className="text-primary text-center">Operations</h5>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem className="flex-grow-1">
                                                <NavLink
                                                    href="#"
                                                    className={classnames({
                                                        active: customActiveTab === "Invoice",
                                                    })}
                                                    onClick={() => { handleClick("Invoice") }}
                                                >
                                                    <h5 className="text-primary text-center">Invoice</h5>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem className="flex-grow-1">
                                                <NavLink
                                                    href="#"
                                                    className={classnames({
                                                        active: customActiveTab === "Inventory",
                                                    })}
                                                    onClick={() => { handleClick("Inventory") }}
                                                >
                                                    <h5 className="text-primary text-center">Inventory</h5>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem className="flex-grow-1">
                                                <NavLink
                                                    href="#"
                                                    className={classnames({
                                                        active: customActiveTab === "Storage",
                                                    })}
                                                    onClick={() => { handleClick("Storage") }}
                                                >
                                                    <h5 className="text-primary text-center">Storage</h5>
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                        {renderComponent()}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ListJobsDetail