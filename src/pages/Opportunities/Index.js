import React from 'react';
import "../../assets/scss/pages/_opportunities.scss";
import { useEffect, useState, useMemo, useCallback } from "react";
import {
    Card,
    CardBody,
    Col,
    Container,
    CardHeader,
    Nav,
    NavItem,
    NavLink,
    Row,
    Modal,
    ModalHeader,
    Form,
    TabContent,
    TabPane,
    ModalBody,
    Label,
    Input,
    FormFeedback
} from "reactstrap";
// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';

import * as moment from "moment";
import { Link } from "react-router-dom";
import Select from "react-select";
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import TableContainer from "../../Components/Common/TableContainer";
import DeleteModal from "../../Components/Common/DeleteModal";
import { isEmpty } from "lodash";
// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";

//Import actions
import {
    getOrders as onGetOrders,
    addNewOrder as onAddNewOrder,
    updateOrder as onUpdateOrder,
    deleteOrder as onDeleteOrder,
} from "../../store/ecommerce/action";

import Loader from "../../Components/Common/Loader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Opportunities = () => {
    const [modal, setModal] = useState(false);
    const [activeTab, setActiveTab] = useState("1");

    const dispatch = useDispatch();

    const tabChange = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const { orders, isOrderCreated, isOrderSuccess, error } = useSelector((state) => ({
        orders: state.Ecommerce.orders,
        isOrderCreated: state.Ecommerce.isOrderCreated,
        isOrderSuccess: state.Ecommerce.isOrderSuccess,
        error: state.Ecommerce.error,
    }));

    const [orderList, setOrderList] = useState([]);
    const [order, setOrder] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteModalMulti, setDeleteModalMulti] = useState(false);

    const handleDeleteOrder = () => {
        if (order) {
            dispatch(onDeleteOrder(order._id));
            setDeleteModal(false);
        }
    };

    useEffect(() => {
        setOrderList(orders);
    }, [orders]);

    useEffect(() => {
        if (!isEmpty(orders)) setOrderList(orders);
    }, [orders]);

    // validation
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            orderId: (order && order.orderId) || '',
            customer: (order && order.customer) || '',
            product: (order && order.product) || '',
            orderDate: (order && order.orderDate) || '',
            // ordertime: (order && order.ordertime) || '',
            amount: (order && order.amount) || '',
            payment: (order && order.payment) || '',
            status: (order && order.status) || '',
        },
        validationSchema: Yup.object({
            orderId: Yup.string().required("Please Enter order Id"),
            customer: Yup.string().required("Please Enter Customer Name"),
            product: Yup.string().required("Please Enter Product Name"),
            // orderDate: Yup.string().required("Please Enter Order Date"),
            // ordertime: Yup.string().required("Please Enter Order Time"),
            amount: Yup.string().required("Please Enter Total Amount"),
            payment: Yup.string().required("Please Enter Payment Method"),
            status: Yup.string().required("Please Enter Delivery Status")
        }),
        onSubmit: (values) => {
            if (isEdit) {
                const updateOrder = {
                    _id: order ? order._id : 0,
                    orderId: values.orderId,
                    customer: values.customer,
                    product: values.product,
                    orderDate: date,
                    // ordertime: values.ordertime,
                    amount: values.amount,
                    payment: values.payment,
                    status: values.status
                };
                // update order
                dispatch(onUpdateOrder(updateOrder));
                validation.resetForm();
            } else {
                const newOrder = {
                    _id: Math.floor(Math.random() * (30 - 20)) + 20,
                    orderId: values["orderId"],
                    customer: values["customer"],
                    product: values["product"],
                    orderDate: date,
                    // ordertime: values["ordertime"],
                    amount: values["amount"],
                    payment: values["payment"],
                    status: values["status"]
                };
                // save new order
                dispatch(onAddNewOrder(newOrder));
                validation.resetForm();
            }
            toggle();
        },
    });

    useEffect(() => {
        if (orders && !orders.length) {
            dispatch(onGetOrders());
        }
    }, [dispatch, orders]);

    useEffect(() => {
        setOrder(orders);
    }, [orders]);

    useEffect(() => {
        if (!isEmpty(orders)) {
            setOrder(orders);
            setIsEdit(false);
        }
    }, [orders]);


    const toggle = useCallback(() => {
        if (modal) {
            setModal(false);
            setOrder(null);
        } else {
            setModal(true);
            setDate(defaultdate());
        }
    }, [modal]);

    const handleOrderClicks = () => {
        setOrder("");
        setIsEdit(false);
        toggle();
    };

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
        const ele = document.querySelectorAll(".orderCheckBox");
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
            dispatch(onDeleteOrder(element.value));
            setTimeout(() => { toast.clearWaitingQueue(); }, 3000);
        });
        setIsMultiDeleteButton(false);
        checkall.checked = false;
    };

    const deleteCheckbox = () => {
        const ele = document.querySelectorAll(".orderCheckBox:checked");
        ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
        setSelectedCheckBoxDelete(ele);
    };


    // Customber Column
    const columns = useMemo(
        () => [

            {
                Header: "Opp#",
                accessor: "orderId",
                filterable: false,
                Cell: (cell) => {
                    return <Link to="/opportunitydetails" className="fw-medium link-primary">{cell.value}</Link>;
                },
            },
            {
                Header: "Lead",
                accessor: "customer",
                filterable: false,
            },
            {
                Header: "Mobile",
                accessor: "product",
                filterable: false,
            },
            {
                Header: "Pickup Suburb",
                accessor: "amount",
                filterable: false,
            },
            {
                Header: "Drop Off Suburb",
                accessor: "payment",
                filterable: false,
            },
            {
                Header: "Lead Info",
                accessor: "leadinfo",
                filterable: false,
            },
            {
                Header: "Job Date",
                accessor: "orderDate",
                Cell: (order) => (
                    <>
                        {handleValidDate(order.row.original.orderDate)},
                        <small className="text-muted"> {handleValidTime(order.row.original.orderDate)}</small>
                    </>
                ),
            },

            {
                Header: "Status",
                accessor: "_status",
                filterable: false,
            },

            {
                Header: "User",
                accessor: "user",
                filterable: false,
            },
            {
                Header: 'Lead Status',
                accessor: 'status',
                Cell: (cell) => {
                    switch (cell.value) {
                        case "Pending":
                            return <span className="badge text-uppercase badge-soft-warning"> {cell.value} </span>;
                        case "Cancelled":
                            return <span className="badge text-uppercase badge-soft-danger"> {cell.value} </span>;
                        case "Inprogress":
                            return <span className="badge text-uppercase badge-soft-secondary"> {cell.value} </span>;
                        case "Pickups":
                            return <span className="badge text-uppercase badge-soft-info"> {cell.value} </span>;
                        case "Returns":
                            return <span className="badge text-uppercase badge-soft-primary"> {cell.value} </span>;
                        case "Delivered":
                            return <span className="badge text-uppercase badge-soft-success"> {cell.value} </span>;
                        default:
                            return <span className="badge text-uppercase badge-soft-warning"> {cell.value} </span>;
                    }
                }
            },

            {
                Header: "Action",
                Cell: (cellProps) => {
                    return (
                        <ul className="list-inline hstack gap-2 mb-0">
                            <li className="list-inline-item">
                                <Link
                                    to="/opportunitydetails"
                                    className="text-success d-inline-block"
                                >
                                    <i className="ri-eye-fill fs-16"></i>
                                </Link>
                            </li>

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
        [handleOrderClick, checkedAll]
    );

    const defaultdate = () => {
        let d = new Date(),
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let h = (d.getHours() % 12) || 12;
        let ampm = d.getHours() < 12 ? "AM" : "PM";
        return ((d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear() + ", " + h + ":" + d.getMinutes() + " " + ampm).toString());
    };


    const [date, setDate] = useState(defaultdate());

    const handleValidDate = date => {
        const date1 = moment(new Date(date)).format("DD MMM Y");
        return date1;
    };

    const handleValidTime = (time) => {
        const time1 = new Date(time);
        const getHour = time1.getUTCHours();
        const getMin = time1.getUTCMinutes();
        const getTime = `${getHour}:${getMin}`;
        var meridiem = "";
        if (getHour >= 12) {
            meridiem = "PM";
        } else {
            meridiem = "AM";
        }
        const updateTime = moment(getTime, 'hh:mm').format('hh:mm') + " " + meridiem;
        return updateTime;
    };



    document.title = "Widgets | Onexfort";
    return (
        <React.Fragment>
            <div className="page-content">


                <DeleteModal
                    show={deleteModal}
                    onDeleteClick={handleDeleteOrder}
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
                    <BreadCrumb title="Opportunities" pageTitle="Onexfort" />
                    <Row>
                        <Col lg={12}>
                            <Card id="orderList">
                                <CardHeader className="card-header border-0">
                                    <Row className="align-items-center gy-3">
                                        <div className="col-sm">
                                            <h5 className="card-title mb-0">Search Filters</h5>
                                        </div>
                                        <div className="col-sm-auto">
                                            <div className="d-flex gap-1 flex-wrap">
                                                <button
                                                    type="button"
                                                    className="btn btn-brown add-btn"
                                                    id="create-btn"
                                                    onClick={() => { setIsEdit(false); toggle(); }}
                                                >
                                                    <i className="ri-add-line align-bottom me-1"></i> Create
                                                    Opportunity
                                                </button>{" "}

                                                {isMultiDeleteButton && <button className="btn btn-soft-danger"
                                                    onClick={() => setDeleteModalMulti(true)}
                                                ><i
                                                    className="ri-delete-bin-2-line"></i></button>}
                                            </div>
                                        </div>
                                    </Row>
                                </CardHeader>

                                <CardBody className="pt-0">
                                    <div>
                                        {isOrderSuccess && orderList.length ? (
                                            <TableContainer
                                                columns={columns}
                                                data={(orderList || [])}
                                                isGlobalFilter={true}
                                                isAddUserList={false}
                                                customPageSize={8}
                                                divClass="table-responsive table-card mb-1"
                                                tableClass="align-middle table-nowrap"
                                                theadClass="table-light text-muted text-uppercase"
                                                handleOrderClick={handleOrderClicks}
                                                isOrderFilter={true}
                                                SearchPlaceholder="Search for order ID, customer, order status or something..."
                                            />
                                        ) : (<Loader error={error} />)
                                        }

                                    </div>
                                    <Modal id="showModal" className="modal-dialog-edit" isOpen={modal} toggle={toggle} centered>
                                        <ModalHeader className="bg-soft-primary p-3" toggle={toggle}>
                                            {!!isEdit ? "Edit Order" : "New Opportunity"}
                                        </ModalHeader>
                                        <Form className="tablelist-form" onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                            return false;
                                        }}>
                                            <CardHeader>
                                                <Nav className="nav-tabs-custom rounded card-header-tabs justify-content-around border-bottom-0 mt-2"
                                                    role="tablist">
                                                    <NavItem>
                                                        <NavLink
                                                            className={classnames({ active: activeTab === "1" }, "text-body")}
                                                            onClick={() => {
                                                                tabChange("1");
                                                            }}>
                                                            <i className="fas fa-home"></i>
                                                            Residential
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink to="#"
                                                            className={classnames({ active: activeTab === "2" }, "text-body")}
                                                            onClick={() => {
                                                                tabChange("2");
                                                            }}
                                                            type="button">
                                                            <i className="far fa-user"></i>
                                                            Commercial
                                                        </NavLink>
                                                    </NavItem>

                                                </Nav>
                                            </CardHeader>
                                            <CardBody className="p-4">
                                                <TabContent activeTab={activeTab}>
                                                    <TabPane tabId="1">
                                                        <Form>
                                                            <Row>
                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Label htmlFor="nameInput" className="form-label">
                                                                            Name</Label>
                                                                        <Input type="text" className="form-control" id="nameInput"
                                                                            placeholder="Enter your firstname" defaultValue="" />
                                                                    </div>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Label htmlFor="mobile" className="form-label">Mobile</Label>
                                                                        <Input type="text" className="form-control" id="mobile"
                                                                            placeholder="Enter your lastname" defaultValue="" />
                                                                    </div>
                                                                </Col>

                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Label htmlFor="emailInput" className="form-label">Email
                                                                        </Label>
                                                                        <Input type="email" className="form-control" id="emailInput"
                                                                            placeholder="Enter your email"
                                                                            defaultValue="" />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Label className="form-label">Pickup Address </Label>  <Input type="checkbox" className="form-check-input" id="customSwitchsizelg" defaultChecked="" />  <Label>  Suburb</Label>
                                                                        <Input placeholder='Address'></Input>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Label htmlFor="dropoffAddress" className="form-label">
                                                                            Drop off Address</Label>
                                                                        <Input type="text" className="form-control" id="dropoffAddress"
                                                                            placeholder="Enter a location" />
                                                                    </div>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Label htmlFor="JoiningdatInput" className="form-label">Estimated Job
                                                                            Date</Label>
                                                                        <Flatpickr
                                                                            className="form-control"
                                                                            options={{
                                                                                dateFormat: "d M, Y"
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </Col>

                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Label htmlFor="leadInfo" className="form-label">Lead Info</Label>
                                                                        <select className="form-select mb-3">
                                                                            <option className='lead_dropdown' >Google</option>
                                                                            <option value="Choices1">Facebook</option>
                                                                            <option value="Choices2">Friend</option>
                                                                            <option value="Choices3">Return Customer</option>

                                                                        </select>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Label htmlFor="company" className="form-label">Company</Label>
                                                                        <select className="form-select mb-3">
                                                                            <option >Onexfort-VPS1</option>
                                                                            <option value="Choices1">Box Removals</option>

                                                                        </select>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Label htmlFor="opportunityType" className="form-label">Opportunity Type</Label>
                                                                        <select className="form-select mb-3">
                                                                            <option >Moving</option>
                                                                        </select>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Form>
                                                    </TabPane>
                                                    <TabPane tabId="2">
                                                        <Form>
                                                            <Row>
                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Label htmlFor="customer" className="form-label">Customer</Label>
                                                                        <select className="form-select mb-3">
                                                                            <option >Seq Test2-Company1</option>
                                                                            <option value="Choices1">Zia Akramy</option>
                                                                            <option value="Choices2">Harvey Norman</option>
                                                                            <option value="Choices3">Test Test023</option>
                                                                            <option value="Choices3">Te st</option>

                                                                        </select>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Label htmlFor="jobContactName" className="form-label">Job Contact Name</Label>
                                                                        <Input type="text" className="form-control" id="jobContactName"
                                                                            placeholder="Job Contact Name" defaultValue="" />
                                                                    </div>
                                                                </Col>

                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Label htmlFor="emailInputJob" className="form-label">Email
                                                                            (Job Contact)</Label>
                                                                        <Input type="email" className="form-control" id="emailInputJob"
                                                                            placeholder="Email"
                                                                            defaultValue="" />
                                                                    </div>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Label htmlFor="mobileJobContact" className="form-label">Mobile (Job Contact)</Label>
                                                                        <Input type="text" className="form-control" id="mobileJobContact"
                                                                            placeholder="Mobile" defaultValue="" />
                                                                    </div>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Label htmlFor="pickupAddress" className="form-label">
                                                                            Pickup Address</Label> <Input type="checkbox" ></Input>
                                                                        <Input type="text" className="form-control" id="pickupAddress"
                                                                            placeholder="Enter a location" />
                                                                    </div>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Label htmlFor="dropoffAddress" className="form-label">
                                                                            Drop off Address</Label>
                                                                        <Input type="text" className="form-control" id="dropoffAddress"
                                                                            placeholder="Enter a location" />
                                                                    </div>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Label htmlFor="JoiningdatInput" className="form-label">Estimated Job
                                                                            Date</Label>
                                                                        <Flatpickr
                                                                            className="form-control"
                                                                            options={{
                                                                                dateFormat: "d M, Y"
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row>

                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Label htmlFor="company" className="form-label">Company</Label>
                                                                        <select className="form-select mb-3">
                                                                            <option >Onexfort-VPS1</option>
                                                                            <option value="Choices1">Box Removals</option>

                                                                        </select>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={6}>
                                                                    <div className="mb-3">
                                                                        <Label htmlFor="opportunityType" className="form-label">Opportunity Type</Label>
                                                                        <select className="form-select mb-3">
                                                                            <option >Moving</option>
                                                                        </select>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </Form>


                                                    </TabPane>
                                                </TabContent>
                                            </CardBody>

                                            <div className="modal-footer">
                                                <div className="hstack gap-2 justify-content-end">
                                                    <button
                                                        type="button"
                                                        className="btn btn-light"
                                                        onClick={() => {
                                                            setModal(false);
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>

                                                    <button type="submit" className="btn btn-brown">
                                                        {!!isEdit
                                                            ? "Update"
                                                            : "Create Opportunity"}
                                                    </button>
                                                </div>
                                            </div>
                                        </Form>
                                    </Modal>
                                    <ToastContainer closeButton={false} limit={1} />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Opportunities;
