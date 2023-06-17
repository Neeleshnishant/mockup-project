import React,{useState} from "react";
import "./nameDetails.css"

import { Activity } from "../Jobs/JobTabPages/Activity";
import { Storage } from "../Jobs/JobTabPages/Storage";
import { Invoice } from "../Jobs/JobTabPages/Invoice";

import activeTab from "./activeTab.css"

import {
    Card,
    CardBody,
    Collapse,
    Button,
    Input,
    CardHeader,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    NavLink,NavItem,
    Col,
    Container,Row
} from "reactstrap"

import classnames from "classnames";

const NameDetailsUnitList=()=>{

    const [addTag, setaddTag] = useState(true);
    const t_addTag = () => {
        setaddTag(!addTag);
    };
    const [componentToShow, setComponentToShow] = useState(null);
    const [customActiveTab, setcustomActiveTab] = useState("Activity");
    const handleClick = (component) => {
        setComponentToShow(component);
        if (customActiveTab !== component) {
            setcustomActiveTab(component);
        }
    };

    const clickThreeDots=()=>{
        console.log(true)
    }
    const renderComponent = () => {
        switch (componentToShow) {
            case 'Activity':
                return <Activity />;
            case 'Storage':
                return <Storage />;
            case "Invoice":
                return <Invoice/>;
            default:
                return <Activity />;
        }
    }

    return(
        <div className="page-content">
            <Container fluid>
                <Row>
                <Col xl={3}>
                <div className="text-center mb-3">
                    <div className="mb-0">
                        <h5>QF 14Dec01</h5>
                        <div className="mt-2">
                            <p>Residential</p>
                            <p>Job # 4</p>
                        </div>
                    </div>
                </div>
                    <Card>
                        <CardBody>
                            <div>
                                <div className="mb-0">
                                    <h5>JOB DETAILS</h5>
                                    <div className="mt-2">
                                        <p>29/05/2023 to</p>
                                        <p>29/05/2023</p>
                                        <p>cbm</p>
                                        <h5 className="mt-2 text-center">Active</h5>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="d-flex">
                                <h1 className="card-title flex-grow-1 mb-0">
                                    Contacts 1
                                </h1>
                                <i className="ri-add-fill"></i>

                            </div>
                            <div className="d-flex mt-3 alnName">
                                <h4 className="flex-grow-1 mb-0 clr">
                                    Andrew Carpenter
                                </h4>
                                <button className="btn">
                                <UncontrolledDropdown>
                                    <DropdownToggle
                                        className="btn btn-soft-info btn-icon fs-14"
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                         <i className="bx bx-bx bx-dots-vertical"></i>
                                    </DropdownToggle>
                                    <DropdownMenu
                        >
                            <li>
                                <div className="d-flex mx-auto editDelete">
                                    <i className="ri-edit-2-line"></i>
                                    <DropdownItem>
                                        Edit
                                    </DropdownItem>
                                </div>
                            </li>
                            <li>
                            <div className="d-flex mx-auto editDelete">
                            <i className="ri-delete-bin-6-fill"></i>
                                <DropdownItem>
                                    Delete
                                </DropdownItem>
                                </div>
                            </li>
                        </DropdownMenu>
                                </UncontrolledDropdown></button>
                                
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div>
                                <h4>Name</h4>
                                <p className="mt-1">Andrew Carpenter</p>
                            </div>        
                        </CardBody>
                        <CardBody>
                            <div>
                                <h4>Description</h4>
                                <p className="mt-1">Andrew Carpenter</p>
                            </div>        
                        </CardBody>
                        <CardBody>
                            <div>
                                <h4>Mobile</h4>
                                <p className="mt-1">0400005</p>
                            </div>        
                        </CardBody>
                        <CardBody>
                            <div>
                                <h4>Email</h4>
                                <p className="mt-1">onexfort.test+andrewc@gmail.com</p>
                            </div>        
                        </CardBody>
                    </Card>
                </Col>
                <Col xl={9}>
                    <Card>
                    <CardHeader>
                            <div className="row align-items-center">
                                <div className="col">
                                    <Nav>
                                    <NavItem className="flex-grow-1">
                                                    <NavLink
                                                        href="#"
                                                        onClick={() => { handleClick("Activity") }}
                                                    
                                                    >
                                                        <h5 className={classnames({
                                                        active: customActiveTab === "Activity",
                                                    })} >Activity</h5>
                                                    </NavLink>
                                                </NavItem>                                            
                                                <NavItem className="flex-grow-1">
                                                <NavLink
                                                    href="#"
                                                    onClick={() => { handleClick("Invoice") }}
                                                >
                                                    <h5 className={classnames({
                                                        active: customActiveTab === "Invoice",
                                                    })}>Invoice</h5>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem className="flex-grow-1">
                                                <NavLink
                                                    href="#"
                                                    onClick={() => { handleClick("Storage") }}
                                                >
                                                    <h5 className={classnames({
                                                        active: customActiveTab === "Storage",
                                                    })}>Storage</h5>
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

export default NameDetailsUnitList