import React, { useEffect, useState } from 'react';

import { Col, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Row, UncontrolledDropdown, UncontrolledTooltip, UncontrolledCollapse, ButtonGroup, Button, UncontrolledButtonDropdown, Modal, ModalBody, ModalHeader, Input, Progress, Card, CardHeader, CardBody, Alert } from 'reactstrap';

import classnames from "classnames";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import FeatherIcon from 'feather-icons-react';
import DeleteModal from '../../Components/Common/DeleteModal';

//SimpleBar
import SimpleBar from "simplebar-react";

// Rating
import Rating from "react-rating";

// Import Images
import avatar1 from "../../assets/images/users/avatar-1.jpg";

import img2 from "../../assets/images/small/img-2.jpg";
import img6 from "../../assets/images/small/img-6.jpg";

import image2 from "../../assets/images/users/avatar-2.jpg";
import image4 from "../../assets/images/users/avatar-4.jpg";
import image3 from "../../assets/images/users/avatar-3.jpg";
import image5 from "../../assets/images/users/avatar-5.jpg";

import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

//redux
import { useSelector, useDispatch } from "react-redux";
import { getMailDetails, deleteMail } from '../../store/actions';

const EmailToolbar = () => {

    const dispatch = useDispatch();

    const { mailDetails, isLoader } = useSelector((state) => ({
        mailDetails: state.Mailbox.mailDetails,
        isLoader: state.Mailbox.isLoader,
    }));


    useEffect(() => {
        dispatch(getMailDetails());
    }, [dispatch]);

    const [mailList, setMailList] = useState([]);
    const [activeTabs, setActive] = useState("all");
    const [isLabelTab, setIsLabelTab] = useState("");
    const [isTypeTab, setIsTypeTab] = useState("emails");
    const [displayCategory, setCategory] = useState("all");
    const [displaytype, settype] = useState("all");
    const [displaylabel, setLabel] = useState("all");

    useEffect(() => {
        setMailList(mailDetails);
    }, [mailDetails]);

    const toggleTab = (ncategory, ntype, nlabel) => {
        var element = document.getElementById("mail-filter-navlist");
        if (ncategory === "all" || ncategory === "inbox") {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
        if (activeTabs !== ncategory) {
            setActive(ncategory);
        }
        if (isLabelTab !== nlabel) {
            setIsLabelTab(nlabel);
        }
        if (isTypeTab !== ntype) {
            setIsTypeTab(ntype);
        }
        setCategory(ncategory);
        settype(ntype);
        setLabel(nlabel);
    };

    // SideBar Open
    function sidebarOpen(value, ele) {
        const element = document.getElementsByTagName('body')[0];
        element.classList.add(value);
        ele.closest("li").classList.remove("unread");
    }

    // SideBar Close
    function sidebarClose(value) {
        const element = document.getElementsByTagName('body')[0];
        element.classList.remove(value);
    }

    useEffect(() => {
        sidebarClose("email-detail-show");
    }, []);

    // Chat Box
    const chatBox = (value) => {
        const element = document.getElementById("emailchat-detailElem");
        element.style.display = value;
    };

    const [modal, setModal] = useState(false);

    const toggle = () => {
        if (modal) {
            setModal(false);
        } else {
            setModal(true);
        }
    };

    // delete button toggle
    const onChangeCheckBox = (value, check) => {
        const element = document.getElementById("email-topbar-actions");
        const checkedCount = document.querySelectorAll('.checkbox-wrapper-mail input:checked').length;
        const activeList = document.getElementById(value);

        if (checkedCount >= 1) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }

        if (check) {
            activeList.classList.add("active");
        } else {
            activeList.classList.remove("active");
        }
    };

    // Checked All Email
    const checkedAll = () => {
        const checkall = document.getElementById("checkall");
        const element = document.querySelectorAll(".message-list li");
        const ele = document.getElementById("email-topbar-actions");
        ele.style.display = 'block';

        if (checkall.checked) {
            element.forEach((node) => {
                node.classList.add("active");
                node.firstChild.firstChild.firstChild.checked = true;
            });
        } else {
            ele.style.display = 'none';
            element.forEach((node) => {
                node.classList.remove("active");
                node.firstChild.firstChild.firstChild.checked = false;
            });
        }
    };


    // Delete Email
    const removeEmail = () => {
        const element = document.querySelectorAll(".message-list li");
        const ele = document.getElementById("email-topbar-actions");
        const checkall = document.getElementById("checkall");
        element.forEach((element) => {

            if (element.classList.contains('active')) {
                var forId = element.querySelector('.form-check-input').value;
                dispatch(deleteMail(forId));
            }
            element.classList.remove("active");
            element.querySelector('.form-check-input').checked = false;

        });
        checkall.checked = false;
        ele.style.display = 'none';
    };

    // Mark all as Read
    const readAll = () => {

        if (document.querySelectorAll(".message-list li.unread").length === 0) {
            document.getElementById("unreadConversations").style.display = "block";
            setTimeout(function () { document.getElementById("unreadConversations").style.display = "none"; }, 1000);
        }

        document.querySelectorAll(".message-list li.unread").forEach(function (element) {
            if (element.classList.contains("unread")) { element.classList.remove("unread"); }
        });
    };


    const favouriteBtn = (ele) => {
        if (ele.closest("button").classList.contains("active")) {
            ele.closest("button").classList.remove("active");
        } else {
            ele.closest("button").classList.add("active");
        }
    };

    const chatData = [
        { id: 1, img: image2, name: "Scott Median", caption: "Hello ! are you there?" },
        { id: 2, img: image4, name: "Julian Rosa", caption: "What about our next.." },
        { id: 3, img: image3, name: "David Medina", caption: "Yeah everything is fine" },
        { id: 4, img: image5, name: "Jay Baker", caption: "Wow that's great" },
    ];

    const [info, setInfo] = useState([]);

    const [emailinfo, setEmailinfo] = useState([]);

    //delete order
    const [deleteModal, setDeleteModal] = useState(false);

    return (
        <React.Fragment>
            <ToastContainer closeButton={false} />
            <DeleteModal
                show={deleteModal}
                onDeleteClick={() => {
                    removeEmail();
                    setDeleteModal(false);
                }}
                onCloseClick={() => setDeleteModal(false)}
            />
       

            <div className="email-content">
                <div className="p-4 pb-0">
                    <div className="border-bottom border-bottom-dashed">
                        <Row className="mt-n2 mb-3 mb-sm-0">
                            <Col className="col-sm-auto order-1 d-block d-lg-none">
                                <button type="button" className="btn btn-soft-success btn-icon btn-sm fs-16 email-menu-btn">
                                    <i className="ri-menu-2-fill align-bottom"></i>
                                </button>
                            </Col>
                            <div className="col-sm order-3 order-sm-2">
                                <div className="hstack gap-sm-1 align-items-center flex-wrap email-topbar-link">
                                    <div className="form-check fs-14 m-0">
                                        <input className="form-check-input" type="checkbox" value="" id="checkall"
                                            onChange={e => {
                                                checkedAll(e.target.value);
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="checkall"></label>
                                    </div>

                                    <div id="email-topbar-actions" style={{ display: "none" }}>
                                        <div className="hstack gap-sm-1 align-items-center flex-wrap">
                                            <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16" id="Tooltip1">
                                                <i className="ri-inbox-archive-fill align-bottom"></i>
                                            </button>
                                            <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16" id="Tooltip2">
                                                <i className="ri-error-warning-fill align-bottom"></i>
                                            </button>
                                            <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16" id="Tooltip3" onClick={() => { setDeleteModal(true); }} >

                                                <i className="ri-delete-bin-5-fill align-bottom"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="vr align-self-center mx-2"></div>

                                    <UncontrolledDropdown>
                                        <DropdownToggle tag="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16">
                                            <i className="ri-price-tag-3-fill align-bottom"></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-end">
                                            <DropdownItem>Support</DropdownItem>
                                            <DropdownItem>Freelance</DropdownItem>
                                            <DropdownItem>Social</DropdownItem>
                                            <DropdownItem>Friends</DropdownItem>
                                            <DropdownItem>Family</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>

                                    <UncontrolledDropdown>
                                        <DropdownToggle tag="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16">
                                            <i className="ri-more-2-fill align-bottom"></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-end">
                                            <DropdownItem onClick={() => readAll()}>Mark all as Read</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>

                                    <Alert color="warning" style={{ display: "none" }} className="unreadConversations-alert px-4 fade" id="unreadConversations">
                                        No Unread Conversations
                                    </Alert>

                                    <UncontrolledTooltip placement="top" target="Tooltip1"> Archive </UncontrolledTooltip>
                                    <UncontrolledTooltip placement="top" target="Tooltip2"> Report Spam </UncontrolledTooltip>
                                    <UncontrolledTooltip placement="top" target="Tooltip3"> Trash </UncontrolledTooltip>
                                </div>
                            </div>
                            <div className="col-auto order-2 order-sm-3">
                                <div className="d-flex gap-sm-1 email-topbar-link">
                                    <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16">
                                        <i className="ri-refresh-line align-bottom"></i>
                                    </button>
                                    <UncontrolledDropdown>
                                        <DropdownToggle tag="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16">
                                            <i className="ri-more-2-fill align-bottom"></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-end">
                                            <DropdownItem>Mark as Unread</DropdownItem>
                                            <DropdownItem>Mark as Important</DropdownItem>
                                            <DropdownItem>Add to Tasks</DropdownItem>
                                            <DropdownItem>Add Star</DropdownItem>
                                            <DropdownItem>Mute</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                            </div>
                        </Row>

                        <Row className="row align-items-end mt-3">
                            <Col>
                                <div id="mail-filter-navlist">
                                    <Nav
                                        className="nav nav-tabs nav-tabs-custom nav-primary gap-1 text-center border-bottom-0"
                                        role="tablist"
                                    >
                                        <NavItem>
                                            <NavLink
                                                className={classnames(
                                                    { active: isTypeTab === "emails" },
                                                    "fw-semibold"
                                                )}
                                                onClick={() => {
                                                    toggleTab("all", "emails", "all");
                                                }}
                                                href="#"
                                            >
                                                <i className="ri-inbox-fill align-bottom d-inline-block"></i>
                                                <span className="ms-1 d-none d-sm-inline-block">Emails</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames(
                                                    { active: isTypeTab === "sms" },
                                                    "fw-semibold"
                                                )}
                                                onClick={() => {
                                                    toggleTab("all", "sms", "all");
                                                }}
                                                href="#"
                                            >
                                                <i className="ri-group-fill align-bottom d-inline-block"></i>
                                                <span className="ms-1 d-none d-sm-inline-block">SMS</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames(
                                                    { active: isTypeTab === "tasks" },
                                                    "fw-semibold"
                                                )}
                                                onClick={() => {
                                                    toggleTab("all", "tasks", "all");
                                                }}
                                                href="#"
                                            >
                                                <i className="ri-price-tag-3-fill align-bottom d-inline-block"></i>
                                                <span className="ms-1 d-none d-sm-inline-block">Tasks</span>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </div>
                            </Col>
                            <div className="col-auto">
                                <div className="text-muted mb-2">1-50 of 154</div>
                            </div>
                        </Row>
                    </div>

                    <SimpleBar className="message-list-content mx-n4 px-4 message-list-scroll">
                        {isLoader ? <div id="elmLoader">
                            <div className="spinner-border text-primary avatar-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                            :
                            <ul className="message-list" id="mail-list">
                                {
                                    mailList.filter(({ category, type, label }) => displayCategory === category || (displayCategory === "all" && (displaytype === type || displaytype === 'all') && (displaylabel === label || displaylabel === 'all'))).map((item, key) => (
                                        <li className={item.unread ? "unread" : null} key={key} id={item.forId}>
                                            <div className="col-mail col-mail-1">
                                                <div className="form-check checkbox-wrapper-mail fs-14">
                                                    <input
                                                        onChange={(e) => {
                                                            onChangeCheckBox(e.target.value, e.target.checked);
                                                        }}
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={item.forId}
                                                        id={item.forId}
                                                    />
                                                    <label className="form-check-label" htmlFor={item.forId}></label>
                                                </div>
                                                <button type="button" className="btn avatar-xs p-0 favourite-btn fs-15" onClick={(e) => favouriteBtn(e.target)}>
                                                    <i className='ri-star-fill' />
                                                </button>
                                                <Link to="#" className="title" onClick={(e) => { sidebarOpen("email-detail-show", e.target); setEmailinfo(item); }}>{item.name} {" "} {item.number} </Link>
                                            </div>
                                            <div className="col-mail col-mail-2" onClick={(e) => { sidebarOpen("email-detail-show", e.target); setEmailinfo(item); }}>
                                                <Link to="#" className="subject"> {item.badge ? <span className={"badge me-2 bg-" + item.badgeClass}>{item.badge}</span> : null} {item.subject} - <span className="teaser">{item.teaser}</span>
                                                </Link>
                                                <div className="date">{item.date}</div>
                                            </div>
                                        </li>
                                    ))}
                            </ul>}
                    </SimpleBar>
                </div>
            </div>

            <div className="email-detail-content">
                <div className="p-4 d-flex flex-column h-100">
                    <div className="pb-4 border-bottom border-bottom-dashed">
                        <Row>
                            <Col className="col">
                                <div className="">
                                    <button type="button" className="btn btn-soft-danger btn-icon btn-sm fs-16 close-btn-email" onClick={() => sidebarClose("email-detail-show")}>
                                        <i className="ri-close-fill align-bottom"></i>
                                    </button>
                                </div>
                            </Col>
                            <Col className="col-auto">
                                <div className="hstack gap-sm-1 align-items-center flex-wrap email-topbar-link">
                                    <button type="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16 favourite-btn active">
                                        <Rating
                                            stop={1}
                                            emptySymbol="ri-star-fill text-warning align-bottom"
                                            fullSymbol="ri-star-fill text-muted align-bottom"
                                        />
                                    </button>
                                    <button className="btn btn-ghost-secondary btn-icon btn-sm fs-16">
                                        <i className="ri-printer-fill align-bottom"></i>
                                    </button>
                                    <button className="btn btn-ghost-secondary btn-icon btn-sm fs-16 remove-mail">
                                        <i className="ri-delete-bin-5-fill align-bottom"></i>
                                    </button>
                                    <UncontrolledDropdown>
                                        <DropdownToggle tag="button" className="btn btn-ghost-secondary btn-icon btn-sm fs-16">
                                            <i className="ri-more-2-fill align-bottom"></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-end">
                                            <DropdownItem>Mark as Unread</DropdownItem>
                                            <DropdownItem>Mark as Important</DropdownItem>
                                            <DropdownItem>Add to Tasks</DropdownItem>
                                            <DropdownItem>Add Star</DropdownItem>
                                            <DropdownItem>Mute</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <SimpleBar className="mx-n4 px-4 email-detail-content-scroll">
                        <div className="mt-4 mb-3">
                            <h5 className="fw-bold email-subject-title">{emailinfo.subject}</h5>
                        </div>
                        <div className="accordion accordion-flush">
                            <div className="accordion-item border-dashed left">
                                <div className="accordion-header">
                                    <a role="button" href='/#' className="btn w-100 text-start px-0 bg-transparent shadow-none collapsed" id="email-collapseOne">
                                        <div className="d-flex align-items-center text-muted">
                                            <div className="flex-shrink-0 avatar-xs me-3">
                                                <img src={emailinfo.img} alt="" className="img-fluid rounded-circle" />
                                            </div>
                                            <div className="flex-grow-1 overflow-hidden">
                                                <h5 className="fs-14 text-truncate mb-0 email-user-name">{emailinfo.name}</h5>
                                                <div className="text-truncate fs-12">to: me</div>
                                            </div>
                                            <div className="flex-shrink-0 align-self-start">
                                                <div className="text-muted fs-12">09 Jan 2022, 11:12 AM</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <UncontrolledCollapse toggler="#email-collapseOne">
                                    <div className="accordion-body text-body px-0">
                                        <div>
                                            <p>Hi,</p>
                                            <p>Praesent dui ex, dapibus eget mauris ut, finibus vestibulum enim. Quisque arcu leo, facilisis in fringilla id, luctus in tortor.
                                            </p>
                                            <p>Sed elementum turpis eu lorem interdum, sed porttitor eros commodo. Nam eu venenatis tortor, id lacinia diam. Sed aliquam in dui et porta. Sed bibendum orci non tincidunt ultrices.</p>
                                            <p>Sincerly,</p>

                                            <div className="d-flex gap-3">
                                                <div className="border rounded avatar-xl h-auto">
                                                    <img src={img2} alt="" className="img-fluid rouned-top" />
                                                    <div className="py-2 text-center">
                                                        <a href="/#" className="d-block fw-semibold">Download</a>
                                                    </div>
                                                </div>
                                                <div className="border rounded avatar-xl h-auto">
                                                    <img src={img6} alt="" className="img-fluid rouned-top" />
                                                    <div className="py-2 text-center">
                                                        <a href="/#" className="d-block fw-semibold">Download</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </UncontrolledCollapse>
                            </div>


                            <div className="accordion-item border-dashed right">
                                <div className="accordion-header">
                                    <a href='/#' role="button" className="btn w-100 text-start px-0 bg-transparent shadow-none collapsed"
                                        data-bs-toggle="collapse" id="email-collapseTwo"
                                        aria-expanded="true" aria-controls="email-collapseTwo">
                                        <div className="d-flex align-items-center text-muted">
                                            <div className="flex-shrink-0 avatar-xs me-3">
                                                <img src={avatar1} alt="" className="img-fluid rounded-circle" />
                                            </div>
                                            <div className="flex-grow-1 overflow-hidden">
                                                <h5 className="fs-14 text-truncate email-user-name-right mb-0">Anna Adame</h5>
                                                <div className="text-truncate fs-12">to: jackdavis@email.com</div>
                                            </div>
                                            <div className="flex-shrink-0 align-self-start">
                                                <div className="text-muted fs-12">09 Jan 2022, 02:15 PM</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <UncontrolledCollapse toggler="#email-collapseTwo">
                                    <div className="accordion-body text-body px-0">
                                        <div>
                                            <p>Hi,</p>
                                            <p>If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.</p>
                                            <p>Thank you</p>
                                        </div>
                                    </div>
                                </UncontrolledCollapse>
                            </div>

                            <div className="accordion-item border-dashed left">
                                <div className="accordion-header">
                                    <a href='/#' role="button" className="btn w-100 text-start px-0 bg-transparent shadow-none"
                                        data-bs-toggle="collapse" id="email-collapseThree"
                                        aria-expanded="true" aria-controls="email-collapseThree">
                                        <div className="d-flex align-items-center text-muted">
                                            <div className="flex-shrink-0 avatar-xs me-3">
                                                <img src={emailinfo.img} alt="" className="img-fluid rounded-circle" />
                                            </div>
                                            <div className="flex-grow-1 overflow-hidden">
                                                <h5 className="fs-14 text-truncate email-user-name mb-0">{emailinfo.name}</h5>
                                                <div className="text-truncate fs-12">to: me</div>
                                            </div>
                                            <div className="flex-shrink-0 align-self-start">
                                                <div className="text-muted fs-12">10 Jan 2022, 10:08 AM</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <UncontrolledCollapse toggler="#email-collapseThree" defaultOpen>
                                    <div className="accordion-body text-body px-0">
                                        <div>
                                            <p>Hi,</p>
                                            <p>Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar pronunciation.</p>
                                            <p>Thank you</p>
                                        </div>
                                    </div>
                                </UncontrolledCollapse>
                            </div>

                        </div>
                    </SimpleBar>
                    <div className="mt-auto">
                        <form className="mt-2">
                            <div>
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Reply :</label>
                                <textarea className="form-control border-bottom-0 rounded-top rounded-0 border" id="exampleFormControlTextarea1" rows="3" placeholder="Enter message"></textarea>
                                <div className="bg-light px-2 py-1 rouned-bottom border">
                                    <Row>
                                        <Col>
                                            <ButtonGroup>
                                                <Button size='sm' color='light' className="py-0 fs-15" id="Bold1"><i className="ri-bold align-bottom"></i></Button>
                                                <Button size='sm' color='light' className="py-0 fs-15" id="Italic1"><i className="ri-italic align-bottom"></i></Button>
                                                <Button size='sm' color='light' className="py-0 fs-15" id="Link1"><i className="ri-link align-bottom"></i></Button>
                                                <Button size='sm' color='light' className="py-0 fs-15" id="Image1"><i className="ri-image-2-line align-bottom"></i></Button>
                                            </ButtonGroup>
                                            <UncontrolledTooltip placement="top" target="Bold1"> Bold </UncontrolledTooltip>
                                            <UncontrolledTooltip placement="top" target="Italic1"> Italic </UncontrolledTooltip>
                                            <UncontrolledTooltip placement="top" target="Link1"> Link </UncontrolledTooltip>
                                            <UncontrolledTooltip placement="top" target="Image1"> Image </UncontrolledTooltip>
                                        </Col>
                                        <Col className="col-auto">
                                            <UncontrolledButtonDropdown>
                                                <Button color="success" className="btn-sm"><i className="ri-send-plane-2-fill align-bottom" /></Button>
                                                <DropdownToggle tag="button" className="btn btn-success btn-sm" split>
                                                </DropdownToggle>
                                                <DropdownMenu >
                                                    <DropdownItem><i className="ri-timer-line text-muted me-1 align-bottom" /> Schedule Send</DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Modal id="composemodal" className="modal-lg" isOpen={modal} toggle={toggle} centered>
                <ModalHeader className="p-3 bg-light" toggle={toggle}>
                    New Message
                </ModalHeader>
                <ModalBody>
                    <div>
                        <div className="mb-3 position-relative">
                            <Input
                                type="text"
                                className="form-control email-compose-input"
                                defaultValue="support@themesbrand.com"
                            />
                            <div className="position-absolute top-0 end-0">
                                <div className="d-flex">
                                    <button
                                        className="btn btn-link text-reset fw-semibold px-2"
                                        type="button"
                                    >
                                        Cc
                                    </button>
                                    <button
                                        className="btn btn-link text-reset fw-semibold px-2"
                                        type="button"
                                    >
                                        Bcc
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="collapse" id="CcRecipientsCollapse">
                            <div className="mb-3">
                                <label>Cc:</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    placeholder="Cc recipients"
                                />
                            </div>
                        </div>
                        <div className="collapse" id="BccRecipientsCollapse">
                            <div className="mb-3">
                                <label>Bcc:</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    placeholder="Bcc recipients"
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <Input type="text" className="form-control" placeholder="Subject" />
                        </div>
                        <div className="ck-editor-reverse">
                            <CKEditor
                                editor={ClassicEditor}
                                onReady={(editor) => {
                                    // You can store the "editor" and use when it is needed.

                                }}
                                onChange={(event, editor) => {
                                    editor.getData();
                                }}
                            />
                        </div>
                    </div>
                </ModalBody>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-ghost-danger"
                        onClick={() => {
                            setModal(false);
                        }}
                    >
                        Discard
                    </button>

                    <UncontrolledDropdown className="btn-group">
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                                setModal(false);
                            }}
                        >
                            Send
                        </button>
                        <DropdownToggle
                            tag="button"
                            type="button"
                            className="btn btn-success"
                            split
                        >
                            <span className="visually-hidden">Toggle Dropdown</span>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                            <li>
                                <DropdownItem href="#">
                                    <i className="ri-timer-line text-muted me-1 align-bottom"></i>{" "}
                                    Schedule Send
                                </DropdownItem>
                            </li>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            </Modal>
        </React.Fragment >
    );
};

export default EmailToolbar;