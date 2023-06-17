import { Button, Card, CardBody, CardFooter, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane, UncontrolledTooltip } from "reactstrap";
import Dragula from 'react-dragula';
import classnames from "classnames";
import { Link } from 'react-router-dom';
import React, { useEffect, useState, useCallback, useMemo } from "react";

import { isEmpty } from "lodash";
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
import DeleteModal from "../../Components/Common/DeleteModal";

//Import actions
import {
    getContacts as onGetContacts,
    addNewContact as onAddNewContact,
    updateContact as onUpdateContact,
    deleteContact as onDeleteContact,
} from "../../store/actions";

//import action
import {
    getTodos as onGetTodos,
    updateTodo as onupdateTodo,
    deleteTodo as onDeleteTodo,
    addNewTodo as onAddNewTodo,

    getProjects as onGetProjects,
    addNewProject as onAddNewProject,
} from "../../store/actions";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
const Status = ({ status }) => {
    switch (status) {
        case "New":
            return <span className="badge badge-soft-info text-uppercase">{status}</span>;
        case "Pending":
            return <span className="badge badge-soft-warning text-uppercase">{status}</span>;
        case "Inprogress":
            return <span className="badge badge-soft-secondary text-uppercase">{status}</span>;
        case "Completed":
            return <span className="badge badge-soft-success text-uppercase">{status}</span>;
        default:
            return <span className="badge badge-soft-success text-uppercase">{status}</span>;
    }
};

