// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Label, Input, Accordion, AccordionItem, Collapse
} from 'reactstrap';

import classnames from "classnames";
import TableContainer from "../../Components/Common/TableContainer";
import Flatpickr from "react-flatpickr";

import Loader from "../../Components/Common/Loader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
//redux
import { useSelector, useDispatch } from "react-redux";
import * as moment from "moment";
import { Link } from "react-router-dom";
//Import actions
import {
    getOrders as onGetOrders,
    addNewOrder as onAddNewOrder,
    updateOrder as onUpdateOrder,
    deleteOrder as onDeleteOrder,
} from "../../store/ecommerce/action";
import DeleteModal from "../../Components/Common/DeleteModal";



const ListJobs = () => {
    const [col1, setcol1] = useState(false);
    const t_col1 = () => {
        setcol1(!col1);

    };


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
    const onClickDelete = (order) => {
        setOrder(order);
        setDeleteModal(true);
    };

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

    const toggleTab = (tab, type) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
            let filteredOrders = orders;
            if (type !== "all") {
                filteredOrders = orders.filter((order) => order.status === type);
            }
            setOrderList(filteredOrders);
        }
    };

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

    // Node API 
    // useEffect(() => {

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
                Header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
                Cell: (cellProps) => {
                    return <input type="checkbox" className="orderCheckBox form-check-input" value={cellProps.row.original._id} onChange={() => deleteCheckbox()} />;
                },
                id: '#',
            },
            {
                Header: "Job#",
                accessor: "orderId",
                filterable: false,
                Cell: (cell) => {
                    return <Link to="/listjobs/listjobsdetail" className="fw-medium link-primary">{cell.value}</Link>;
                },
            },
            {
                Header: "Customer Name",
                accessor: "customer",
                filterable: false,
            },
            {
                Header: "Job Date",
                accessor: "product",
                filterable: false,
            },
            {
                Header: "Email",
                accessor: "amount",
                filterable: false,
            },
            {
                Header: "Mobile",
                accessor: "payment",
                filterable: false,
            },
            {
                Header: "Pickup Suburb",
                accessor: "leadinfo",
                filterable: false,
            },
            {
                Header: "Drop off Suburb",
                accessor: "orderDate",
                Cell: (order) => (
                    <>
                        {handleValidDate(order.row.original.orderDate)},
                        <small className="text-muted"> {handleValidTime(order.row.original.orderDate)}</small>
                    </>
                ),
            },

            {
                Header: "Job Status",
                accessor: "_status",
                filterable: false,
            },

            {
                Header: "Payment Status",
                accessor: "user",
                filterable: false,
            },
            {
                Header: 'Balance',
                accessor: 'status',
                filterable: false,
            },

            {
                Header: "Action",
                Cell: (cellProps) => {
                    return (
                        <ul className="list-inline hstack gap-2 mb-0">

                            <li className="list-inline-item">
                                <Link
                                    to="#"
                                    className="text-danger d-inline-block remove-item-btn"
                                    onClick={() => {
                                        const orderData = cellProps.row.original;
                                        onClickDelete(orderData);
                                    }}
                                >
                                    <i className="ri-delete-bin-5-fill fs-16"></i>
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
                    <BreadCrumb title="ListJobs" pageTitle="Onexfort" />
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
                                        <Col md={4}>
                                            <div className="mb-3">
                                                <Label for="leadStatusinput" className="form-label">Job Status</Label>
                                                <select className="form-select mb-3" aria-label="Default select example">
                                                    <option >5 Selected </option>
                                                    <option defaultValue="1">New</option>
                                                    <option defaultValue="2">Confirmed</option>
                                                    <option defaultValue="3">Quoted</option>
                                                    <option defaultValue="4">Operations</option>
                                                    <option defaultValue="5">Deleted</option>
                                                    <option defaultValue="6">On Hold</option>
                                                    <option defaultValue="7">Confirmed</option>
                                                </select>
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="mb-3">
                                                <Label for="leadStatusinput" className="form-label">Payment Status</Label>
                                                <select className="form-select mb-3" aria-label="Default select example">
                                                    <option >None Selected </option>
                                                    <option defaultValue="1">All</option>
                                                    <option defaultValue="2">Unpaid</option>
                                                    <option defaultValue="3">Paid</option>
                                                    <option defaultValue="3">Partial</option>
                                                </select>
                                            </div>
                                        </Col>
                                        <Col lg={2}>
                                            <div className="form-check form-radio-pad form-check-right mb-2">
                                                <Input className="form-check-input" type="checkbox" name="formCheckboxRight" id="formCheckboxRight1" />
                                                <Label className="form-check-label" for="formCheckboxRight1">
                                                    Hide Deleted & Archived
                                                </Label>

                                            </div>
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
                                        <Col lg={2}>
                                            <div className="mb-3">
                                                <Label for="createdDateinput" className="form-label">Removal Date</Label>
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
                    <Card id="orderList">
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

                            <ToastContainer closeButton={false} limit={1} />
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ListJobs;
