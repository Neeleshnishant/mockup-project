import React from 'react';
import { Container } from 'reactstrap';
import { Card, CardBody, Col, Nav, NavItem, NavLink, Row, Alert, UncontrolledAlert, TabContent, TabPane, UncontrolledTooltip } from "reactstrap";
// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import TableContainer from "../../Components/Common/TableContainer";
import Loader from "../../Components/Common/Loader";
import dummyImg from "../../assets/images/users/user-dummy-img.jpg";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import {
    CardHeader,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    ModalFooter,
    Table,
    FormFeedback
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {
    getContacts as onGetContacts,
    addNewContact as onAddNewContact,
    updateContact as onUpdateContact,
    deleteContact as onDeleteContact,
} from "../../store/actions";
import { toast, ToastContainer } from 'react-toastify';

const Employees = () => {

    const [modal, setModal] = useState(false);
    const [tag, setTag] = useState([]);
    const [isMultiDeleteButton, setIsMultiDeleteButton] = useState(false);
    const [deleteModalMulti, setDeleteModalMulti] = useState(false);
    const [isExportCSV, setIsExportCSV] = useState(false);
    const [assignTag, setAssignTag] = useState([]);
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
    const handleContactClicks = () => {
        setContact("");
        setIsEdit(false);
        toggle();
    };

    const onClickDelete = (contact) => {
        setContact(contact);
        setDeleteModal(true);
    };

    function handlestag(tags) {
        setTag(tags);
        const assigned = tags.map((item) => item.value);
        setAssignTag(assigned);
    }
    const deleteCheckbox = () => {
        const ele = document.querySelectorAll(".contactCheckBox:checked");
        ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
        setSelectedCheckBoxDelete(ele);
    };
    const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
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


    const dateFormat = () => {
        var d = new Date(),
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return (d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear());
    };

    const [isEdit, setIsEdit] = useState(false);

    const [contact, setContact] = useState([]);

    const dispatch = useDispatch();
    const { crmcontacts, isContactCreated, isContactSuccess, error } = useSelector((state) => ({
        crmcontacts: state.Crm.crmcontacts,
        isContactCreated: state.Crm.isContactCreated,
        isContactSuccess: state.Crm.isContactSuccess,
        error: state.Crm.error,
    }));


    const tags = [
        { label: "Exiting", value: "Exiting" },
        { label: "Lead", value: "Lead" },
        { label: "Long-term", value: "Long-term" },
        { label: "Partner", value: "Partner" }
    ];


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
    const smscolumn = useMemo(
        () => [

            {
                Header: "Company Name",
                accessor: "",
                filterable: false,
                // Cell: (contact) => (
                //     <>
                //         <div className="d-flex align-items-center">
                //             <div className="flex-shrink-0">
                //                 {contact.row.original.image_src ? <img
                //                     src={process.env.REACT_APP_API_URL + "/images/users/" + contact.row.original.image_src}
                //                     alt=""
                //                     className="avatar-xxs rounded-circle"
                //                 /> :
                //                     <div className="flex-shrink-0 avatar-xs me-2">
                //                         <div className="avatar-title bg-soft-success text-success rounded-circle fs-13">
                //                             {contact.row.original.name.charAt(0)}
                //                         </div>
                //                     </div>
                //                     // <img src={dummyImg} alt="" className="avatar-xxs rounded-circle" />
                //                 }
                //             </div>
                //             <div className="flex-grow-1 ms-2 name">
                //                 {contact.row.original.name}
                //             </div>
                //         </div>
                //     </>
                // ),
            },
            {
                Header: "Address",
                accessor: "address",
                filterable: false,
            },

            {
                Header: "ABN",
                accessor: "",
                filterable: false,
            },

            {
                Header: "Default",
                accessor: "Y",
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
                                            className="dropdown-item edit-item-btn"
                                            href="#"
                                            onClick={() => { const contactData = cellProps.row.original; handleContactClick(contactData); }}
                                        >
                                            <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                            Edit
                                        </DropdownItem>
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
    document.title = "Widgets | Onexfort";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Employees" pageTitle="Onexfort" />

                </Container>

                <Container fluid>
                    <Card>
                        <CardHeader>
                            <div className="d-flex align-items-center flex-wrap gap-2">
                                <div className="flex-grow-1">
                                    <button
                                        className="btn btn-brown add-btn"
                                        onClick={() => {
                                            setModal(true);
                                        }}
                                    >
                                        <i className="ri-add-fill me-1 align-bottom"></i> Add
                                        Employee
                                    </button>
                                </div>
                                <div className="flex-shrink-0">
                                    <div className="hstack text-nowrap gap-2">
                                        {isMultiDeleteButton && <button className="btn btn-danger"
                                            onClick={() => setDeleteModalMulti(true)}
                                        ><i className="ri-delete-bin-2-line"></i></button>}

                                        <button className="btn btn-soft-success" onClick={() => setIsExportCSV(true)}>Export To Excel</button>

                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                    <Col xxl={12}>
                        <Card id="contactList">
                            <CardBody className="pt-0">
                                <div>
                                    {isContactSuccess && crmcontacts.length ? (
                                        <TableContainer
                                            columns={smscolumn}
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

                                <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                                    <ModalHeader className="bg-soft-info p-3" toggle={toggle}>
                                        {!!isEdit ? "Edit SMS" : "Add SMS"}
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
                                                        >First Name

                                                        </Label>
                                                        <Input
                                                            name="name"
                                                            id="customername-field"
                                                            className="form-control"
                                                            placeholder="Enter Name"
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
                                                <Col lg={6}>

                                                    <div>
                                                        <Label
                                                            htmlFor="name-field"
                                                            className="form-label"
                                                        >
                                                            Last Name
                                                        </Label>
                                                        <Input
                                                            name="name"
                                                            id="customername-field"
                                                            className="form-control"
                                                            placeholder="Enter Name"
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
                                                <Col lg={12}>


                                                    <div>
                                                        <Label
                                                            htmlFor="name-field"
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
                                                        />

                                                    </div>
                                                </Col>
                                                <Col lg={12}>


                                                    <div>
                                                        <Label
                                                            htmlFor="name-field"
                                                            className="form-label"
                                                        >
                                                            Employee Number
                                                        </Label>
                                                        <Input
                                                            name="name"
                                                            id="customername-field"
                                                            className="form-control"
                                                            placeholder="Enter number"
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

                                                    </div><br />


                                                    <Col md={12}>
                                                        <p><b>Is this Employee a user</b></p>
                                                        <div className='mt-3 d-flex align-items-center'>
                                                            <div className="form-check form-switch form-switch-lg" dir="ltr">
                                                                <Input type="checkbox" className="form-check-input" id="customSwitchsizelg" defaultChecked="" />

                                                            </div>
                                                        </div>
                                                    </Col>



                                                </Col>


                                            </Row>
                                        </ModalBody>
                                        <ModalFooter>
                                            <div className="hstack gap-2 justify-content-end">
                                                <button type="button" className="btn btn-light" onClick={() => { setModal(false); }} > Close </button>
                                                <button type="submit" className="btn btn-success" id="add-btn" > {!!isEdit ? "Update" : "Save"} </button>
                                            </div>
                                        </ModalFooter>
                                    </Form>
                                </Modal>
                                <ToastContainer closeButton={false} limit={1} />
                            </CardBody>
                        </Card>
                    </Col>

                </Container>
            </div>
        </React.Fragment>
    );
};

export default Employees;
