import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    Card, CardBody, CardHeader, Col, Container, Row, Label, Input, Accordion, AccordionItem, Collapse
} from 'reactstrap';
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
const Invoices = () => {
    const [col1, setcol1] = useState(false);
    const t_col1 = () => {
        setcol1(!col1);

    };
    const [selectedMulti, setselectedMulti] = useState(null);

    function handleMulti(selectedMulti) {
        setselectedMulti(selectedMulti);
    }
    const jobOpt = [
        { value: "New", label: "New" },
        { value: "Confirmed", label: "Confirmed" },
        { value: "Quoted", label: "Quoted" },
        { value: "Operations", label: "Operations" },
        { value: "Deleted", label: "Deleted" },
        { value: "On Hold", label: "On Hold" }
    ];
    const invoiceOpt = [
        { value: "All", label: "All" },
        { value: "Unpaid", label: "Unpaid" },
        { value: "Paid", label: "Paid" },
        { value: "Partial", label: "Partial" }
    ]
    const { orders, isOrderCreated, isOrderSuccess, error } = useSelector((state) => ({
        orders: state.Ecommerce.orders,
        isOrderCreated: state.Ecommerce.isOrderCreated,
        isOrderSuccess: state.Ecommerce.isOrderSuccess,
        error: state.Ecommerce.error,
    }));
    const [modal, setModal] = useState(false);
    const [activeTab, setActiveTab] = useState("1");
    const tabChange = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };


    const dispatch = useDispatch();
    const [orderList, setOrderList] = useState([]);
    const [order, setOrder] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

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
                Header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
                Cell: (cellProps) => {
                    return <input type="checkbox" className="orderCheckBox form-check-input" value={cellProps.row.original._id} onChange={() => deleteCheckbox()} />;
                },
                id: '#',
            },
            {
                Header: "Invoice#",
                accessor: "orderId",
                filterable: false,
                Cell: (cell) => {
                    return <Link to="/apps-ecommerce-order-details" className="fw-medium link-primary">{cell.value}</Link>;
                },
            },
            {
                Header: "System Job Type",
                accessor: "customer",
                filterable: false,
            },
            {
                Header: "Job No",
                accessor: "product",
                filterable: false,
            },
            {
                Header: "Customer",
                accessor: "amount",
                filterable: false,
            },
            {
                Header: "Due Date",
                accessor: "payment",
                Cell: (order) => (
                    <>
                        {handleValidDate(order.row.original.orderDate)},
                        <small className="text-muted"> {handleValidTime(order.row.original.orderDate)}</small>
                    </>
                ),
            },
            {
                Header: "Issue Date",
                accessor: "leadinfo",
                Cell: (order) => (
                    <>
                        {handleValidDate(order.row.original.orderDate)},
                        <small className="text-muted"> {handleValidTime(order.row.original.orderDate)}</small>
                    </>
                ),
            },
            {
                Header: "Total",
                accessor: "orderDate",
                filterable: false,
            },

            {
                Header: "Payment Received",
                accessor: "_status",
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
                <Container fluid>
                    <BreadCrumb title="Invoices" pageTitle="Onexfort" />
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
                                                <Label htmlFor="choices-multiple-default" className="form-label text-muted">Job Status</Label>
                                                <Select
                                                    value={selectedMulti}
                                                    isMulti={true}
                                                    onChange={() => {
                                                        handleMulti();
                                                    }}
                                                    options={jobOpt}
                                                />
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="mb-3">
                                                <Label htmlFor="choices-multiple-default" className="form-label text-muted">Invoice Status</Label>
                                                <Select
                                                    value={selectedMulti}
                                                    isMulti={true}
                                                    onChange={() => {
                                                        handleMulti();
                                                    }}
                                                    options={invoiceOpt}
                                                />
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

                                        <Col lg={4}>
                                            <div className="text-start">
                                                <button type="submit" className="btn  btn-primary">Apply</button>
                                                <button type="submit" className="btn form-btn-marg btn-primary">Reset</button>
                                            </div>

                                        </Col>
                                    </Row>
                                </div>
                            </Collapse>
                        </AccordionItem>
                    </Accordion>
                    <Card>
                        <CardBody>
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
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Invoices;
