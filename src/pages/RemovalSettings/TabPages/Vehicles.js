import { Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane, UncontrolledTooltip, Button } from "reactstrap";
import classnames from "classnames";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import * as moment from "moment";
import TablesColors from "../BasicTablesCode";
import TableRows from "../TableRows";
import { TableCheckList, InvDefinitions } from "../TableRows";

import {
  CardHeader,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
import DeleteModal from "../../../Components/Common/DeleteModal";

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

// Export Modal
import ExportCSVModal from "../../../Components/Common/ExportCSVModal";


export const RemovalSettingsVehicles = () => {
  const [modal_large, setmodal_large] = useState(false);
  function tog_large() {
    setmodal_large(!modal_large);
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

  // Customber Column
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
        Header: "License Plate",
        accessor: "company",
        filterable: false,
      },

      {
        Header: "Vehicle in Tons",
        accessor: "lead_score",
        filterable: false,
      },
      {
        Header: "Active",
        accessor: "",
        filterable: false,
      },

      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">

              <li className="list-inline-item">
                <UncontrolledDropdown>
                  <DropdownToggle
                    href="#"
                    className="btn btn-soft-secondary btn-sm dropdown"
                    tag="button"
                  >
                    Action   <i className="ri-more-fill align-middle"></i>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end">

                    <DropdownItem
                      className="dropdown-item edit-item-btn"
                      href="#"
                      onClick={() => { const contactData = cellProps.row.original; handleContactClick(contactData); }}
                    >
                      <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                      Edit
                    </DropdownItem>
                    <DropdownItem
                      className="dropdown-item remove-item-btn"
                      href="#"
                      onClick={() => { const contactData = cellProps.row.original; onClickDelete(contactData); }}
                    >
                      <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
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

  //rowsdata
  const [rowsData, setRowsData] = useState([]);

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="d-flex align-items-center flex-wrap gap-2">
            <div className="flex-grow-1">
              <button
                className="btn btn-brown add-btn"
                onClick={() =>
                  tog_large(true)
                }
              >
                <i className="ri-add-fill me-1 align-bottom"></i> Add Vehicle
              </button>
            </div>
            <div className="flex-shrink-0">
              <div className="hstack text-nowrap gap-2">
                {isMultiDeleteButton && <button className="btn btn-danger"
                  onClick={() => setDeleteModalMulti(true)}
                ><i className="ri-delete-bin-2-line"></i></button>}

                <button className="btn btn-soft-primary" onClick={() => setIsExportCSV(true)}>Export To Excel</button>

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
            <ToastContainer closeButton={false} limit={1} />
          </CardBody>
        </Card>
        <Modal
          className="mt-5"
          size="lg"
          isOpen={modal_large}
          toggle={() => {
            tog_large();

          }}
        >
          <Card className="mb-0">
            <ModalHeader>
              <h5>
                Create Vehicle
              </h5>

            </ModalHeader>
            <CardBody>
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <Label for="vehicleName" className="form-label">Vehicle Name</Label>
                    <Input type="text" className="form-control" placeholder="Enter vehicle name" id="vehicleName" />
                  </div>
                </Col>
                <Col md={12}>
                  <div className="mb-3">
                    <Label for="vehicleDescription" className="form-label">Vehicle Description</Label>
                    <Input type="text" className="form-control" placeholder="Description" id="vehicleDescription" />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Label for="fuelType" className="form-label">Fuel Type</Label>
                    <Input type="text" className="form-control" placeholder="Enter fuel type" id="fuelType" />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Label for="licensePlateNum" className="form-label">License Plate Number</Label>
                    <Input type="tel" className="form-control" placeholder="" id="licensePlateNum" />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Label for="manufacturer" className="form-label">Manufacturer</Label>
                    <Input type="text" className="form-control" placeholder="" id="manufacturer" />
                  </div>
                </Col>
                <Col md={3}>
                  <div className="mb-3">
                    <Label for="model" className="form-label">Model</Label>
                    <Input type="text" className="form-control" placeholder="Model" id="model" />
                  </div>
                </Col>
                <Col md={3}>
                  <div className="mb-3">
                    <Label for="modelYear" className="form-label">Model Year</Label>
                    <Input type="text" className="form-control" placeholder="Year" id="modelYear" />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Label for="capacityInTons" className="form-label">Capacity in Tons</Label>
                    <Input type="text" className="form-control" placeholder="Capacity in tons" id="capacityInTons" />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Label for="cubicCapacity" className="form-label">Cubic Capacity</Label>
                    <Input type="text" className="form-control" placeholder="Cubic Capacity" id="cubicCapacity" />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Label for="colourPicker" className="form-label">Vehicle Colour</Label>
                    <Input type="text" className="form-control" placeholder="Colour Picker" id="colourPicker" />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <Label for="vehicleGroups" className="form-label">Vehicle Groups</Label>
                    <select id="vehicleGroups" className="form-select" data-choices data-choices-sorting="true" >
                      <option>Adelaide</option>
                      <option>Melbourne</option>
                    </select>
                  </div>
                </Col>
                <Col md={9}><div className="form-check mb-2">
                  <Input className="form-check-input" type="checkbox" id="checkActive" />
                  <Label className="form-check-label" for="checkActive">
                    Active
                  </Label>
                </div>
                </Col>

              </Row>
            </CardBody>
            <ModalFooter>
              <button type="submit" className="btn btn-success">Save</button>
              <button type="submit" className="btn btn-danger" onClick={() => {
                tog_large();
              }} >Cancel</button>
            </ModalFooter>
          </Card>
        </Modal>
      </Col>
    </div>
  )
}
