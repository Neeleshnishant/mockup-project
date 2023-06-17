import { Button, Card, CardBody, CardFooter, Col, Row, } from "reactstrap";
import Dragula from 'react-dragula';
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

//Import actions
import {
  getContacts as onGetContacts,
  addNewContact as onAddNewContact,
  updateContact as onUpdateContact,
  deleteContact as onDeleteContact,
} from "../../../store/actions";

//import action
import {
  getTodos as onGetTodos,
  updateTodo as onupdateTodo,
  deleteTodo as onDeleteTodo,
  addNewTodo as onAddNewTodo,

  getProjects as onGetProjects,
  addNewProject as onAddNewProject,
} from "../../../store/actions";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import Loader from "../../../Components/Common/Loader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EmailTemplates = () => {
  // Export Modal
  const [isExportCSV, setIsExportCSV] = useState(false);

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

  return (
    <div>
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
    </div>
  )
}
