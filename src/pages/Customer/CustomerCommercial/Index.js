
import React, { useState, useCallback } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row, Label, Input, Accordion, AccordionItem, Collapse, Form, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import Flatpickr from "react-flatpickr";
import classnames from "classnames";
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from "react-select";
import dummyImg from "../../../assets/images/users/user-dummy-img.jpg";
// Import Table Data
import { BaseExample } from '../GridTablesData';
import { useSelector, useDispatch } from "react-redux";
//Import actions
import {
    getContacts as onGetContacts,
    addNewContact as onAddNewContact,
    updateContact as onUpdateContact,
    deleteContact as onDeleteContact,
} from "../../../store/actions";
const CustCommercial = () => {
    const [modal, setModal] = useState(false);
    const [contact, setContact] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tag, setTag] = useState([]);
    const [assignTag, setAssignTag] = useState([]);
    const dispatch = useDispatch();

    function handlestag(tags) {
        setTag(tags);
        const assigned = tags.map((item) => item.value);
        setAssignTag(assigned);
    }

    const tags = [
        { label: "Exiting", value: "Exiting" },
        { label: "Lead", value: "Lead" },
        { label: "Long-term", value: "Long-term" },
        { label: "Partner", value: "Partner" }
    ];

    const dateFormat = () => {
        var d = new Date(),
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return (d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear());
    };

    const toggle = useCallback(() => {
        if (modal) {
            setModal(false);
            setContact(null);
        } else {
            setModal(true);
            setTag([]);
            setAssignTag([]);
        }
    }, [modal]);

    const [col1, setcol1] = useState(false);


    const t_col1 = () => {
        setcol1(!col1);

    };
    // validation
    const validation = useFormik({

        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            // img: (contact && contact.img) || '',
            name: (contact && contact.name) || '',
            company: (contact && contact.company) || '',
            designation: (contact && contact.designation) || '',
            email: (contact && contact.email) || '',
            phone: (contact && contact.phone) || '',
            lead_score: (contact && contact.lead_score) || '',
            tags: (contact && contact.tags) || [],
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Name"),
            company: Yup.string().required("Please Enter Company"),
            designation: Yup.string().required("Please Enter Designation"),
            email: Yup.string().required("Please Enter Email"),
            phone: Yup.string().required("Please Enter Phone"),
            lead_score: Yup.string().required("Please Enter lead_score"),
        }),
        onSubmit: (values) => {
            if (isEdit) {
                const updateContact = {
                    _id: contact ? contact._id : 0,
                    // img: values.img,
                    name: values.name,
                    company: values.company,
                    designation: values.designation,
                    email: values.email,
                    phone: values.phone,
                    lead_score: values.lead_score,
                    last_contacted: dateFormat(),
                    // time: timeFormat(),
                    tags: assignTag,
                };
                // update Contact 
                dispatch(onUpdateContact(updateContact));
                validation.resetForm();
            } else {
                const newContact = {
                    _id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                    // img: values["img"],
                    name: values["name"],
                    company: values["company"],
                    designation: values["designation"],
                    email: values["email"],
                    phone: values["phone"],
                    lead_score: values["lead_score"],
                    last_contacted: dateFormat(),
                    // time: timeFormat(),
                    tags: assignTag,
                };
                // save new Contact
                dispatch(onAddNewContact(newContact));
                validation.resetForm();
            }
            toggle();
        },
    });

    document.title = "Admin Panel | Onexfort";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Commercial  Customer" pageTitle="Customer" />
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
                                                        <Col lg={12}>

                                                            <Col md={4}>
                                                                <div className="mb-3">
                                                                    <Label for="leadStatusinput" className="form-label">Lead Status</Label>
                                                                    <Input type="text" className="form-control" placeholder="Enter your firstname" id="leadStatusinput" />
                                                                </div>
                                                            </Col>
                                                        </Col>
                                                    </Row>
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
                                                            <Label for="Sortingorder" className="form-label">Sorting Order</Label>
                                                            <select className="form-select mb-3" aria-label="Default select example">
                                                                <option >Created Date </option>
                                                                <option defaultValue="1">Lead</option>
                                                                <option defaultValue="2">Status Error</option>

                                                            </select>
                                                        </Col>
                                                        <Col lg={2}>
                                                            <div className="form-check form-radio-pad form-check-right mb-2">
                                                                <Input className="form-check-input" type="checkbox" name="formCheckboxRight" id="formCheckboxRight1" />
                                                                <Label className="form-check-label" for="formCheckboxRight1">
                                                                    Descending
                                                                </Label>

                                                            </div>
                                                        </Col>

                                                        <Col lg={2}>
                                                            <div className="text-end">
                                                                <button type="submit" className="btn form-btn-marg btn-primary">Submit</button>
                                                            </div>
                                                        </Col>

                                                    </Row>
                                                </div>
                                            </Collapse>
                                        </AccordionItem>
                                    </Accordion>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col lg={10}>
                                            {/* <h4 className="card-title mb-0 flex-grow-1">Search</h4> */}
                                        </Col>
                                        <Col lg={2}><button
                                            className="btn btn-brown add-btn"
                                            onClick={() => {
                                                setModal(true);
                                            }}
                                        >
                                            <i className="ri-add-fill me-1 align-bottom"></i> Add Commercial Customer

                                        </button></Col>
                                    </Row>
                                    <div id="table-gridjs">
                                        <BaseExample />
                                    </div>

                                    <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                                        <ModalHeader className="bg-soft-primary p-3" toggle={toggle}>
                                            {!!isEdit ? "Edit" : "New Commercial Customer"}
                                        </ModalHeader>

                                        <Form className="tablelist-form" onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                            return false;
                                        }}>
                                            <ModalBody>
                                                <Input type="hidden" id="id-field" />
                                                <Row className="g-3">
                                                    <Col lg={6}>
                                                        <div>
                                                            <Label
                                                                htmlFor="name-field"
                                                                className="form-label"
                                                            >
                                                                Company Name
                                                            </Label>
                                                            <Input
                                                                name="name"
                                                                id="customername-field"
                                                                className="form-control"
                                                                placeholder="Enter Company Name"
                                                                type="text"
                                                                validate={{
                                                                    required: { value: true },
                                                                }}
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.name || ""}
                                                                invalid={
                                                                    validation.touched.name && validation.errors.name ? true : false
                                                                }
                                                            />
                                                            {validation.touched.name && validation.errors.name ? (
                                                                <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                                                            ) : null}

                                                        </div>
                                                    </Col>
                                                </Row >
                                                <Row className="g-3 mt-0">
                                                    <Col lg={6}>
                                                        <div>
                                                            <Label
                                                                htmlFor="company_name-field"
                                                                className="form-label"
                                                            >
                                                                Contact Name
                                                            </Label>
                                                            <Input
                                                                name="company"
                                                                id="company_name-field"
                                                                className="form-control"
                                                                placeholder="Enter Contact Name"
                                                                type="text"
                                                                validate={{
                                                                    required: { value: true },
                                                                }}
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.company || ""}
                                                                invalid={
                                                                    validation.touched.company && validation.errors.company ? true : false
                                                                }
                                                            />
                                                            {validation.touched.company && validation.errors.company ? (
                                                                <FormFeedback type="invalid">{validation.errors.company}</FormFeedback>
                                                            ) : null}

                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div>
                                                            <Label
                                                                htmlFor="designation-field"
                                                                className="form-label"
                                                            >
                                                                Contact Description
                                                            </Label>

                                                            <Input
                                                                name="designation"
                                                                id="designation-field"
                                                                className="form-control"
                                                                placeholder="Description"
                                                                type="text"
                                                                validate={{
                                                                    required: { value: true },
                                                                }}
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.designation || ""}
                                                                invalid={
                                                                    validation.touched.designation && validation.errors.designation ? true : false
                                                                }
                                                            />
                                                            {validation.touched.designation && validation.errors.designation ? (
                                                                <FormFeedback type="invalid">{validation.errors.designation}</FormFeedback>
                                                            ) : null}

                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div>
                                                            <Label
                                                                htmlFor="email_id-field"
                                                                className="form-label"
                                                            >
                                                                Email
                                                            </Label>

                                                            <Input
                                                                name="email"
                                                                id="email_id-field"
                                                                className="form-control"
                                                                placeholder="Your Email"
                                                                type="email"
                                                                validate={{
                                                                    required: { value: true },
                                                                }}
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.email || ""}
                                                                invalid={
                                                                    validation.touched.email && validation.errors.email ? true : false
                                                                }
                                                            />
                                                            {validation.touched.email && validation.errors.email ? (
                                                                <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                                            ) : null}

                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div>
                                                            <Label
                                                                htmlFor="phone-field"
                                                                className="form-label"
                                                            >
                                                                Mobile
                                                            </Label>

                                                            <Input
                                                                name="phone"
                                                                id="phone-field"
                                                                className="form-control"
                                                                placeholder="Enter Phone No."
                                                                type="text"
                                                                validate={{
                                                                    required: { value: true },
                                                                }}
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.phone || ""}
                                                                invalid={
                                                                    validation.touched.phone && validation.errors.phone ? true : false
                                                                }
                                                            />
                                                            {validation.touched.phone && validation.errors.phone ? (
                                                                <FormFeedback type="invalid">{validation.errors.phone}</FormFeedback>
                                                            ) : null}
                                                        </div>
                                                    </Col>

                                                </Row>
                                            </ModalBody>
                                            <ModalFooter>
                                                <div className="hstack gap-2 justify-content-end">
                                                    <button type="submit" className="btn btn-primary" id="add-btn" > {!!isEdit ? "Update" : "Create Customer"} </button>
                                                    <button type="button" className="btn btn-light" onClick={() => { setModal(false); }} > Cancel </button>

                                                </div>
                                            </ModalFooter>
                                        </Form>
                                    </Modal>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    );
};

export default CustCommercial;