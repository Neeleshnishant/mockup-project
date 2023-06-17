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
import { Activities } from "./OpportunityTabPages/Activities";
import { Removals } from "./OpportunityTabPages/Removals";
import { Inventory } from "./OpportunityTabPages/Inventory";
import { Storage } from "./OpportunityTabPages/Storage";
import { Estimate } from "./OpportunityTabPages/Estimate";

const OpportunityDetails = () => {
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
                return <Activities />;
            case 'Removals':
                return <Removals />;
            case 'Inventory':
                return <Inventory />;
            case 'Storage':
                return <Storage />;
            case 'Estimate':
                return <Estimate />;
            default:
                return <Activities />;
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
                                <div className="d-flex">
                                    <h5 className="card-title flex-grow-1 mb-0">
                                        Opportunities 1
                                    </h5>

                                </div>
                            </CardHeader>
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
                                <div className=" mt-3">
                                    <h6 className="fs-14 mb-2">Moving - 335</h6>
                                    <p className="mb-0">Onexfort</p>
                                    <p className="text-muted mb-0">08/05/2023</p>
                                </div>

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
                                        <h6 className=" mb-1">Name</h6>
                                    </div>
                                    <div className="">
                                        <p className="mb-0 text-muted">Debit Card</p>
                                    </div>
                                </div>
                                <div className=" align-items-center mb-2">
                                    <div className="">
                                        <h6 className=" mb-1">Description</h6>
                                    </div>
                                    <div className="">
                                        <p className="mb-0 text-muted">#VLZ124561278124</p>
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
                                                        active: customActiveTab === "Removals",
                                                    })}
                                                    onClick={() => { handleClick("Removals") }}
                                                >
                                                    <h5 className="text-primary text-center">Removals</h5>
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
                                            <NavItem className="flex-grow-1">
                                                <NavLink
                                                    href="#"
                                                    className={classnames({
                                                        active: customActiveTab === "Estimate",
                                                    })}
                                                    onClick={() => { handleClick("Estimate") }}
                                                >
                                                    <h5 className="text-primary text-center">Estimate</h5>
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
export default OpportunityDetails
