import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  Card, CardBody, CardHeader, Col, Container, Row, Label, Input, Form, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu, Button,
  DropdownItem,
} from 'reactstrap';
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";

// import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import Select from "react-select";
import DeleteModal from "../../../Components/Common/DeleteModal";

//Import actions
import {
  getContacts as onGetContacts,
  addNewContact as onAddNewContact,
  updateContact as onUpdateContact,
  deleteContact as onDeleteContact,
} from "../../../store/actions";

import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../Components/Common/Loader";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Images
import dummyImg from "../../../assets/images/users/user-dummy-img.jpg";

import TableContainer from "../../../Components/Common/TableContainer";
export const Products = () => {

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

  // Delete Data
  const handleDeleteContact = () => {
    if (contact) {
      dispatch(onDeleteContact(contact._id));
      setDeleteModal(false);
    }
  };

  const onClickDelete = (contact) => {
    setContact(contact);
    setDeleteModal(true);
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
  const [orderList, setOrderList] = useState([]);
  const [order, setOrder] = useState([]);
 

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


  // Customer Column
  const columns = useMemo(
    () => [
      {
        Header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
        Cell: (cellProps) => {
          return <input type="checkbox" className="contactCheckBox form-check-input" value={cellProps.row.original._id} onChange={() => deleteCheckbox()} />;
        },
        id: '#',
      },
      {
        Header: "Name",
        accessor: "name",
        filterable: false,

      },
      {
        Header: "Category",
        accessor: "company",
        filterable: false,
      },

      {
        Header: "Product Type",
        accessor: "lead_score",
        filterable: false,
      },

      {
        Header: "Price",
        accessor: "",
        filterable: false,
      },

      {
        Header: "Customer Type",
        accessor: "",
        filterable: false,
      },

      {
        Header: "Stockable",
        accessor: "",
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

  function handlestag(tags) {
    setTag(tags);
    const assigned = tags.map((item) => item.value);
    setAssignTag(assigned);
  }
  const tags = [
    { label: "Exiting", value: "Exiting" },
    { label: "Lead", value: "Lead" },
    { label: "Long-term", value: "Long-term" },
    { label: "Partner", value: "Partner" }
  ];

  //multi select options
  const ProductOptions = [
    { value: 'GST 10%', label: 'GST 10%' },

  ];
  const ProductCategory = [
    { value: 'Removal Services', label: 'Removal Services' },
    { value: 'Extras', label: 'Extras' },
    { value: 'Packing', label: 'Packing' },
    { value: 'Charges', label: 'Charges' },
    { value: 'Storage', label: 'Storage' },
  ];
  const ProductType = [
    { value: 'Item - Fixed', label: 'Item- Fixed' },
    { value: 'Service - Hourly', label: 'Service - Hourly' },
    { value: 'Charge', label: 'Charge' },
  ];
  const CustomerType = [
    { value: 'Both', label: 'Both' },
    { value: 'Residential', label: 'Residential' },
    { value: 'Commercial', label: 'Commercial' },
  ];

  const [selectedSingle, setSelectedSingle] = useState(null);
  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle);
  }
  return (

    <Card>
      <CardHeader>
        <Button className='btn btn-success'
          onClick={() => {
            setModal(true);
          }}>Add New Product +</Button></CardHeader>
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

        <Modal id="showModal" isOpen={modal} toggle={toggle} size="lg" centered>
          <ModalHeader className="bg-soft-info p-3" toggle={toggle}>
            {!!isEdit ? "Edit Products" : "Add Products"}
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

                  <div className="mb-3">
                    <Label
                      htmlFor="name-field"
                      className="form-label"
                    >
                      Name
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
                      htmlFor="name-field"
                      className="form-label"
                    >
                      Price
                    </Label>
                    <Input
                      name="name"
                      id="customername-field"
                      className="form-control"
                      placeholder="Insert price without currency code."
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
                  <div className="mb-3">
                    <Label
                      htmlFor="company_name-field"
                      className="form-label"
                    >
                      Tax
                    </Label>

                    <Select
                      value={selectedSingle}
                      placeholder="Select Tax"
                      onChange={() => {
                        handleSelectSingle();
                      }}
                      options={ProductOptions}
                    />

                  </div>
                </Col>
                <Col lg={6}>
                  <Label htmlFor="VertimeassageInput" className="form-label">Description</Label>
                  <textarea className="form-control" id="VertimeassageInput" rows="3" placeholder="Enter your reason">
                  </textarea>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <Label
                      htmlFor="company_name-field"
                      className="form-label"
                    >
                      Product Category
                    </Label>

                    <Select
                      value={selectedSingle}
                      placeholder="Select Category"
                      onChange={() => {
                        handleSelectSingle();
                      }}
                      options={ProductCategory}
                    />

                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <Label
                      htmlFor="company_name-field"
                      className="form-label"
                    >
                      Product Type
                    </Label>

                    <Select
                      value={selectedSingle}
                      placeholder="Select Type"
                      onChange={() => {
                        handleSelectSingle();
                      }}
                      options={ProductType}
                    />

                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <Label
                      htmlFor="company_name-field"
                      className="form-label"
                    >
                      Customer Type
                    </Label>

                    <Select
                      value={selectedSingle}
                      placeholder="Select Type"
                      onChange={() => {
                        handleSelectSingle();
                      }}
                      options={CustomerType}
                    />

                  </div>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <div className="hstack gap-2 justify-content-end">
                <button type="submit" className="btn btn-success" id="add-btn" > {!!isEdit ? "Update" : "Save"} </button>
                <button type="button" className="btn btn-light" onClick={() => { setModal(false); }} > Cancel </button>
              </div>
            </ModalFooter>
          </Form>
        </Modal>
        <ToastContainer closeButton={false} limit={1} />
      </CardBody>
    </Card>

  )
}