const CRMSettings = () => {

    const [modal_standard, setmodal_standard] = useState(false);
    const [modal_opportunity, setmodal_opportunity] = useState(false);
    function tog_standard() {
        setmodal_standard(!modal_standard);
    }
    function tog_opportunity() {
        setmodal_opportunity(!modal_opportunity);
    }
    // Export Modal
    const [isExportCSV, setIsExportCSV] = useState(false);
    // Vertical Nav Tabs
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

    const [modal_sequence, setmodal_sequence] = useState(false);

    function tog_sequenceModal() {
        setmodal_sequence(!modal_sequence);
    }
    const [modal_sms, setmodal_sms] = useState(false);

    function tog_smsModal() {
        setmodal_sms(!modal_sms);
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


    // Customber Column
    const columns = useMemo(
        () => [

            {
                Header: "Email Template Name",
                accessor: "name",
                filterable: false,

            },
            {
                Header: "Company Name",
                accessor: "company",
                filterable: false,
            },

            {
                Header: "Status",
                accessor: "lead_score",
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

    //sms column
    const smscolumn = useMemo(
        () => [
            {
                Header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
                Cell: (cellProps) => {
                    return <input type="checkbox" className="contactCheckBox form-check-input" value={cellProps.row.original._id} onChange={() => deleteCheckbox()} />;
                },
                id: '#',
            },
            {
                Header: "SMS Template Name",
                accessor: "name",
                filterable: false,

            },
            {
                Header: "Company Name",
                accessor: "company",
                filterable: false,
            },

            {
                Header: "Status",
                accessor: "lead_score",
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
    //email and sms temp
    const emailsmscolumn = useMemo(
        () => [
            {
                Header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
                Cell: (cellProps) => {
                    return <input type="checkbox" className="contactCheckBox form-check-input" value={cellProps.row.original._id} onChange={() => deleteCheckbox()} />;
                },
                id: '#',
            },
            {
                Header: "Email & SMS Sequence Name",
                accessor: "name",
                filterable: false,

            },
            {
                Header: "Description",
                accessor: "company",
                filterable: false,
            },

            {
                Header: "Status",
                accessor: "lead_score",
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
                                }}><i className="bx bxs-pencil fs-12 pt-1"></i>
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

    //modalv large
    const [modal_large, setmodal_large] = useState(false);

    function tog_large() {
        setmodal_large(!modal_large);
    }

    const { todos, projects } = useSelector((state) => ({
        todos: state.Todos.todos,
        projects: state.Todos.projects,
    }));


    const [taskList, setTaskList] = useState([]);

    // Projects
    const [modalProject, setModalProject] = useState(false);

    useEffect(() => {
        dispatch(onGetProjects());
    }, [dispatch]);

    const [todo, setTodo] = useState(null);
    useEffect(() => {
        dispatch(onGetTodos());
    }, [dispatch]);

    useEffect(() => {
        setTodo(todos);
        setTaskList(todos);
    }, [todos]);

    // Toggle Project Modal
    const toggleProject = () => {
        if (modalProject) {
            setModalProject(false);
        } else {
            setModalProject(true);
        }
    };
    // Update To do
    const handleTodoClick = useCallback((arg) => {
        const todo = arg;

        setTodo({
            id: todo.id,
            task: todo.task,
            dueDate: todo.dueDate,
            status: todo.status,
            priority: todo.priority,
        });

        setIsEdit(true);
        toggle();
    }, [toggle]);

    // Delete To do
    const onClickTodoDelete = (todo) => {
        setTodo(todo);
        setDeleteModal(true);
    };
    // validation
    const projectValidation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            title: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Please Enter Project Title"),
        }),
        onSubmit: (values) => {
            const newProjectData = {
                id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                title: values.title,
                subItem: [{ id: 1, version: "v1.0.0", iconClass: "danger" }]
            };
            // save new Project Data
            dispatch(onAddNewProject(newProjectData));
            projectValidation.resetForm();
            toggleProject();
        },
    });
    const dragulaDecorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
            let options = {};
            Dragula([componentBackingInstance], options);
        }
    };
    document.title = "Admin Panel | Onexfort";
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
                    <BreadCrumb title="CRM Settings" pageTitle="Onexfort" />


                    <Row>
                        <Col xl={3}>
                            <Card>
                                <CardBody><Nav pills className="flex-column" id="v-pills-tab">
                                    <h6 className="mb-3 text-primary">Communication</h6>
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

                                        ><i className='bx bx-mail-send'></i>
                                            <span> Email Templates</span>

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

                                            <i className='bx bx-message-dots'></i>
                                            <span> SMS Templates</span>

                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                "mb-0": true,
                                                active: verticalTab === "3",
                                            })}
                                            onClick={() => {
                                                toggleVertical("3");
                                            }}
                                            id="v-pills-messages-tab"
                                        >
                                            <i className='bx bxs-inbox'></i>
                                            <span> Email and SMS Sequences</span>


                                        </NavLink>
                                    </NavItem>
                                    <hr></hr>
                                    <h6 className="mb-3 text-primary">Customisation</h6>
                                    <NavItem>
                                        <NavLink
                                            style={{ cursor: "pointer" }}
                                            className={classnames({
                                                active: verticalTab === "4",
                                            })}
                                            onClick={() => {
                                                toggleVertical("4");
                                            }}
                                            id="v-pills-settings-tab"
                                        >
                                            <i className='bx bx-file'></i>
                                            <span> Statuses</span>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                </CardBody>
                            </Card>

                        </Col>
                        <Col xl={9}>
                            <TabContent
                                activeTab={verticalTab}
                                className="text-muted mt-4 mt-md-0"
                                id="v-pills-tabContent"
                            >
                                <TabPane tabId="1" id="v-pills-home">
                                    <Card>
                                        <CardHeader>
                                            <div className="d-flex align-items-center flex-wrap gap-2">
                                                <div className="flex-grow-1">
                                                    <button
                                                        className="btn btn-brown add-btn"
                                                        onClick={() => {
                                                            tog_large();
                                                        }}
                                                    >
                                                        <i className="ri-add-fill me-1 align-bottom"></i> Add
                                                        Email Template
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
                                                <Modal id="showModal" size="lg"
                                                    isOpen={modal_large}
                                                    toggle={() => {
                                                        tog_large();
                                                    }}>
                                                    <ModalHeader className="bg-soft-primary p-3">
                                                        <h5 className="text-black mb-0">Create Email Template</h5>
                                                    </ModalHeader>

                                                    <Form className="tablelist-form" onSubmit={(e) => {
                                                        e.preventDefault();
                                                        validation.handleSubmit();
                                                        return false;
                                                    }}>
                                                        <ModalBody>
                                                            <Input type="hidden" id="id-field" />
                                                            <Row>
                                                                <Col lg={12} className="mb-3">
                                                                    <div>
                                                                        <Label
                                                                            htmlFor="name-field"
                                                                            className="form-label"
                                                                        >
                                                                            Email Template Name
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
                                                                <Col lg={12} className="mb-3">
                                                                    <Label
                                                                        htmlFor="designation-field"
                                                                        className="form-label"
                                                                    >
                                                                        Company Name
                                                                    </Label>
                                                                    <select className="form-select" aria-label="Default select example">
                                                                        <option >Onexfort</option>
                                                                        <option defaultValue="1">Box Removals</option>
                                                                        <option defaultValue="2">Delivery Error</option>
                                                                        <option defaultValue="3">Wrong Amount</option>
                                                                    </select>
                                                                </Col>
                                                                <Col lg={12} className="mb-3">
                                                                    <div>
                                                                        <Label
                                                                            htmlFor="designation-field"
                                                                            className="form-label"
                                                                        >
                                                                            From Email
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
                                                                <Col lg={12} className="mb-3">
                                                                    <div>
                                                                        <Label
                                                                            htmlFor="email_id-field"
                                                                            className="form-label"
                                                                        >
                                                                            From Email ID
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
                                                                <Col lg={12} className="mb-3">
                                                                    <div>
                                                                        <Label
                                                                            htmlFor="phone-field"
                                                                            className="form-label"
                                                                        >
                                                                            Email SUbject
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
                                                                <Col lg={12} className="mb-3">
                                                                    <div>
                                                                        <Label
                                                                            htmlFor="lead_score-field"
                                                                            className="form-label"
                                                                        >
                                                                            Email Body
                                                                        </Label>

                                                                        <CKEditor
                                                                            editor={ClassicEditor}
                                                                            data="<p>Hello!</p>"
                                                                            onReady={(editor) => {
                                                                                // You can store the "editor" and use when it is needed.

                                                                            }}
                                                                            onChange={(editor) => {
                                                                                editor.getData();
                                                                            }}
                                                                        />
                                                                        {validation.touched.lead_score && validation.errors.lead_score ? (
                                                                            <FormFeedback type="invalid">{validation.errors.lead_score}</FormFeedback>
                                                                        ) : null}
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row  >
                                                                <Col lg={4} className="mb-3">
                                                                    <Label className="form-check-label" for="flexSwitchCheckChecked">Attach Quote</Label>
                                                                    <div className="form-check form-switch form-switch-md">
                                                                        <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />

                                                                    </div>
                                                                </Col>
                                                                <Col lg={4} className="mb-3">
                                                                    <Label className="form-check-label" for="flexSwitchCheckChecked">Attach Invoice</Label>
                                                                    <div className="form-check form-switch form-switch-md">
                                                                        <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />

                                                                    </div>
                                                                </Col>
                                                                <Col lg={4} className="mb-3">
                                                                    <Label className="form-check-label" for="flexSwitchCheckChecked">Attach WOrk Order</Label>
                                                                    <div className="form-check form-switch form-switch-md">
                                                                        <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />

                                                                    </div>
                                                                </Col>
                                                                <Col lg={4} className="mb-3">
                                                                    <Label className="form-check-label" for="flexSwitchCheckChecked">Attach Insurance Quote</Label>
                                                                    <div className="form-check form-switch form-switch-md">
                                                                        <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />

                                                                    </div>
                                                                </Col>
                                                                <Col lg={4} className="mb-3">
                                                                    <Label className="form-check-label" for="flexSwitchCheckChecked">Attach Proof of Delivery</Label>
                                                                    <div className="form-check form-switch form-switch-md">
                                                                        <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />

                                                                    </div>
                                                                </Col>
                                                                <Col lg={4} className="mb-3">
                                                                    <Label className="form-check-label" for="flexSwitchCheckChecked">Attach Storage Invoice</Label>
                                                                    <div className="form-check form-switch form-switch-md">
                                                                        <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />

                                                                    </div>
                                                                </Col>
                                                                <Col lg={4} className="mb-3" >
                                                                    <Label className="form-check-label" for="flexSwitchCheckChecked">Attach Inventory List</Label>
                                                                    <div className="form-check form-switch form-switch-md">
                                                                        <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />

                                                                    </div>
                                                                </Col>
                                                                <hr></hr>
                                                                <Col lg={4} >
                                                                    <Label className="form-check-label" for="flexSwitchCheckChecked">Active</Label>
                                                                    <div className="form-check form-switch form-switch-md">
                                                                        <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" defaultChecked />

                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </ModalBody>
                                                        <ModalFooter className="justify-content-center">
                                                            <div className="hstack gap-2">
                                                                <button type="submit" className="btn btn-success" id="add-btn" > Save </button>
                                                                <button type="button" className="btn btn-danger"
                                                                    onClick={() => { tog_large() }} > Cancel </button>

                                                            </div>
                                                        </ModalFooter>
                                                    </Form>
                                                </Modal>
                                                <ToastContainer closeButton={false} limit={1} />
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
                                                        onClick={() => tog_smsModal()}
                                                    >
                                                        <i className="ri-add-fill me-1 align-bottom"></i> Add
                                                        SMS Template
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
                                                <Modal
                                                    size="lg"
                                                    isOpen={modal_sms}
                                                    toggle={() => {
                                                        tog_smsModal();
                                                    }}
                                                >
                                                    <Card>
                                                        <ModalHeader className="bg-soft-primary p-3">
                                                            <h5 className="mb-0 text-black"> Create SMS Template</h5>

                                                        </ModalHeader>
                                                        <CardBody>
                                                            <Row className="mb-3">
                                                                <Col md={12}>
                                                                    <Label>SMS Template Name</Label>
                                                                    <Input></Input>
                                                                </Col>
                                                            </Row>

                                                            <Row className="mb-3">
                                                                <Col md={12}>
                                                                    <Label >Company Name</Label>
                                                                    <select className="form-select" aria-label="Default select example">
                                                                        <option >Onexfort</option>
                                                                        <option defaultValue="1">Box Removals
                                                                        </option>
                                                                    </select>
                                                                </Col>
                                                            </Row>
                                                            <Row className="mb-3">
                                                                <Col md={12}>
                                                                    <Label htmlFor="VertimeassageInput" className="form-label">SMS Message</Label>
                                                                    <textarea className="form-control" id="VertimeassageInput" rows="3" placeholder="Enter your message">
                                                                    </textarea>
                                                                </Col>
                                                            </Row>
                                                            <Row className="mb-3">
                                                                <Col md={6}>
                                                                    <Label>Attach Quote</Label>
                                                                    <div className="form-check form-switch form-switch-md">
                                                                        <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />

                                                                    </div>
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Label>Attach Invoice</Label>
                                                                    <div className="form-check form-switch form-switch-md">
                                                                        <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />

                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row className="mb-3">
                                                                <Col md={6}>
                                                                    <Label>Active</Label>
                                                                    <div className="form-check form-switch form-switch-md">
                                                                        <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />

                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                            <Row >
                                                                <Col md={6}>
                                                                    <Label>Available Dynamic Fields</Label>
                                                                    <p> SOme random stuffs here </p>
                                                                </Col>

                                                            </Row>

                                                        </CardBody>
                                                    </Card>

                                                    <ModalFooter className="justify-content-center">
                                                        <Button className="btn btn-success">Save</Button>

                                                        <Button className="btn btn-danger" onClick={() => { tog_smsModal() }}>Cancel</Button>
                                                    </ModalFooter>

                                                </Modal>
                                                <ToastContainer closeButton={false} limit={1} />
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </TabPane>
                                <TabPane tabId="3" id="v-pills-messages">
                                    <Card>
                                        <CardHeader>
                                            <div className="d-flex align-items-center flex-wrap gap-2">
                                                <div className="flex-grow-1">
                                                    <button
                                                        className="btn btn-brown add-btn"
                                                        onClick={() => tog_sequenceModal()}
                                                    >
                                                        <i className="ri-add-fill me-1 align-bottom"></i> Add
                                                        Sequence
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
                                    <Modal
                                        size="xl"
                                        isOpen={modal_sequence}
                                        toggle={() => {
                                            tog_sequenceModal();
                                        }}
                                    >

                                        <Card>
                                            <ModalHeader className="bg-soft-primary p-3">
                                                <h5 className="mb-0 text-black"> Add Email & SMS Sequence</h5>
                                            </ModalHeader>
                                            <CardBody>
                                                <Row className="mb-3">
                                                    <Col md={12}>
                                                        <Label>Email & SMS Sequence Name</Label>
                                                        <Input></Input>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col md={12}>
                                                        <Label htmlFor="VertimeassageInput" className="form-label">Description</Label>
                                                        <textarea className="form-control" id="VertimeassageInput" rows="3" placeholder="Enter your message">
                                                        </textarea>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col md={12}>
                                                        <Label >Company Name</Label>
                                                        <select className="form-select" aria-label="Default select example">
                                                            <option >Onexfort</option>
                                                            <option defaultValue="1">Box Removals
                                                            </option>
                                                        </select>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col md={6}>
                                                        <Label>Is Opportunity?</Label>
                                                        <div className="form-check form-switch form-switch-md">
                                                            <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />

                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Label>System Job Type</Label>
                                                        <select className="form-select" aria-label="Default select example">
                                                            <option >Moving</option>
                                                        </select>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col md={6}>
                                                        <Label>Date CHeck</Label>
                                                        <select className="form-select" aria-label="Default select example">
                                                            <option >Status Date</option>
                                                            <option >Job Date</option>
                                                        </select>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col md={6}>
                                                        <Label>Status Date:Send Email after number of days</Label>
                                                        <Input></Input>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col md={6}>
                                                        <Label>Initial Status</Label>
                                                        <select className="form-select" aria-label="Default select example">
                                                            <option >New</option>
                                                            <option >Confirmed</option>
                                                            <option >Quoted</option>
                                                            <option >Operations</option>
                                                            <option >Deleted</option>
                                                            <option >On Hold</option>
                                                        </select>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Label>Post Status</Label>
                                                        <select className="form-select" aria-label="Default select example">
                                                            <option >New</option>
                                                            <option >Confirmed</option>
                                                            <option >Quoted</option>
                                                            <option >Operations</option>
                                                            <option >Deleted</option>
                                                            <option >On Hold</option>
                                                        </select>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col md={6}>
                                                        <Label>Send Email</Label>
                                                        <div className="form-check form-switch form-switch-md">
                                                            <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />

                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Label>Send SMS</Label>
                                                        <div className="form-check form-switch form-switch-md">
                                                            <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />

                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col md={6}>
                                                        <Label>Email Templates</Label>
                                                        <select className="form-select" aria-label="Default select example">
                                                            <option >Your Quote Is Ready</option>
                                                            <option >Inventory PDF Attached</option>
                                                            <option >Your Move is in 2 Days</option>
                                                            <option >Follow up 1 - Box Removals</option>
                                                            <option >Your Invoice is Ready</option>
                                                            <option >Proof of Delivery</option>
                                                            <option >Insurance Quote</option>
                                                        </select>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Label>SMS Templates</Label>
                                                        <select className="form-select" aria-label="Default select example">
                                                            <option >Follow Up</option>
                                                        </select>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col md={6}>
                                                        <Label>
                                                            From Email
                                                        </Label>
                                                        <Input type="email" placeholder="contact@yourcopmany.com"></Input>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Label>
                                                            From Number/Name
                                                        </Label>
                                                        <Input></Input>
                                                    </Col>

                                                </Row>
                                                <Row >
                                                    <Col md={6}>
                                                        <Label>From Email Name</Label>
                                                        <Input type="email" placeholder="contact@yourcopmany"></Input>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Label>Send Email</Label>
                                                        <div className="form-check form-switch form-switch-md">
                                                            <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />

                                                        </div>
                                                    </Col>
                                                </Row>

                                            </CardBody>
                                        </Card>

                                        <ModalFooter className="justify-content-center">
                                            <Button className="btn btn-success">Save</Button>

                                            <Button className="btn btn-danger" onClick={() => { tog_sequenceModal() }}>Cancel</Button>
                                        </ModalFooter>

                                    </Modal>
                                    <Col xxl={12}>
                                        <Card id="contactList">
                                            <CardBody className="pt-0">
                                                <div>
                                                    {isContactSuccess && crmcontacts.length ? (
                                                        <TableContainer
                                                            columns={emailsmscolumn}
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


                                                <ToastContainer closeButton={false} limit={1} />
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </TabPane>
                                <TabPane tabId="4" id="v-pills-settings">
                                    <Card>
                                        <CardHeader>
                                            <Row>
                                                <Col lg={11}>
                                                    <h5>Lead Statuses</h5>
                                                    <p>Lead Statuses represent a Lead's current relation to your company.</p>
                                                </Col>
                                                <Col lg={1}>
                                                    <Button className="btn btn-success" onClick={() => tog_standard()}>Add</Button>
                                                </Col>
                                            </Row>
                                        </CardHeader>
                                        <Modal id="leadModal"
                                            isOpen={modal_standard}
                                            toggle={() => {
                                                tog_standard();
                                            }}
                                        >
                                            <ModalHeader className="bg-soft-primary p-3">
                                                <h5 className="text-black mb-0">New Lead Status</h5>
                                            </ModalHeader>

                                            <ModalBody>
                                                <Label >Lead Status</Label>
                                                <Row>
                                                    <Col md={6}>
                                                        <Input></Input>
                                                    </Col>
                                                    <Col md={2}>
                                                        <div>

                                                            <Input type="color" className="form-control form-control-color w-100" id="colorPicker" defaultValue="#364574" />
                                                        </div>
                                                    </Col>
                                                </Row>


                                            </ModalBody>
                                            <ModalFooter className="bg-light pt-2 pb-2">
                                                <Button
                                                    color="light"
                                                    onClick={() => {
                                                        tog_standard();
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    color="success"
                                                >
                                                    Save
                                                </Button>
                                            </ModalFooter>
                                        </Modal>
                                        <CardBody>
                                            <div className="table-responsive">
                                                <table className="table align-middle position-relative table-nowrap">
                                                    <thead className="table-active">
                                                        <tr>
                                                            <th></th>
                                                            <th scope="col">Status</th>

                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody id="task-list" ref={dragulaDecorator}>
                                                        {(taskList || []).map((item, key) => (<tr key={key}>
                                                            <td>
                                                                <div className="d-flex align-items-start">
                                                                    <div className="flex-shrink-0 me-3">
                                                                        <div className="task-handle px-1 bg-light rounded">: :
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </td>

                                                            <td>
                                                                <Status status={item.status} />
                                                            </td>

                                                            <td>
                                                                <div className="hstack gap-2">
                                                                    <button className="btn btn-sm btn-soft-danger remove-list" onClick={() => onClickTodoDelete(item)}>
                                                                        <i className="ri-delete-bin-5-fill align-bottom" />
                                                                    </button>
                                                                    <button className="btn btn-sm btn-soft-info edit-list" onClick={() => handleTodoClick(item)}>
                                                                        <i className="ri-pencil-fill align-bottom" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>))}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <Row>
                                                <Col lg={11}>
                                                    <h5>Opportunity Pipeline Statuses</h5>
                                                    <p>Opportunity Statuses describe each stage of deal in the sales process.</p>
                                                </Col>
                                                <Col lg={1}>
                                                    <Button className="btn btn-success" onClick={() => tog_opportunity()}>Add</Button>
                                                </Col>
                                            </Row>
                                        </CardHeader>
                                        <Modal id="pipelineModal"
                                            isOpen={modal_opportunity}
                                            toggle={() => {
                                                tog_opportunity();
                                            }}
                                        >
                                            <ModalHeader className="bg-soft-primary p-3">
                                                <h5 className="text-black mb-0">New Pipeline Status</h5>
                                            </ModalHeader>

                                            <ModalBody>

                                                <Row className="mb-3">
                                                    <Label >Pipeline Status</Label>
                                                    <Col md={6}>
                                                        <Input></Input>
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Label >Pipeline</Label>
                                                    <Col md={6}>
                                                        <select className="form-select mb-3" aria-label="Default select example">
                                                            <option >Active</option>
                                                            <option defaultValue="1">Won</option>
                                                            <option defaultValue="2">Lost</option>

                                                        </select>
                                                    </Col>
                                                </Row>
                                            </ModalBody>

                                            <ModalFooter className="bg-light pt-2 pb-2">
                                                <Button
                                                    color="light"
                                                    onClick={() => {
                                                        tog_opportunity();
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    color="success"
                                                >
                                                    Save
                                                </Button>
                                            </ModalFooter>
                                        </Modal>
                                        <CardBody>
                                            <div className="table-responsive">
                                                <table className="table align-middle position-relative table-nowrap">
                                                    <thead className="table-active">
                                                        <tr>
                                                            <th></th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Status</th>

                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody id="task-list" ref={dragulaDecorator}>
                                                        {(taskList || []).map((item, key) => (<tr key={key}>
                                                            <td>
                                                                <div className="d-flex align-items-start">
                                                                    <div className="flex-shrink-0 me-3">
                                                                        <div className="task-handle px-1 bg-light rounded">: :
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="form-check">
                                                                    <label className="form-check-label" htmlFor={"todo" + item.id}>{item.task} </label>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Status status={item.status} />
                                                            </td>

                                                            <td>
                                                                <div className="hstack gap-2">
                                                                    <button className="btn btn-sm btn-soft-danger remove-list" onClick={() => onClickTodoDelete(item)}>
                                                                        <i className="ri-delete-bin-5-fill align-bottom" />
                                                                    </button>
                                                                    <button className="btn btn-sm btn-soft-info edit-list" onClick={() => handleTodoClick(item)}>
                                                                        <i className="ri-pencil-fill align-bottom" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>))}

                                                    </tbody>
                                                </table>
                                            </div>
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
export default CRMSettings;