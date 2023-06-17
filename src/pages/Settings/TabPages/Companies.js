import PrismCode from "../../../Components/Common/Prism";
import { Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, Alert, UncontrolledAlert, TabContent, TabPane, UncontrolledTooltip } from "reactstrap";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import img3 from "../../../assets/images/small/img-3.jpg";
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../../assets/scss/pages/_settings.scss";
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
//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";
// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import Loader from "../../../Components/Common/Loader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Companies = () => {
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

  const [rowsData, setRowsData] = useState([]);
  const addTableRows = () => {
    const rowsInput = {
      fullName: '',
      emailAddress: '',
      salary: ''
    }
    setRowsData([...rowsData, rowsInput])
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
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);

  const [modal_large, setModal_Company] = useState(false);
  function tog_Company() {
    setModal_Company(!modal_large);
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
  return (
    <div>
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
    </div>
  )
}
