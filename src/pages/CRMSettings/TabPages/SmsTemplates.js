import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { Link } from 'react-router-dom';
import React, { useEffect, useState, useCallback, useMemo } from "react";

import { isEmpty } from "lodash";
import {
  CardHeader,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalFooter,

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
//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import Loader from "../../../Components/Common/Loader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SmsTemplates = () => {

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

  const [modal_sms, setmodal_sms] = useState(false);
  function tog_smsModal() {
    setmodal_sms(!modal_sms);
  }

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

  const [tag, setTag] = useState([]);
  const [assignTag, setAssignTag] = useState([]);

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
    </div>
  )
}
