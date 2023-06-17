import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Card, CardHeader, CardBody, Col, Label,
  Input, Modal, Row,
} from "reactstrap";

import { Link } from 'react-router-dom'
// import Components
import TableContainer from "../../../Components/Common/TableContainer";
import Loader from "../../../Components/Common/Loader";
import { toast, ToastContainer } from 'react-toastify';
import { isEmpty } from "lodash";
import {

} from "reactstrap";
// Import Images
import * as Yup from "yup";
import { useFormik } from "formik";
//redux
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
//Import actions
import {
  getContacts as onGetContacts,
  addNewContact as onAddNewContact,
  updateContact as onUpdateContact,
  deleteContact as onDeleteContact,
} from "../../../store/actions";


export const StorageType = () => {
  const [contact, setContact] = useState([]);


  // add large modals
  const [modal_type, setmodal_type] = useState(false);
  function tog_mod_2() {
    setmodal_type(!modal_type);
  }
  const [isEdit, setIsEdit] = useState(false);
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

  // Date && Time Format

  const dateFormat = () => {
    var d = new Date(),
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear());
  };
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


  const [orderList, setOrderList] = useState([]);
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


  // Customber Column

  const colstoragtype = useMemo(
    () => [
      {
        Header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
        Cell: (cellProps) => {
          return <input type="checkbox" className="contactCheckBox form-check-input" value={cellProps.row.original._id} onChange={() => deleteCheckbox()} />;
        },
        id: '#',
      },
      {
        Header: "Storage Type",
        accessor: "name",
        filterable: false,

      },
      {
        Header: "Dimensions",
        accessor: "company",
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

  return (
    <div> <Card>
      <CardHeader>
        <div className="d-flex align-items-center flex-wrap gap-2">
          <div className="flex-grow-1">
            <button
              className="btn btn-brown add-btn"
              onClick={() =>
                tog_mod_2(true)
              }
            >
              <i className="ri-add-fill me-1 align-bottom"></i> Add Storage Type
            </button>
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
                  columns={colstoragtype}
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
              className="mt-5"
              size="lg"
              isOpen={modal_type}
              toggle={() => {
                tog_mod_2();
              }}
            >
              <Card>
                <CardHeader>
                  <h5 className="mb-0">Create Storage Type</h5>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <div className="mb-3 ">
                        <Label for="storageName" className="form-label">Name</Label>
                        <Input type="text" className="form-control" placeholder="" id="storageName" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <div className="form-check form-switch form-switch-lg mb-3" dir="ltr">
                        <Label className="form-check-label" for="customSwitchsizelg">Transportable</Label>
                        <Input type="checkbox" className="form-check-input" id="customSwitchsizelg" defaultChecked />

                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Label for="address" className="form-label">Inside Capacity in Cubic Meter (m3)</Label>
                    <Col md={3}>
                      <div className="mb-3">

                        <Input type="text" className="form-control" placeholder="" id="address" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <div className="mb-3">
                        <Label for="address" className="form-label">Max Gross Weight in Kg</Label>
                        <Input type="text" className="form-control" placeholder="" id="address" />
                      </div>
                    </Col>
                    <Col md={3}></Col>
                    <Col md={3}>
                      <div className="mb-3">
                        <Label for="address" className="form-label">Tare Weight in Kg</Label>
                        <Input type="text" className="form-control" placeholder="" id="address" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Label for="suburb" className="form-label">External Dimension in Meter</Label>
                    <Col md={3}>
                      <div className="mb-3">
                        <Input type="text" className="form-control" placeholder="Length" id="suburb" />
                      </div>
                    </Col>

                    <Col md={3}>
                      <div className="mb-3">
                        <Input type="text" className="form-control" placeholder="Width" id="state" />
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="mb-3">
                        <Input type="text" className="form-control" placeholder="Height" id="postCode" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Label for="suburb" className="form-label">Internal Dimension in Meter</Label>
                    <Col md={3}>
                      <div className="mb-3">
                        <Input type="text" className="form-control" placeholder="Length" id="suburb" />
                      </div>
                    </Col>

                    <Col md={3}>
                      <div className="mb-3">
                        <Input type="text" className="form-control" placeholder="Width" id="state" />
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="mb-3">
                        <Input type="text" className="form-control" placeholder="Height" id="postCode" />
                      </div>
                    </Col>
                  </Row>
                  <Row>

                    <Col md={12}>
                      <Row>
                        <Col md={9}><div className="form-check mb-2">
                          <Input className="form-check-input" type="checkbox" id="checkActive" />
                          <Label className="form-check-label" for="checkActive">
                            Active
                          </Label>
                        </div></Col>

                      </Row>
                    </Col>
                    <hr></hr>
                    <Row>
                      <Col md={5}></Col>
                      <Col md={1}><button type="submit" className="btn btn-success">Save</button></Col>
                      <Col md={1}><button type="submit" className="btn btn-primary" onClick={() =>
                        tog_mod_2(true)
                      }>Cancel</button></Col>
                    </Row>
                  </Row>
                </CardBody>
              </Card>

            </Modal>
            <ToastContainer closeButton={false} limit={1} />
          </CardBody>
        </Card>
      </Col>
    </div>
  )
}
