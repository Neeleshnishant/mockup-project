import PrismCode from "../../Components/Common/Prism";
import { Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, Alert, UncontrolledAlert, TabContent, TabPane, UncontrolledTooltip } from "reactstrap";
import classnames from "classnames";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import TableRows from "./TableRows";
import img3 from "../../assets/images/small/img-3.jpg";
import { Button } from 'reactstrap';
import { Checklist } from "./TableRows";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import * as moment from "moment";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../assets/scss/pages/_settings.scss";
// Import Images
import dummyImg from "../../assets/images/users/user-dummy-img.jpg";
import powered_by_stripe from "../../assets/images/powered_by_stripe.png";
import quickfee from "../../assets/images/quickfee.jpg";
import connectXero from "../../assets/images/connectxero.jpg";
import connectmyob from "../../assets/images/connectmyob.png"
import connectcover from "../../assets/images/connectcover.jpg"
import {
    CardHeader,
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
import Select from "react-select";
import DeleteModal from "../../Components/Common/DeleteModal";
//Import actions
import {
    getContacts as onGetContacts,
    addNewContact as onAddNewContact,
    updateContact as onUpdateContact,
    deleteContact as onDeleteContact,
} from "../../store/actions";
//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../Components/Common/TableContainer";
// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import Loader from "../../Components/Common/Loader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Export Modal
import ExportCSVModal from "../../Components/Common/ExportCSVModal";
// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';


const Removalsettings = () => {
    const [modal, setModal] = useState(false);

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


    const StripedColumnsTables = () => {
        const code = `<div className="table-responsive table-card">
        <table className="table align-middle table-nowrap table-striped-columns mb-0">
            <thead className="table-light">
                <tr>
                    <th scope="col" style={{width: "46px"}}>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="cardtableCheck" />
                            <label className="form-check-label" htmlFor="cardtableCheck"></label>
                        </div>
                    </th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Total</th>
                    <th scope="col">Status</th>
                    <th scope="col" style={{width: "150px"}}>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="cardtableCheck01" />
                            <label className="form-check-label" htmlFor="cardtableCheck01"></label>
                        </div>
                    </td>
                    <td><a href="#" className="fw-medium">#VL2110</a></td>
                    <td>William Elmore</td>
                    <td>07 Oct, 2021</td>
                    <td>$24.05</td>
                    <td><span className="badge bg-success">Paid</span></td>
                    <td>
                        <button type="button" className="btn btn-sm btn-light">Details</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="cardtableCheck02" />
                            <label className="form-check-label" htmlFor="cardtableCheck02"></label>
                        </div>
                    </td>
                    <td><a href="#" className="fw-medium">#VL2109</a></td>
                    <td>Georgie Winters</td>
                    <td>07 Oct, 2021</td>
                    <td>$26.15</td>
                    <td><span className="badge bg-success">Paid</span></td>
                    <td>
                        <button type="button" className="btn btn-sm btn-light">Details</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="cardtableCheck03" />
                            <label className="form-check-label" htmlFor="cardtableCheck03"></label>
                        </div>
                    </td>
                    <td><a href="#" className="fw-medium">#VL2108</a></td>
                    <td>Whitney Meier</td>
                    <td>06 Oct, 2021</td>
                    <td>$21.25</td>
                    <td><span className="badge bg-danger">Refund</span></td>
                    <td>
                        <button type="button" className="btn btn-sm btn-light">Details</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="cardtableCheck04" />
                            <label className="form-check-label" htmlFor="cardtableCheck04"></label>
                        </div>
                    </td>
                    <td><a href="#" className="fw-medium">#VL2107</a></td>
                    <td>Justin Maier</td>
                    <td>05 Oct, 2021</td>
                    <td>$25.03</td>
                    <td><span className="badge bg-success">Paid</span></td>
                    <td>
                        <button type="button" className="btn btn-sm btn-light">Details</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
        `

    }
    const TablesWithoutBorders = () => {
        const code = `<div className="table-responsive">
    <Table className="table-borderless align-middle table-nowrap mb-0">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Job Title</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="fw-medium">01</td>
                <td>Annette Black</td>
                <td>Industrial Designer</td>
                <td>10, Nov 2021</td>
                <td><span className="badge badge-soft-success">Active</span></td>
                <td>
                    <div className="hstack gap-3 fs-15">
                        <Link to="#" className="link-primary"><i className="ri-settings-4-line"></i></Link>
                        <Link to="#" className="link-danger"><i className="ri-delete-bin-5-line"></i></Link>
                    </div>
                </td>
            </tr>
            <tr>
                <td className="fw-medium">02</td>
                <td>Bessie Cooper</td>
                <td>Graphic Designer</td>
                <td>13, Nov 2021</td>
                <td><span className="badge badge-soft-success">Active</span></td>
                <td>
                    <div className="hstack gap-3 fs-15">
                        <Link to="#" className="link-primary"><i className="ri-settings-4-line"></i></Link>
                        <Link to="#" className="link-danger"><i className="ri-delete-bin-5-line"></i></Link>
                    </div>
                </td>
            </tr>
            <tr>
                <td className="fw-medium">03</td>
                <td>Leslie Alexander</td>
                <td>Product Manager</td>
                <td>17, Nov 2021</td>
                <td><span className="badge badge-soft-success">Active</span></td>
                <td>
                    <div className="hstack gap-3 fs-15">
                        <Link to="#" className="link-primary"><i className="ri-settings-4-line"></i></Link>
                        <Link to="#" className="link-danger"><i className="ri-delete-bin-5-line"></i></Link>
                    </div>
                </td>
            </tr>
            <tr>
                <td className="fw-medium">04</td>
                <td>Lenora Sandoval</td>
                <td>Applications Engineer</td>
                <td>25, Nov 2021</td>
                <td><span className="badge badge-soft-danger">Disabled</span></td>
                <td>
                    <div className="hstack gap-3 fs-15">
                        <Link to="#" className="link-primary"><i className="ri-settings-4-line"></i></Link>
                        <Link to="#" className="link-danger"><i className="ri-delete-bin-5-line"></i></Link>
                    </div>
                </td>
            </tr>
        </tbody>
    </Table>
    </div>
    `

    }

    const SingleOptions = [
        { value: 'Choices 1', label: 'Choices 1' },
        { value: 'Choices 2', label: 'Choices 2' },
        { value: 'Choices 3', label: 'Choices 3' },
        { value: 'Choices 4', label: 'Choices 4' }
    ];


    const [rowsData, setRowsData] = useState([]);
    const addTableRows = () => {
        const rowsInput = {
            fullName: '',
            emailAddress: '',
            salary: ''
        }
        setRowsData([...rowsData, rowsInput])
    }
    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    }
    const handleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
    }
    // Vertical Nav Tabs

    const [selectedSingle, setSelectedSingle] = useState(null);

    function handleSelectSingle(selectedSingle) {
        setSelectedSingle(selectedSingle);
    }

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

    const [modal_large, setModal_Company] = useState(false);
    function tog_Company() {
        setModal_Company(!modal_large);
    }

    // Delete Data
    const handleDeleteContact = () => {
        if (contact) {
            dispatch(onDeleteContact(contact._id));
            setDeleteModal(false);
        }
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

    const [order, setOrder] = useState([]);

   const handleOrderClick = useCallback((arg) => {
        const order = arg;
        setOrder({
            _id: order._id,
            orderId: order.orderId,
            customer: order.customer,
            product: order.product,
            orderDate: order.orderDate,
            ordertime: order.ordertime,
            amount: order.amount,
            payment: order.payment,
            status: order.status
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

    //sms column
    const smscolumn = useMemo(
        () => [

            {
                Header: "Company Name",
                accessor: "",
                filterable: false,

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
                            <button className="btn btn-sm btn-soft-info edit-list" onClick={() => {
                                const orderData = cellProps.row.original;
                                handleOrderClick(orderData);
                            }} ><i className="bx bxs-pencil fs-12 pt-1"></i>
                            </button>
                        </li>
                        <li className="list-inline-item edit">
                            <Link
                                to="#"
                                className=" btn btn-sm btn-soft-danger fs-13 pt-1"

                            >
                                <i className="bx bxs-trash fs-12"></i>
                            </Link>
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

 
    // Export Modal
    const [isExportCSV, setIsExportCSV] = useState(false);

    document.title = "Widgets | Onexfort";
    return (
        <React.Fragment>
            <div className="page-content">
                <ExportCSVModal
                    show={isExportCSV}
                    onCloseClick={() => setIsExportCSV(false)}
                    data={crmcontacts}
                />
                <DeleteModal
                    show={deleteModal}
                    onDeleteClick={handleDeleteContact}
                    onCloseClick={() => setDeleteModal(false)}
                />

                <DeleteModal
                    show={deleteModalMulti}
                    onDeleteClick={() => {
                        deleteMultiple();
                        setDeleteModalMulti(false);
                    }}
                    onCloseClick={() => setDeleteModalMulti(false)}
                />
                <Container fluid>
                    <BreadCrumb title="Company Settings" pageTitle="Onexfort" />


                    <Row>
                        <Col xl={3}>
                            <Card>
                                <CardBody><Nav pills className="flex-column" id="v-pills-tab">
                                    <h6 className="mb-3 text-brown">General</h6>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                "mb-2": true,
                                                active: verticalTab === "1",
                                            })}
                                            onClick={() => {
                                                toggleVertical("1");
                                            }}
                                            id="v-pills-home-tab"

                                        ><i className='bx bxs-truck'></i>
                                            <span> Organization setting</span>

                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                "mb-2": true,
                                                active: verticalTab === "2",
                                            })}
                                            onClick={() => {
                                                toggleVertical("2");
                                            }}
                                            id="v-pills-profile-tab"
                                        >

                                            <i className='bx bx-send'></i>
                                            <span> Companies</span>

                                        </NavLink>

                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                "mb-2": true,
                                                active: verticalTab === "3",
                                            })}
                                            onClick={() => {
                                                toggleVertical("3");
                                            }}
                                            id="v-pills-messages-tab"
                                        >
                                            <i className='bx bx-send'></i>
                                            <span> Service Cities</span>


                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                "mb-2": true,
                                                active: verticalTab === "4",
                                            })}
                                            onClick={() => {
                                                toggleVertical("4");
                                            }}
                                            id="v-pills-profile-tab"
                                        >

                                            <i className='bx bx-send'></i>
                                            <span> List Type And Options</span>

                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                "mb-2": true,
                                                active: verticalTab === "5",
                                            })}
                                            onClick={() => {
                                                toggleVertical("5");
                                            }}
                                            id="v-pills-profile-tab"
                                        >

                                            <i className='bx bx-send'></i>
                                            <span> Profile setting</span>

                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                "mb-2": true,
                                                active: verticalTab === "6",
                                            })}
                                            onClick={() => {
                                                toggleVertical("6");
                                            }}
                                            id="v-pills-profile-tab"
                                        >

                                            <i className='bx bx-send'></i>
                                            <span> Payment credentials</span>

                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                "mb-2": true,
                                                active: verticalTab === "7",
                                            })}
                                            onClick={() => {
                                                toggleVertical("7");
                                            }}
                                            id="v-pills-profile-tab"
                                        >

                                            <i className='bx bx-send'></i>
                                            <span> Buy SMS credits</span>

                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                "mb-2": true,
                                                active: verticalTab === "8",
                                            })}
                                            onClick={() => {
                                                toggleVertical("8");
                                            }}
                                            id="v-pills-settings-tab"
                                        >
                                            <i className='bx bx-send'></i>
                                            <span> Connect Stripe</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                "mb-2": true,
                                                active: verticalTab === "9",
                                            })}
                                            onClick={() => {
                                                toggleVertical("9");
                                            }}
                                            id="v-pills-settings-tab"
                                        >
                                            <i className='bx bx-send'></i>
                                            <span> Connect Quick Fee </span>


                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                "mb-2": true,
                                                active: verticalTab === "10",
                                            })}
                                            onClick={() => {
                                                toggleVertical("10");
                                            }}
                                            id="v-pills-settings-tab"
                                        >
                                            <i className='bx bx-send'></i>
                                            <span> Connect Xero</span>


                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                "mb-2": true,
                                                active: verticalTab === "11",
                                            })}
                                            onClick={() => {
                                                toggleVertical("11");
                                            }}
                                            id="v-pills-settings-tab"
                                        >
                                            <i className='bx bx-send'></i>
                                            <span> Connect MYOB</span>


                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                "mb-2": true,
                                                active: verticalTab === "12",
                                            })}
                                            onClick={() => {
                                                toggleVertical("12");
                                            }}
                                            id="v-pills-settings-tab"
                                        >
                                            <i className='bx bx-send'></i>
                                            <span> Configure Email</span>


                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                "mb-2": true,
                                                active: verticalTab === "13",
                                            })}
                                            onClick={() => {
                                                toggleVertical("13");
                                            }}
                                            id="v-pills-settings-tab"
                                        >
                                            <i className='bx bx-send'></i>
                                            <span> Connect Coverfright</span>


                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                "mb-2": true,
                                                active: verticalTab === "14",
                                            })}
                                            onClick={() => {
                                                toggleVertical("14");
                                            }}
                                            id="v-pills-settings-tab"
                                        >
                                            <i className='bx bx-send'></i>
                                            <span> Page Personalisation</span>


                                        </NavLink>



                                    </NavItem>
                                </Nav></CardBody>
                            </Card>

                        </Col>
                        <Col xl={9}>
                            <TabContent
                                activeTab={verticalTab}
                                className="text-muted mt-4 mt-md-0"
                                id="v-pills-tabContent"
                            >
                                <TabPane tabId="1" id="v-pills-home">

                                    <Col xxl={12}>

                                        <Card id="contactList">
                                            <CardHeader><h5 className="mb-0 text-primary">Update Organization Settings</h5></CardHeader>
                                            <CardBody className="card-body">
                                                <div className="live-preview">
                                                    <Row className="gy-4">
                                                        <Col xxl={12} md={12}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Organisation Name</Label>
                                                                <Input type="password" className="form-control" id="basiInput" />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={12} md={12}>
                                                            <div>
                                                                <Label className="form-label"> Organization Email</Label>
                                                                <Input type="Email" className="form-control" />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={12} md={12}>
                                                            <div>
                                                                <Label htmlFor="placeholderInput" className="form-label">Organisation Phone</Label>
                                                                <Input type="text" className="form-control" id="placeholderInput" defaultValue="0390000002" />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={12} md={12}>
                                                            <div>
                                                                <Label className="form-label">Organization Website</Label>
                                                                <Input type="text" className="form-control" defaultValue="" />
                                                            </div>
                                                        </Col>



                                                        <Col xxl={12} md={12}>
                                                            <div>
                                                                <Label htmlFor="readonlyInput" className="form-label">Organization Address</Label>
                                                                <textarea className="form-control" id="VertimeassageInput" rows="3" placeholder="Enter your message"></textarea>
                                                            </div>
                                                        </Col>

                                                        <Col xxl={12} md={12}>
                                                            <div >
                                                                <Label htmlFor="choices-single-default" className="form-label text-muted">Default Timezone</Label>
                                                                <Select
                                                                    value={selectedSingle}
                                                                    onChange={() => {
                                                                        handleSelectSingle();
                                                                    }}
                                                                    options={SingleOptions}
                                                                />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={12} md={12}>
                                                            <div>
                                                                <Label htmlFor="iconInput" className="form-label">Date Format</Label>
                                                                <Select
                                                                    value={selectedSingle}
                                                                    onChange={() => {
                                                                        handleSelectSingle();
                                                                    }}
                                                                    options={SingleOptions}
                                                                />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={12} md={12}>
                                                            <div>
                                                                <Label htmlFor="iconrightInput" className="form-label">Time format</Label>

                                                                <Select
                                                                    value={selectedSingle}
                                                                    onChange={() => {
                                                                        handleSelectSingle();
                                                                    }}
                                                                    options={SingleOptions}
                                                                />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={12} md={12}>
                                                            <div>
                                                                <Label htmlFor="exampleDataList" className="form-label">weekstart</Label>



                                                                <Select
                                                                    value={selectedSingle}
                                                                    onChange={() => {
                                                                        handleSelectSingle();
                                                                    }}
                                                                    options={SingleOptions}
                                                                />

                                                            </div>
                                                        </Col>
                                                        <Col xxl={12} md={12}>
                                                            <div>
                                                                <Label htmlFor="exampleInputdate" className="form-label">Change Language</Label>

                                                                <Select
                                                                    value={selectedSingle}
                                                                    onChange={() => {
                                                                        handleSelectSingle();
                                                                    }}
                                                                    options={SingleOptions}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <div className="text-center">
                                                            <Button className="btn btn-success ">Update</Button>&nbsp;
                                                            <Button className="btn btn-danger">Reset</Button>
                                                        </div>
                                                    </Row>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>

                                </TabPane>
                                <TabPane tabId="2" id="v-pills-profile">
                                    <Card>
                                        <CardHeader>
                                            <div className="d-flex align-items-center flex-wrap gap-2">
                                                <div className="flex-grow-1">
                                                    <button
                                                        className="btn btn-brown add-btn"
                                                        onClick={() => {
                                                            tog_Company(true);
                                                        }}
                                                    >
                                                        <i className="ri-add-fill me-1 align-bottom"></i> Add
                                                        Company
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

                                                <Modal id="showModal" isOpen={modal_large} size="xl"
                                                    toggle={() => {
                                                        tog_Company();

                                                    }} centered>
                                                    <ModalHeader className="bg-soft-info p-3" toggle={toggle}>
                                                        {!!isEdit ? "Edit Company" : "Add Company"}
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
                                                                            htmlFor="company_name-field"
                                                                            className="form-label"
                                                                        >
                                                                            Email
                                                                        </Label>
                                                                        <Input
                                                                            name="company"
                                                                            id="company_name-field"
                                                                            className="form-control"
                                                                            placeholder="Enter Company Name"
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
                                                                            Contact Name
                                                                        </Label>

                                                                        <Input
                                                                            name="designation"
                                                                            id="designation-field"
                                                                            className="form-control"
                                                                            placeholder="Enter Designation"
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
                                                                            Phone
                                                                        </Label>

                                                                        <Input
                                                                            name="email"
                                                                            id="email_id-field"
                                                                            className="form-control"
                                                                            placeholder="Enter Email"
                                                                            type="text"
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
                                                                            SMS Number
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
                                                                <Col lg={6}>
                                                                    <div>
                                                                        <Label
                                                                            htmlFor="lead_score-field"
                                                                            className="form-label"
                                                                        >
                                                                            Address
                                                                        </Label>

                                                                        <Input
                                                                            name="address"
                                                                            id="lead_score-field"
                                                                            className="form-control"
                                                                            placeholder="Enter Lead Score"
                                                                            type="text"
                                                                            validate={{
                                                                                required: { value: true },
                                                                            }}
                                                                            onChange={validation.handleChange}
                                                                            onBlur={validation.handleBlur}
                                                                            value={validation.values.lead_score || ""}
                                                                            invalid={
                                                                                validation.touched.lead_score && validation.errors.lead_score ? true : false
                                                                            }
                                                                        />
                                                                        {validation.touched.lead_score && validation.errors.lead_score ? (
                                                                            <FormFeedback type="invalid">{validation.errors.lead_score}</FormFeedback>
                                                                        ) : null}
                                                                    </div>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <Label>ABN</Label>
                                                                    <Input type="text"></Input>
                                                                </Col>
                                                                <Col lg={12}>
                                                                    <Label>Terms And Conditions</Label>
                                                                    <CKEditor
                                                                        editor={ClassicEditor}
                                                                        data="<p>Hello from CKEditor 5!</p>"
                                                                        onReady={(editor) => {
                                                                            // You can store the "editor" and use when it is needed.

                                                                        }}
                                                                        onChange={(editor) => {
                                                                            editor.getData();
                                                                        }}
                                                                    />
                                                                </Col>
                                                                <Col lg={12}>
                                                                    <Label>Customer Sign-Off Checklist</Label>
                                                                    <CKEditor
                                                                        editor={ClassicEditor}
                                                                        data="<p>Hello from CKEditor 5!</p>"
                                                                        onReady={(editor) => {
                                                                            // You can store the "editor" and use when it is needed.

                                                                        }}
                                                                        onChange={(editor) => {
                                                                            editor.getData();
                                                                        }}
                                                                    />
                                                                </Col>
                                                                <Col lg={12}>
                                                                    <Label>Customer Pre-job Checklist</Label>
                                                                    <CKEditor
                                                                        editor={ClassicEditor}
                                                                        data="<p>Hello from CKEditor 5!</p>"
                                                                        onReady={(editor) => {
                                                                            // You can store the "editor" and use when it is needed.

                                                                        }}
                                                                        onChange={(editor) => {
                                                                            editor.getData();
                                                                        }}
                                                                    />
                                                                </Col>
                                                                <Col lg={12}>
                                                                    <Label>Work Order Instructions</Label>
                                                                    <CKEditor
                                                                        editor={ClassicEditor}
                                                                        data="<p>Hello from CKEditor 5!</p>"
                                                                        onReady={(editor) => {
                                                                            // You can store the "editor" and use when it is needed.

                                                                        }}
                                                                        onChange={(editor) => {
                                                                            editor.getData();
                                                                        }}
                                                                    />
                                                                </Col>
                                                                <Col lg={12}>
                                                                    <Label>POD Instructions</Label>
                                                                    <CKEditor
                                                                        editor={ClassicEditor}
                                                                        data="<p>Hello from CKEditor 5!</p>"
                                                                        onReady={(editor) => {
                                                                            // You can store the "editor" and use when it is needed.

                                                                        }}
                                                                        onChange={(editor) => {
                                                                            editor.getData();
                                                                        }}
                                                                    />
                                                                </Col>
                                                                <Col lg={6}><div className="form-check mb-2">
                                                                    <Input className="form-check-input" type="checkbox" id="checkActive" />
                                                                    <Label className="form-check-label" for="checkActive">
                                                                        Default
                                                                    </Label>
                                                                </div>
                                                                </Col>
                                                                <Col lg={6}><div className="form-check mb-2">
                                                                    <Input className="form-check-input" type="checkbox" id="checkActive" />
                                                                    <Label className="form-check-label" for="checkActive">
                                                                        Active
                                                                    </Label>
                                                                </div>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Label htmlFor="choices-single-default" className="form-label ">Profile Picture</Label>
                                                                        <Row className="mb-2">
                                                                            <Col md={4} >
                                                                                <img className="img-thumbnail" alt="200x200" src={img3} />
                                                                            </Col>
                                                                        </Row>
                                                                        <Button className="btn btn-info" > Select image </Button>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <div className="hstack gap-2 justify-content-end">
                                                                <button type="submit" className="btn btn-success" id="add-btn" > {!!isEdit ? "Update" : "Cancel"} </button>
                                                                <button type="button" className="btn btn-light" onClick={() => { setModal_Company(false); }} > Save </button>
                                                            </div>
                                                        </ModalFooter>
                                                    </Form>
                                                </Modal>
                                                <ToastContainer closeButton={false} limit={1} />
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </TabPane>
                                <TabPane tabId="3" id="v-pills-messages">

                                    <Col xxl={12}>
                                        <Card id="contactList">
                                            <CardHeader>
                                                <h5 className="mb-0 text-primary">Serving Cities</h5>
                                            </CardHeader>

                                            <CardBody className="pt-0 mt-3">

                                                <Table className="table table-bordered table-nowrap align-middle mb-3">
                                                    <thead>
                                                        <tr>
                                                            <th >
                                                                Servicing city
                                                            </th>
                                                            <th>Action</th>

                                                        </tr>

                                                    </thead>
                                                    <tbody>
                                                        <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
                                                    </tbody>
                                                </Table>


                                                <button className="btn btn-primary" onClick={addTableRows} >+</button>

                                            </CardBody>
                                        </Card>
                                    </Col>
                                </TabPane>
                                <TabPane tabId="4" id="v-pills-settings">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="mb-0 text-primary">List Type</h5>
                                        </CardHeader>
                                        <CardBody>

                                            <Table className="table table-bordered table-nowrap align-middle mb-3">
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th>
                                                            List Type
                                                        </th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td >Backloading Status</td>
                                                    </tr>
                                                    <tr>
                                                        <td >Contact Type</td>
                                                    </tr>

                                                    <tr>
                                                        <td >Job Status</td>
                                                    </tr>

                                                    <tr>

                                                        <td >Job Type</td>
                                                    </tr>

                                                    <tr> <td >Job Type</td>
                                                    </tr>

                                                    <tr><td >Lead Info</td>
                                                    </tr>

                                                    <tr> <td >Leg Status</td>
                                                    </tr>

                                                    <tr>  <td >Op Frequency</td>
                                                    </tr>
                                                    <tr>
                                                        <td >Payment Status</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Price Structure</td>
                                                    </tr>

                                                </tbody>

                                            </Table>
                                            <h5 className="mb-0 text-primary"> List Options:  </h5>

                                            <div className="live-preview mb-3">
                                                <Row className="g-3">
                                                    <Col xxl={6} md={6}>
                                                        <div>
                                                            <Label htmlFor="iconInput" className="form-label"></Label>
                                                            <Select
                                                                value={selectedSingle}
                                                                onChange={() => {
                                                                    handleSelectSingle();
                                                                }}
                                                                options={SingleOptions}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <br />

                                                <Button className="btn btn-brown"> Load List Options </Button>
                                                <div>

                                                </div>
                                            </div>


                                            <Table className="table table-bordered   align-middle mb-3">
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th className="listTypeHead" >
                                                            ListType
                                                        </th>
                                                        <th>
                                                            ListOptions
                                                        </th>
                                                        <th>
                                                            Action
                                                        </th>

                                                    </tr>

                                                </thead>
                                                <tbody className="mb-3">
                                                    <Checklist rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />

                                                </tbody>

                                                <button className="btn btn-primary mt-3" onClick={addTableRows} >+</button>
                                            </Table>

                                        </CardBody>
                                    </Card>
                                </TabPane>
                                <TabPane tabId="5" id="v-pills-profilesetting">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="mb-0 text-primary">Update Profile Info</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Col xxl={12}>

                                                <div className="live-preview">
                                                    <Row className="gy-4">
                                                        <Col xxl={12} md={12}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Your Name</Label>
                                                                <Input type="text" className="form-control" id="readonlyInput" />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={12} md={12}>
                                                            <div>
                                                                <Label className="form-label"> Your Email</Label>
                                                                <Input type="Email" className="form-control" />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={12} md={12}>
                                                            <div>
                                                                <Label htmlFor="placeholderInput" className="form-label"> Your Password</Label>
                                                                <Input type="Password" className="form-control" id="placeholderInput" placeholder="********" />
                                                            </div>
                                                            Lev Blank to keep your current Password
                                                        </Col>

                                                        <Col xxl={12} md={12}>
                                                            <div>
                                                                <Label htmlFor="valueInput" className="form-label">Your Mobile Number</Label>
                                                                <Input type="Mobile" className="form-control" id="valueInput" defaultValue="01100000" />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={12} md={12}>
                                                            <div>
                                                                <Label htmlFor="readonlyInput" className="form-label">Gender</Label>
                                                                <Input type="text" className="form-control" id="readonlyInput" readOnly />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={12} md={12}>
                                                            <div className="mb-3">
                                                                <Label htmlFor="choices-single-default" className="form-label text-muted">Your Address</Label>
                                                                <Input type="text" className="form-control" id="readonlyInput" readOnly />
                                                            </div>

                                                        </Col>
                                                        <Col xxl={12} md={12}>
                                                            <div className="mb-3">
                                                                <Label htmlFor="choices-single-default" className="form-label text-muted">Profile Picture</Label>
                                                                <Row className="mb-2">
                                                                    <Col md={4} >
                                                                        <img className="img-thumbnail" alt="200x200" src={img3} />
                                                                    </Col>
                                                                </Row>
                                                                <Button className="btn btn-info" > Select image </Button>
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                </div>

                                            </Col>
                                            <hr></hr>
                                            <div className="text-center">
                                                <Button className="btn btn-success" >Update</Button> &nbsp;
                                                <Button className="btn btn-dark" >Reset</Button>
                                            </div>
                                        </CardBody>

                                    </Card>

                                </TabPane>
                                <TabPane tabId="6" id="v-pills-tablesetting">
                                    <Card>
                                        <CardHeader> <Row>
                                            <Col md={9} className="paymentCredHead"><h5 className="mb-0 text-primary">Offline Payment Method</h5></Col>
                                            <Col md={3} className="paycredBtn"><Button className="btn btn-success"> Top Up and Save  </Button></Col>
                                        </Row></CardHeader>

                                        <Col lg={12}>
                                            <CardBody>

                                                <div className="live-preview">
                                                    <div className="table-responsive">
                                                        <Table className="table-bordered align-middle table-nowrap mb-0">
                                                            <thead className="bg-light">
                                                                <tr >
                                                                    <th scope="col" >#</th>
                                                                    <th scope="col" >Name</th>
                                                                    <th scope="col" >Job Title</th>
                                                                    <th scope="col" >Date</th>
                                                                    <th scope="col" >Status</th>

                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="fw-medium">01</td>

                                                                    <td>Industrial Designer</td>
                                                                    <td>10, Nov 2021</td>
                                                                    <td><span className="badge badge-soft-success">Active</span></td>
                                                                    <td>
                                                                        <div className="hstack gap-3 fs-15">
                                                                            <Link to="#" className="link-primary"><i className="ri-settings-4-line"></i></Link>
                                                                            <Link to="#" className="link-danger"><i className="ri-delete-bin-5-line"></i></Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="fw-medium">02</td>

                                                                    <td>Graphic Designer</td>
                                                                    <td>13, Nov 2021</td>
                                                                    <td><span className="badge badge-soft-success">Active</span></td>
                                                                    <td>
                                                                        <div className="hstack gap-3 fs-15">
                                                                            <Link to="#" className="link-primary"><i className="ri-settings-4-line"></i></Link>
                                                                            <Link to="#" className="link-danger"><i className="ri-delete-bin-5-line"></i></Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="fw-medium">03</td>

                                                                    <td>Product Manager</td>
                                                                    <td>17, Nov 2021</td>
                                                                    <td><span className="badge badge-soft-success">Active</span></td>
                                                                    <td>
                                                                        <div className="hstack gap-3 fs-15">
                                                                            <Link to="#" className="link-primary"><i className="ri-settings-4-line"></i></Link>
                                                                            <Link to="#" className="link-danger"><i className="ri-delete-bin-5-line"></i></Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="fw-medium">04</td>

                                                                    <td>Applications Engineer</td>
                                                                    <td>25, Nov 2021</td>
                                                                    <td><span className="badge badge-soft-danger">Disabled</span></td>
                                                                    <td>
                                                                        <div className="hstack gap-3 fs-15">
                                                                            <Link to="#" className="link-primary"><i className="ri-settings-4-line"></i></Link>
                                                                            <Link to="#" className="link-danger"><i className="ri-delete-bin-5-line"></i></Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </div>
                                                <div className="d-none code-view">
                                                    <pre className="language-markup" style={{ "height": "275px" }}>
                                                        <code>
                                                            <TablesWithoutBorders />
                                                        </code>
                                                    </pre>
                                                </div>
                                            </CardBody>
                                        </Col>
                                    </Card>

                                </TabPane>
                                <TabPane tabId="7" id="v-pills-credits">
                                    <Card>
                                        <CardHeader><h5 className="mb-0 text-brown">Buy SMS Credits</h5></CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col md={6}>
                                                    <Label className="form-label text-black">Credits</Label>
                                                    <Input type="Text" className="form-control" id="basiInput" />
                                                    <p><span className="text-dark">1 credit = 1 sms at 7 cents per sms</span></p>
                                                </Col>
                                                <Col md={1}></Col>
                                                <Col md={5} className="mt-4">
                                                    <Row>
                                                        <Col md="2">
                                                            <span href="#" className="btn bg-transparent border-success text-success rounded-pill border-2 btn-icon mr-3">
                                                                <i className="bx bx-coin-stack icnCoin"></i>
                                                            </span>
                                                        </Col>
                                                        <Col md="10">
                                                            <span className="SMSCred">218
                                                                <p className="SMSCred-light">Available Credits</p></span>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                            </Row>
                                            <div>
                                                <Button className="btn btn-brown  mb-1"> Buy</Button>
                                            </div>
                                            <hr></hr>
                                            <h5>Auto Top Up</h5>
                                            <Row className="mb-2">
                                                <Col lg={1}>
                                                    <span className="form-check form-switch form-check-right mb-2">
                                                        <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckRightDisabled" defaultChecked />
                                                        <Label className="form-check-label pad-left" for="flexSwitchCheckRightDisabled">Off</Label>
                                                    </span></Col>
                                                <Col lg={1} className="remove-padding">
                                                    <span className="form-check mb-2">
                                                        <Label className="form-check-label" for="flexSwitchCheckRightDisabled">On</Label>
                                                    </span>
                                                </Col>
                                            </Row>

                                            <Table className="table table-bordered table-nowrap align-middle mb-3">
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th>
                                                            Stripe Customer Id: cus_LHBW9lLEQIyVgp
                                                        </th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            When my balance falls below
                                                        </td>
                                                        <td><Input type="Text" className="form-control" id="basiInput" /></td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Then top up my balance by
                                                        </td>
                                                        <td><Input type="Text" className="form-control" id="basiInput" /></td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            <Button className="btn btn-success mb-3"> Top Up and Save  </Button>
                                            <h5 className="mb-3">SMS Purchases</h5>

                                            <table className="table align-middle table-nowrap table-striped-columns mb-0">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th scope="col">
                                                            Gateway</th>
                                                        <th scope="col">Transaction ID</th>
                                                        <th scope="col">Transaction Date</th>
                                                        <th scope="col">Credit Purchased</th>
                                                        <th>Status</th>
                                                        <th scope="col" style={{ width: "150px" }}>Payment Amount</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>William Elmore</td>
                                                        <td>William Elmore</td>
                                                        <td>07 Oct, 2021</td>
                                                        <td>$24.05</td>
                                                        <td><span className="badge bg-success">Completed</span></td>
                                                        <td>
                                                            <button type="button" className="btn btn-sm btn-light">Details</button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Georgie Winters</td>
                                                        <td>William Elmore</td>
                                                        <td>07 Oct, 2021</td>
                                                        <td>$26.15</td>
                                                        <td><span className="badge bg-success">Completed</span></td>
                                                        <td>
                                                            <button type="button" className="btn btn-sm btn-light">Details</button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Whitney Meier</td>
                                                        <td>William Elmore</td>
                                                        <td>06 Oct, 2021</td>
                                                        <td>$21.25</td>
                                                        <td><span className="badge bg-danger">pending</span></td>
                                                        <td>
                                                            <button type="button" className="btn btn-sm btn-light">Details</button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Justin Maier</td>
                                                        <td>William Elmore</td>
                                                        <td>05 Oct, 2021</td>
                                                        <td>$25.03</td>
                                                        <td><span className="badge bg-success">Completed</span></td>
                                                        <td>
                                                            <button type="button" className="btn btn-sm btn-light">Details</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <div className="d-none code-view">
                                                <pre className="language-markup" style={{ "height": "275px" }}>
                                                    <code>
                                                        <StripedColumnsTables />
                                                    </code>
                                                </pre>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </TabPane>
                                <TabPane tabId="8" id="v-pills-tablesetting">

                                    <Card>
                                        <CardHeader>
                                            <h5 className="mb-0 text-primary">Connect Stripe</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col xl={2} className="mb-3">
                                                    <img src={powered_by_stripe} className="img img-responsive img-powered-by-stripe" alt="powered-by-stripe" />
                                                </Col><br />
                                                <Col xl={12}>
                                                    <UncontrolledAlert color="success" className="alert-label-icon rounded-label">
                                                        <i className="ri-notification-off-line label-icon"></i><strong>Connected! Your Stripe account is connected to Onexfort</strong>
                                                    </UncontrolledAlert>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>

                                </TabPane>
                                <TabPane tabId="9" id="v-pills-quickfee">

                                    <Card>
                                        <CardHeader><h5 className="text-brown">Connect Quick Fee</h5> </CardHeader>

                                        <CardBody>
                                            <img src={quickfee} className="img img-responsive mb-3" width="150px" alt="powered-by-quickfee"></img>
                                            <p><span> <p>For processing payments on Onexfort using QuickFee, you should create your own QuickFee account and connect your QuickFee account to Onexfort.</p>
                                                <p>QuickFee offers pay-in-full and Buy Now Pay Later options.</p>

                                                <p>1 - All payments processed will be directly deposited into your bank account by QuickFee.</p>

                                                <p>2 - Onexfort does not store any credit card details of your customers.</p></span></p>
                                            <hr></hr>

                                            <span > <p>If you don't have a QuickFee account, please contact them here:</p>
                                                <a className="text-info" href="https://quickfee.com.au/solutions/instalments/apply/">https://quickfee.com.au/solutions/instalments/apply/</a></span>

                                        </CardBody>

                                    </Card>
                                </TabPane>
                                <TabPane tabId="10" id="v-pills-quickfee">

                                    <Card>
                                        <CardHeader>
                                            <h5 className="mb-0 text-brown">Connect XERO</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <img src={connectXero} className="img img-responsive img-powered-by-stripe " alt="Connect XERO" />
                                            <p><span style={{ color: "black" }}>  <p>Connect XERO and Onexfort will automatically add invoices, payments & customers to your XERO account.
                                                When you click connect, a XERO window will open. There are following quick steps to do there
                                            </p>

                                                <p>1 - Login to your XERO account</p>
                                                <p>2 - Select the organization you want to sync with Onexfort</p>
                                                <p>3 - Authorize the connection to Onexfort</p>
                                                <p>4 - XERO accounts configuration</p></span></p>


                                        </CardBody>
                                        <CardHeader>

                                        </CardHeader>
                                        <CardBody>
                                            <Button color="info"  > Connect with Xero </Button>
                                        </CardBody>

                                    </Card>

                                </TabPane>
                                <TabPane tabId="11" id="v-pills-quickfee">

                                    <Card>
                                        <CardHeader>
                                            <h5 className="mb-0 text-primary">Connect MYOB</h5>
                                        </CardHeader>
                                        <CardBody>

                                            <img src={connectmyob} className="img img-responsive img-powered-by-stripe" alt="Connect MYOB" />
                                            <p><span  >Connect MYOB and Onexfort will automatically add invoices, payments & customers to your MYOB account.
                                                When you click connect, a MYOB window will open. There are following quick steps to do there<p>
                                                    1- Login to your MYOB account
                                                </p><p>2- Select the organization you want to sync with Onexfort</p>
                                                <p>3- Authorize the connection to Onexfort</p>
                                                <p>4- MYOB accounts configuration</p>
                                            </span></p>

                                        </CardBody>
                                        <CardHeader>

                                        </CardHeader>
                                        <CardBody>    <Button color="success">  Connect</Button></CardBody>

                                    </Card>

                                </TabPane>
                                <TabPane tabId="12" id="v-pills-email">

                                    <Card>
                                        <CardHeader>
                                            <h5 className="mb-0 text-primary">Configure Email Settings</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="mb-3">
                                                <Col lg={4}>
                                                    <h5 >Email server Created</h5>
                                                </Col>
                                                <Col lg={3}>
                                                    <i className="bx bxs-check-circle check-icon"></i>
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <Col lg={4}>
                                                    <h5 >Domain</h5>
                                                </Col>
                                                <Col lg={3}>
                                                    <i className="bx bxs-check-circle check-icon"></i>
                                                </Col>
                                            </Row>

                                            <Col lg={6}>
                                                <div className="input-group mb-4">
                                                    <Input type="text" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" placeholder="Your website domain here" />
                                                    <button className="btn btn-brown" type="button" disabled >Configure Domain</button>

                                                </div>
                                            </Col>
                                            <h5 >DNS Setting</h5>

                                            <p>Head over to DNS provider and add the following records to verify your domain for sending emails through Onexfort.</p>
                                            <p>ReturnPathDomain </p>

                                            <div className="live-preview">

                                                <Table className="table table-bordered table-nowrap align-middle">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th ></th>
                                                            <th >Hostname</th>
                                                            <th >Type</th>
                                                            <th >Add this value</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>DKIM<br /><span className="badge bg-success">Active</span></td>
                                                            <td> 20210119064148pm._domainkey.schoolboard.com.au</td>
                                                            <td>TXT</td>
                                                            <td>
                                                                k=rsa;p=MIGfM
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Return-Pat</td>
                                                            <td>pm-bounces.schoolboard.com.au</td>
                                                            <td>CNAME</td>
                                                            <td>
                                                                pm.mtasv.net
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>

                                            </div>
                                            <div className="mb-4">
                                                <p>Help Article: Resources for adding DNS records for common hosts and DNS providers</p>
                                            </div>

                                            <h5>Default Email For Communication</h5>
                                            <Col lg={6}>
                                                <div className="input-group mb-4">
                                                    <Input type="text" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" placeholder="info@schoolboard.com.au" />
                                                    <button className="btn btn-success" type="button" id="button-addon2" >Update</button>
                                                </div>
                                            </Col>

                                            <h5>Email Forwarding</h5>
                                            <p>Head over to your Email service provider and set up to forward a copy of the email received as follows:</p>
                                            <p>
                                                info@schoolboard.com.au&nbsp; &nbsp; &nbsp;
                                                <b>forward a copy to</b>
                                                &nbsp; &nbsp; &nbsp;
                                                a23e24beed8df159e52436319bb3398b@inbound.postmarkapp.com
                                            </p>
                                            <p> Help Article:<a className="text-info" href="Configuring email forwarding in Gmail/Google Apps"> Configuring email forwarding in Gmail/Google Apps</a></p>

                                        </CardBody>
                                    </Card>
                                </TabPane>
                                <TabPane tabId="13" id="v-pills-tablesetting">

                                    <Card>
                                        <CardHeader> <Row>
                                            <Col md={10} className="paymentCredHead"><h5 className="mb-0 text-primary">Connect CoverFreight</h5></Col>
                                            <Col md={2}><Button className="btn btn-success"> Disconnect  </Button></Col>
                                        </Row></CardHeader>

                                        <CardBody>
                                            <img src={connectcover} className="img img-responsive img-powered-by-stripe" alt="Connect CoverFreight" />
                                            <p>CoverFreight provides Comprehensive Moving Insurance for household goods and personal effects. The insurance provides cover for accidental damage to household and personal goods in transit.</p>

                                        </CardBody>
                                    </Card>

                                </TabPane>
                                <TabPane tabId="14" id="v-pills-PagePersonalisation">
                                    <Card>
                                        <CardBody>
                                            <Table className="table table-bordered table-nowrap align-middle mb-3">
                                                <thead>
                                                    <tr>
                                                        <th style={{ backgroundColor: '#d3d3d3' }} >
                                                            Page Name
                                                        </th>
                                                        <th style={{ backgroundColor: '#d3d3d3' }}>Description</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <a href="">Opportunities List Page</a>
                                                        </td>
                                                        <td>CRM | Opportunities</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <a href="">Jobs List Page</a>
                                                        </td>
                                                        <td>Removals | Jobs - List Jobs</td>
                                                    </tr>
                                                </tbody>

                                            </Table>
                                        </CardBody>

                                    </Card>

                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Removalsettings;