import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    Input,
    Label,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
    Progress,
} from "reactstrap";

//Import images
import dummyUser from "../../assets/images/users/user-dummy-img.jpg";
import logoDark from "../../assets/images/logo-dark.png";

import classnames from "classnames";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
// register lottie and define custom element
defineElement(lottie.loadAnimation);

const Register = () => {
    const [activeTab, setactiveTab] = useState(1);
    const [activeArrowTab, setactiveArrowTab] = useState(4);
    const [activeVerticalTab, setactiveVerticalTab] = useState(7);
    const [progressbarvalue, setprogressbarvalue] = useState(0);
    const [passedSteps, setPassedSteps] = useState([1]);
    const [passedarrowSteps, setPassedarrowSteps] = useState([1]);
    const [passedverticalSteps, setPassedverticalSteps] = useState([1]);

    function toggleTab(tab, value) {
        if (activeTab !== tab) {
            var modifiedSteps = [...passedSteps, tab];

            if (tab >= 1 && tab <= 5) {
                setactiveTab(tab);
                setPassedSteps(modifiedSteps);
            }
        }
        setprogressbarvalue(value);
    }

    function toggleArrowTab(tab) {
        if (activeArrowTab !== tab) {
            var modifiedSteps = [...passedarrowSteps, tab];

            if (tab >= 5 && tab <= 7) {
                setactiveArrowTab(tab);
                setPassedarrowSteps(modifiedSteps);
            }
        }
    }

    function toggleVerticalTab(tab) {
        if (activeVerticalTab !== tab) {
            var modifiedSteps = [...passedverticalSteps, tab];

            if (tab >= 7 && tab <= 11) {
                setactiveVerticalTab(tab);
                setPassedverticalSteps(modifiedSteps);
            }
        }
    }
    document.title = "Form Wizard | Onexfort";
    const [selectedFiles, setselectedFiles] = useState([]);
    const [files, setFiles] = useState([]);

    function handleAcceptedFiles(files) {
        files.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        );
        setselectedFiles(files);
    }
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

    return (
        <React.Fragment>
            <div className="auth-page-wrapper">
                <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
                    <div className="bg-overlay"></div>
                </div>
                <div className="page-content pt-5">
                    <Container>
                        <Row>
                            <Col lg={12}>

                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-0">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-sm-2 mb-2 text-white-50">
                                            <div>
                                                <Link to="/" className="d-inline-block auth-logo">
                                                    <img src={logoDark} alt="" height="50" />
                                                </Link>
                                            </div>
                                        </div>

                                        <Form action="#" className="form-steps">

                                            <div className="progress-nav mb-4">
                                                <Progress
                                                    value={progressbarvalue}
                                                    style={{ height: "1px" }}
                                                />

                                                <Nav
                                                    className="nav-pills progress-bar-tab custom-nav"
                                                    role="tablist"

                                                >
                                                    <NavItem>
                                                        <NavLink
                                                            to="#"
                                                            id="pills-gen-info-tab"
                                                            className={classnames(
                                                                {
                                                                    active: activeTab === 1,
                                                                    done: activeTab <= 5 && activeTab >= 0,
                                                                },
                                                                "rounded-pill"
                                                            )}
                                                            onClick={() => {
                                                                toggleTab(1, 0);
                                                            }}
                                                            tag="button"
                                                        >
                                                            1
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            to="#"
                                                            id="pills-gen-info-tab"
                                                            className={classnames(
                                                                {
                                                                    active: activeTab === 2,
                                                                    done: activeTab <= 5 && activeTab > 1,
                                                                },
                                                                "rounded-pill"
                                                            )}
                                                            onClick={() => {
                                                                toggleTab(2, 50);
                                                            }}
                                                            tag="button"
                                                        >
                                                            2
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            to="#"
                                                            id="pills-gen-info-tab"
                                                            className={classnames(
                                                                {
                                                                    active: activeTab === 3,
                                                                    done: activeTab <= 5 && activeTab > 2,
                                                                },
                                                                "rounded-pill"
                                                            )}
                                                            onClick={() => {
                                                                toggleTab(3, 75);
                                                            }}
                                                            tag="button"
                                                        >
                                                            3
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink
                                                            to="#"
                                                            id="pills-gen-info-tab"
                                                            className={classnames(
                                                                {
                                                                    active: activeTab === 4,
                                                                    done: activeTab <= 5 && activeTab > 3,
                                                                },
                                                                "rounded-pill"
                                                            )}
                                                            onClick={() => {
                                                                toggleTab(4, 100);
                                                            }}
                                                            tag="button"
                                                        >
                                                            4
                                                        </NavLink>
                                                    </NavItem>

                                                </Nav>
                                            </div>

                                            <TabContent activeTab={activeTab}>
                                                <TabPane tabId={1}>
                                                    <div>
                                                        <div className="mb-4">
                                                            <div className="text-center">
                                                                <h5 className="mb-1">TELL US ABOUT YOUR BUSINESS</h5>
                                                                <p className="text-muted">
                                                                    We'll use this information to personalise your quote and invoices.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label
                                                                        className="form-label"
                                                                        htmlFor=""
                                                                    >
                                                                        Business Name
                                                                    </Label>
                                                                    <Input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id=""
                                                                        placeholder="Business Name"
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label
                                                                        className="form-label"
                                                                        htmlFor=""
                                                                    >
                                                                        Business Address 1
                                                                    </Label>
                                                                    <Input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id=""
                                                                        placeholder="Business Address 1"
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label
                                                                        className="form-label"
                                                                        htmlFor=""
                                                                    >
                                                                        Business Address 2
                                                                    </Label>
                                                                    <Input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id=""
                                                                        placeholder="Business Address 2"
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={6}>
                                                                <div className="mb-3">
                                                                    <Label
                                                                        className="form-label"
                                                                        htmlFor=""
                                                                    >
                                                                        City
                                                                    </Label>
                                                                    <Input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id=""
                                                                        placeholder="City Name"
                                                                    />
                                                                </div>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <div className="mb-3">
                                                                    <Label
                                                                        className="form-label"
                                                                        htmlFor=""
                                                                    >
                                                                        Postcode
                                                                    </Label>
                                                                    <Input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id=""
                                                                        placeholder="Postcode"
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={6}>
                                                                <div className="mb-3">
                                                                    <Label
                                                                        className="form-label"
                                                                        htmlFor=""
                                                                    >
                                                                        State
                                                                    </Label>
                                                                    <Input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id=""
                                                                        placeholder="State Name"
                                                                    />
                                                                </div>
                                                            </Col>

                                                            <Col lg={6}>
                                                                <div className="mb-3">
                                                                    <Label
                                                                        className="form-label"
                                                                        htmlFor=""
                                                                    >
                                                                        Country
                                                                    </Label>
                                                                    <select className="form-select mb-3" aria-label="Default select example">
                                                                        <option >Australia</option>


                                                                    </select>
                                                                </div>
                                                            </Col>

                                                        </Row>

                                                        <Row>
                                                            <Col lg={12}>
                                                                <Card className="dz-card">
                                                                    <Label>Business logo</Label>
                                                                    <CardBody className="dz-card-body">

                                                                        <Dropzone
                                                                            onDrop={(acceptedFiles) => {
                                                                                handleAcceptedFiles(acceptedFiles);
                                                                            }}
                                                                        >
                                                                            {({ getRootProps, getInputProps }) => (
                                                                                <div className="dropzone dz-clickable">
                                                                                    <div
                                                                                        className="dz-message dz-box needsclick"
                                                                                        {...getRootProps()}
                                                                                    >
                                                                                        <div className="mb-0">
                                                                                            <i className="display-6 text-muted ri-upload-cloud-2-fill" />
                                                                                        </div>
                                                                                        <h6>Drop files here or click to upload.</h6>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </Dropzone>
                                                                        <div className="list-unstyled mb-0" id="file-previews">
                                                                            {selectedFiles.map((f, i) => {
                                                                                return (
                                                                                    <Card
                                                                                        className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                                                        key={i + "-file"}
                                                                                    >
                                                                                        <div className="p-2">
                                                                                            <Row className="align-items-center">
                                                                                                <Col className="col-auto">
                                                                                                    <img
                                                                                                        data-dz-thumbnail=""
                                                                                                        height="80"
                                                                                                        className="avatar-sm rounded bg-light"
                                                                                                        alt={f.name}
                                                                                                        src={f.preview}
                                                                                                    />
                                                                                                </Col>
                                                                                                <Col>
                                                                                                    <Link
                                                                                                        to="#"
                                                                                                        className="text-muted font-weight-bold"
                                                                                                    >
                                                                                                        {f.name}
                                                                                                    </Link>
                                                                                                    <p className="mb-0">
                                                                                                        <strong>{f.formattedSize}</strong>
                                                                                                    </p>
                                                                                                </Col>
                                                                                            </Row>
                                                                                        </div>
                                                                                    </Card>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>
                                                        </Row>

                                                    </div>
                                                    <div className="text-center  mt-0">
                                                        <button
                                                            type="button"
                                                            className="btn btn-brown ms-auto nexttab nexttab"
                                                            onClick={() => {
                                                                toggleTab(activeTab + 1, 50);
                                                            }}
                                                        >Next
                                                        </button>
                                                    </div>
                                                </TabPane>

                                                <TabPane tabId={2}>
                                                    <div>
                                                        <div className="mb-4">
                                                            <div className="text-center">
                                                                <h6 className="mb-1">WHAT DOES YOUR BUSINESS DO?</h6>
                                                                <p className="text-muted">
                                                                    This will help us customise the account to work best for your industry and size.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <Label>Module</Label>
                                                                <select className="form-select mb-3" aria-label="Default select example">
                                                                    <option >Removals</option>
                                                                    <option defaultValue="1">Cleaning</option>

                                                                </select>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label
                                                                        className="form-label"
                                                                        htmlFor=""
                                                                    >
                                                                        Business Phone Number
                                                                    </Label>
                                                                    <Input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id=""
                                                                        placeholder="Business Phone Number"
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label
                                                                        className="form-label"
                                                                        htmlFor=""
                                                                    >
                                                                        Number Of Employees
                                                                    </Label>
                                                                    <Input
                                                                        type="number"
                                                                        className="form-control"
                                                                        id=""
                                                                        placeholder="Number Of Employees"
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                    </div>
                                                    <div className="d-flex align-items-start gap-3 mt-4">
                                                        <button
                                                            type="button"
                                                            className="btn btn-link text-decoration-none btn-label previestab"
                                                            onClick={() => {
                                                                toggleTab(activeTab - 1, 0);
                                                            }}
                                                        >
                                                            <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                                            Previous
                                                        </button>
                                                        <div className=" right ms-auto ">
                                                            <button
                                                                type="button"
                                                                className="btn btn-brown nexttab nexttab"
                                                                onClick={() => {
                                                                    toggleTab(activeTab + 1, 100);
                                                                }}
                                                            >
                                                                Next
                                                            </button>
                                                        </div>
                                                    </div>
                                                </TabPane>

                                                <TabPane tabId={3}>
                                                    <div>
                                                        <div className="mb-4">
                                                            <div className="text-center">
                                                                <h6 className="mb-1">SETUP YOUR BUSINESS DETAILS</h6>
                                                                <p className="text-muted">
                                                                    This will be used on your quotes, invoices and email signature.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Row>
                                                            <Col lg={6}>
                                                                <div className="mb-3">
                                                                    <Label
                                                                        className="form-label"
                                                                        htmlFor=""
                                                                    >
                                                                        Your First Name
                                                                    </Label>
                                                                    <Input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id=""
                                                                        placeholder="First Name"
                                                                    />
                                                                </div>
                                                            </Col>
                                                            
                                                            <Col lg={6}>
                                                                <div className="mb-3">
                                                                    <Label
                                                                        className="form-label"
                                                                        htmlFor=""
                                                                    >
                                                                        Your Last Name
                                                                    </Label>
                                                                    <Input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id=""
                                                                        placeholder="Last Name"
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                   
                                                        
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label
                                                                        className="form-label"
                                                                        htmlFor=""
                                                                    >
                                                                        Business Email Address
                                                                    </Label>
                                                                    <Input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id=""
                                                                        placeholder="Business Email Address"
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label
                                                                        className="form-label"
                                                                        htmlFor=""
                                                                    >
                                                                        Enter Password
                                                                    </Label>
                                                                    <Input
                                                                        type="password"
                                                                        className="form-control"
                                                                        id=""
                                                                        placeholder="******"
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label
                                                                        className="form-label"
                                                                        htmlFor=""
                                                                    >
                                                                        Confirm Password
                                                                    </Label>
                                                                    <Input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id=""
                                                                        placeholder="Confirm New Password"
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label
                                                                        className="form-label"
                                                                        htmlFor=""
                                                                    >
                                                                        Your Mobile Number
                                                                    </Label>
                                                                    <Input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id=""
                                                                        placeholder="Mobile Number"
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label
                                                                        className="form-label"
                                                                        htmlFor=""
                                                                    >
                                                                        Web Address
                                                                    </Label>
                                                                    <Input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id=""
                                                                        placeholder="Website Address"
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label
                                                                        className="form-label"
                                                                        htmlFor=""
                                                                    >
                                                                        ABN
                                                                    </Label>
                                                                    <Input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id=""
                                                                        placeholder="00 000 000 000"
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Input type="checkbox"></Input><Label className="cb-lbl">Are You GST registered?</Label>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="d-flex align-items-start gap-3 mt-4">
                                                            <button
                                                                type="button"
                                                                className="btn btn-link text-decoration-none btn-label previestab"
                                                                onClick={() => {
                                                                    toggleTab(activeTab - 1, 0);
                                                                }}
                                                            >
                                                                <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                                                Previous
                                                            </button>
                                                            <div className=" right ms-auto ">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-brown nexttab nexttab"
                                                                    onClick={() => {
                                                                        toggleTab(activeTab + 1, 100);
                                                                    }}
                                                                >
                                                                    Verify Email
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TabPane>
                                                <TabPane tabId={4}>

                                                    <div>
                                                        <div className="text-center">
                                                            <div className="mb-4">
                                                                <lord-icon
                                                                    src="https://cdn.lordicon.com/lupuorrc.json"
                                                                    trigger="loop"
                                                                    colors="primary:#0ab39c,secondary:#6691e7"
                                                                    style={{ width: "120px", height: "120px" }}
                                                                ></lord-icon>
                                                            </div>
                                                            <h5>Well Done !</h5>
                                                            <p className="text-muted">
                                                                You have Successfully Signed Up
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TabPane>

                                                {/* <div>
                                                        <div className="text-center">
                                                            <div className="mb-4">
                                                                <lord-icon
                                                                    src="https://cdn.lordicon.com/lupuorrc.json"
                                                                    trigger="loop"
                                                                    colors="primary:#0ab39c,secondary:#6691e7"
                                                                    style={{ width: "120px", height: "120px" }}
                                                                ></lord-icon>
                                                            </div>
                                                            <h5>Well Done !</h5>
                                                            <p className="text-muted">
                                                                You have Successfully Signed Up
                                                            </p>
                                                        </div>
                                                    </div> */}
                                            </TabContent>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <footer className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center">
                                    <p className="mb-0 footer_copyright">&copy; {new Date().getFullYear()} Onexfort.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </React.Fragment>
    );
};

export default Register;
