import React,{useState} from "react";
import "./nameDetails.css"

import { Activity } from "../Jobs/JobTabPages/Activity";
import { Operations } from "../Jobs/JobTabPages/Operations";

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

const NameDetails=()=>{

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
            case 'Operations':
                return <Operations />;
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
                            <Button classNa e="btn btn-success btn-sm" onClick={t_addTag}>+ Tag</Button>
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
                                <h1 className="card-title flex-grow-1 mb-0">
                                    Contacts 1
                                </h1>
                                <i className="ri-add-fill"></i>

                            </div>
                            <div className="d-flex mt-3 alnName">
                                <h5 className="flex-grow-1 mb-0 clr">
                                    Andrew Carpenter
                                </h5>
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
                                <h5>Name</h5>
                                <p className="mt-1">Andrew Carpenter</p>
                            </div>        
                        </CardBody>
                        <CardBody>
                            <div>
                                <h5>Description</h5>
                                <p className="mt-1">Andrew Carpenter</p>
                            </div>        
                        </CardBody>
                        <CardBody>
                            <div>
                                <h5>Mobile</h5>
                                <p className="mt-1">0400005</p>
                            </div>        
                        </CardBody>
                        <CardBody>
                            <div>
                                <h5>Email</h5>
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
                                                        onClick={()=>{ handleClick("Operations")} }
                                                    >
                                                        <h5 className="text-primary text-center">Operations</h5>
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

export default NameDetails