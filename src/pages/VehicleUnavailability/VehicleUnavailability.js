import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Label, Input, Accordion, AccordionItem, Collapse, Form, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter, Nav,
    NavItem, NavLink, TabContent, TabPane, UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

import Flatpickr from "react-flatpickr";
import classnames from "classnames";
import { isEmpty } from "lodash";
import * as moment from "moment";

// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import Select from "react-select";
import DeleteModal from "../../Components/Common/DeleteModal";

//Import actions
import {
    getContacts as onGetContacts,
    addNewContact as onAddNewContact,
    updateContact as onUpdateContact,
    deleteContact as onDeleteContact,
} from "../../store/actions";

import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../Components/Common/TableContainer";
import Loader from "../../Components/Common/Loader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Images
import dummyImg from "../../assets/images/users/user-dummy-img.jpg";


const VehicleUnavailability = () => {
    const [col1, setcol1] = useState(false);


    const t_col1 = () => {
        setcol1(!col1);

    };

    const [verticalTab, setverticalTab] = useState("1");

    const toggleVertical = (tab) => {
        if (verticalTab !== tab) {
            setverticalTab(tab);
        }
    };

    const [contact, setContact] = useState([]);

    const dispatch = useDispatch();
    const { crmcontacts, isContactCreated, isContactSuccess, error } = useSelector((state) => ({
        crmcontacts: state.Crm.crmcontacts,
        isContactCreated: state.Crm.isContactCreated,
        isContactSuccess: state.Crm.isContactSuccess,
        error: state.Crm.error,
    }));

    useEffect(() => {
        if (crmcontacts && !crmcontacts.length) {
            dispatch(onGetContacts());
        }
    }, [dispatch, crmcontacts]);

    useEffect(() => {
        setContact(crmcontacts);
    }, [crmcontacts]);

    useEffect(() => {
        if (!isEmpty(crmcontacts)) {
            setContact(crmcontacts);
            setIsEdit(false);
        }
    }, [crmcontacts]);


    const [isEdit, setIsEdit] = useState(false);


    //delete Conatct
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteModalMulti, setDeleteModalMulti] = useState(false);

    const [modal, setModal] = useState(false);

    const [modal_standard, setmodal_standard] = useState(false);
    function tog_standard() {
        setmodal_standard(!modal_standard);
    }

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

    // Delete Data
    const handleDeleteContact = () => {
        if (contact) {
            dispatch(onDeleteContact(contact._id));
            setDeleteModal(false);
        }
    };

    const onClickDelete = (contact) => {
        setContact(contact);
        setDeleteModal(true);
    };

    // Add Data
    const handleContactClicks = () => {
        setContact("");
        setIsEdit(false);
        toggle();
    };


    // Date & Time Format

    const dateFormat = () => {
        var d = new Date(),
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return (d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear());
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

    // Update Data
    const handleContactClick = useCallback((arg) => {
        const contact = arg;

        setContact({
            _id: contact._id,
            // img: contact.img,
            name: contact.name,
            company: contact.company,
            email: contact.email,
            designation: contact.designation,
            phone: contact.phone,
            lead_score: contact.lead_score,
            last_contacted: contact.date,
            // time: contact.time,
            tags: contact.tags,
        });

        setIsEdit(true);
        toggle();
    }, [toggle]);


    // Checked All
    const checkedAll = useCallback(() => {
        const checkall = document.getElementById("checkBoxAll");
        const ele = document.querySelectorAll(".contactCheckBox");

        if (checkall.checked) {
            ele.forEach((ele) => {
                ele.checked = true;
            });
        } else {
            ele.forEach((ele) => {
                ele.checked = false;
            });
        }
        deleteCheckbox();
    }, []);

    // Delete Multiple
    const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
    const [isMultiDeleteButton, setIsMultiDeleteButton] = useState(false);

    const deleteMultiple = () => {
        const checkall = document.getElementById("checkBoxAll");
        selectedCheckBoxDelete.forEach((element) => {
            dispatch(onDeleteContact(element.value));
            setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
        });
        setIsMultiDeleteButton(false);
        checkall.checked = false;
    };

    const deleteCheckbox = () => {
        const ele = document.querySelectorAll(".contactCheckBox:checked");
        ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
        setSelectedCheckBoxDelete(ele);
    };


    // Customber Column
    const columns = useMemo(
        () => [
            {
                Header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
                Cell: (cellProps) => {
                    return <input type="checkbox" className="contactCheckBox form-check-input" value={cellProps.row.original._id} onChange={() => deleteCheckbox()} />;
                },
                id: '#',
            },
            {
                Header: "Trip",
                accessor: "name",
                filterable: false,

            },
            {
                Header: "Dates",
                accessor: "company",
                filterable: false,
            },

            {
                Header: "Capacity Loading",
                accessor: "lead_score",
                filterable: false,
            },

            {
                Header: "Jobs",
                accessor: "",
                filterable: false,
            },

            {
                Header: "Action",
                Cell: (cellProps) => {
                    return (
                        <ul className="list-inline hstack gap-2 mb-0">

                            <li className="list-inline-item">
                                <UncontrolledDropdown>
                                    <DropdownToggle
                                        href="#"
                                        className="btn btn-soft-secondary btn-sm dropdown"
                                        tag="button"
                                    >
                                        Action   <i className="ri-more-fill align-middle"></i>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end">
                                        <DropdownItem
                                            className="dropdown-item remove-item-btn"
                                            href="#"
                                            onClick={() => { const contactData = cellProps.row.original; onClickDelete(contactData); }}
                                        >
                                            <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                            Delete
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </li>
                        </ul>
                    );
                },
            },
        ],
        [handleContactClick, checkedAll]
    );


    const [tag, setTag] = useState([]);
    const [assignTag, setAssignTag] = useState([]);

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


    document.title = "Admin Panel | Onexfort";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="vehicle Unavailability" pageTitle="Onexfort" />
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
                                                <Label className="form-label"> Date Range</Label>
                                                <Flatpickr
                                                    className="form-control"
                                                    options={{
                                                        dateFormat: "Y-m-d",
                                                        defaultDate: ["2022-10-20"]
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={2}>
                                            <div className="mb-3">
                                                <Label className="form-label"> End Date</Label>
                                                <Flatpickr
                                                    className="form-control"
                                                    options={{
                                                        dateFormat: "Y-m-d",
                                                        defaultDate: ["2023-03-20"]
                                                    }}
                                                />

                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div className="mb-3">
                                                <Label for="leadStatusinput" className="form-label">Vehicle</Label>
                                                <select className="form-select mb-3" aria-label="Default select example">
                                                    <option >None Selected </option>
                                                    <option defaultValue="1">20T Interstate Truck</option>
                                                    <option defaultValue="2">Caddy</option>
                                                    <option defaultValue="3">Packing- This is a long name here and there</option>

                                                </select>
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
                        <CardHeader>
                            <div className="d-flex align-items-center flex-wrap gap-2">
                                <div className="flex-grow-1">
                                    <button
                                        className="btn btn-brown add-btn"
                                        onClick={() => {
                                            tog_standard();
                                        }}
                                    >
                                        <i className="ri-add-fill me-1 align-bottom"></i> Add Unavailability
                                    </button>
                                </div>

                            </div>
                        </CardHeader>
                        <CardBody className="pt-0">
                            <div>
                                {isContactSuccess && crmcontacts.length ? (
                                    <TableContainer
                                        columns={columns}
                                        data={(crmcontacts || [])}
                                        isGlobalFilter={true}
                                        isAddUserList={false}
                                        customPageSize={8}
                                        className="custom-header-css"
                                        divClass="table-responsive table-card mb-3"
                                        tableClass="align-middle table-nowrap"
                                        theadClass="table-light"
                                        handleContactClick={handleContactClicks}
                                        isContactsFilter={true}
                                        SearchPlaceholder="Search for contact..."
                                    />
                                ) : (<Loader error={error} />)
                                }

                            </div>

                            <Modal id="showModal" isOpen={modal_standard} centered>
                                <ModalHeader className="bg-soft-info p-3" >
                                    {!!isEdit ? "Edit Vehicle" : "Add Vehicle Unavailability"}
                                </ModalHeader>

                                <Form className="tablelist-form" onSubmit={(e) => {
                                    e.preventDefault();
                                    validation.handleSubmit();
                                    return false;
                                }}>
                                    <ModalBody>
                                        <Input type="hidden" id="id-field" />
                                        <Row className="g-3">
                                            <Col lg={12}>

                                                <Label for="leadStatusinput" className="form-label">Vehicle</Label>
                                                <select className="form-select" aria-label="Default select example">

                                                    <option defaultValue="1">20T Interstate Truck</option>
                                                    <option defaultValue="2">Caddy</option>
                                                    <option defaultValue="3">Packing- This is a long name here and there</option>

                                                </select>

                                            </Col>
                                            <Col lg={6}>
                                                <Label className="form-label">From Date</Label>
                                                <Flatpickr
                                                    className="form-control"
                                                    options={{
                                                        dateFormat: "Y-m-d",
                                                        defaultDate: ["2022-01-20"]
                                                    }}
                                                />
                                            </Col>
                                            <Col lg={6}>
                                                <div>
                                                    <Label className="form-label ">From Time</Label>
                                                    <Flatpickr
                                                        className="form-control"
                                                        placeholder='03:05:00'
                                                        options={{
                                                            enableTime: true,
                                                            enableSeconds:true,
                                                            noCalendar: true,
                                                            dateFormat: "H:i:S",
                                                       
                                                        }}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <Label className="form-label">To Date</Label>
                                                <Flatpickr
                                                    className="form-control"
                                                    options={{
                                                        dateFormat: "Y-m-d",
                                                        defaultDate: ["2022-01-20"]
                                                    }}
                                                />
                                            </Col>
                                            <Col lg={6}>
                                                <div>
                                                    <Label className="form-label">To Time</Label>
                                                    <Flatpickr
                                                        className="form-control"
                                                        placeholder='03:56:00'
                                                        options={{
                                                            enableTime: true,
                                                            enableSeconds:true,
                                                            noCalendar: true,
                                                            dateFormat: "H:i:S",
                                                        }}
                                                    />
                                                </div>
                                            </Col>
                                          

                                            <Col lg={12}>
                                                <Label htmlFor="VertimeassageInput" className="form-label">Reason</Label>
                                                <textarea className="form-control" id="VertimeassageInput" rows="3" placeholder="Enter your reason">
                                                </textarea>
                                            </Col>



                                        </Row>
                                    </ModalBody>
                                    <ModalFooter className='justify-content-center'>
                                        <div className="hstack gap-2 ">
                                            <button type="button" className="btn btn-danger" onClick={() => { tog_standard(); }} > Close </button>
                                            <button type="submit" className="btn btn-success" id="add-btn" > {!!isEdit ? "Update" : "Create"} </button>
                                        </div>
                                    </ModalFooter>
                                </Form>
                            </Modal>
                            <ToastContainer closeButton={false} limit={1} />
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default VehicleUnavailability;
