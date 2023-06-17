import { Button, Card, CardBody, CardFooter, Col, Row } from "reactstrap";
import Dragula from 'react-dragula';
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
//redux
import { useSelector, useDispatch } from "react-redux";
// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import 'react-toastify/dist/ReactToastify.css';

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

export const Statuses = () => {
  const [modal_standard, setmodal_standard] = useState(false);
  const [modal_opportunity, setmodal_opportunity] = useState(false);
  function tog_standard() {
    setmodal_standard(!modal_standard);
  }
  function tog_opportunity() {
    setmodal_opportunity(!modal_opportunity);
  }

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

  const [tag, setTag] = useState([]);
  const [assignTag, setAssignTag] = useState([]);

  const { todos, projects } = useSelector((state) => ({
    todos: state.Todos.todos,
    projects: state.Todos.projects,
  }));
  const [taskList, setTaskList] = useState([]);
  // Project
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

  return (
    <div>
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
    </div>
  )
}
