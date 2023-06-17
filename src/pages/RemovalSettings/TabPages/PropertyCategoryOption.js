import { Card, CardBody, Col, Row } from "reactstrap";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { isEmpty } from "lodash";
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
  ModalFooter,

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
export const PropertyCategoryOption = () => {
  const [modal_prop_option, setmodal_prop_option] = useState(false);
  function tog_prop_option() {
    setmodal_prop_option(!modal_prop_option);
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

  const deleteCheckbox = () => {
    const ele = document.querySelectorAll(".contactCheckBox:checked");
    ele.length > 0 ? setIsMultiDeleteButton(true) : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

  const propcolumn = useMemo(
    () => [
      {
        Header: <input type="checkbox" id="checkBoxAll" className="form-check-input" onClick={() => checkedAll()} />,
        Cell: (cellProps) => {
          return <input type="checkbox" className="contactCheckBox form-check-input" value={cellProps.row.original._id} onChange={() => deleteCheckbox()} />;
        },
        id: '#',
      },
      {
        Header: "Propert Category",
        accessor: "name",
        filterable: false,

      },
      {
        Header: "Property Category Option",
        accessor: "company",
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

  return (
    <div>
      <Card>
        <CardHeader>
          <h4 className="card-title mb-0 flex-grow-1">Search Filters</h4>
        </CardHeader>
        <CardBody>
          <div id="table-gridjs">
            <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
              <div className="flex-grow-1">
                <button
                  className="btn btn-brown add-btn"
                  onClick={() =>
                    tog_prop_option(true)
                  }
                >
                  <i className="ri-add-fill me-1 align-bottom"></i> Add Property Category Options
                </button>
              </div>
            </div>

            <div>
              {isContactSuccess && crmcontacts.length ? (
                <TableContainer
                  columns={propcolumn}
                  data={(crmcontacts || [])}
                  isGlobalFilter={true}
                  isAddUserList={false}
                  customPageSize={8}
                  className="custom-header-css"
                  divClass="table-responsive table-bordered table-card mb-3"
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
          </div>
        </CardBody>
      </Card>
      <Modal
        className="mt-5"
        size="lg"
        isOpen={modal_prop_option}
        toggle={() => {
          tog_prop_option();

        }}

      >
        <Card className="mb-0">
          <ModalHeader>
            Create Property Category Options
          </ModalHeader>

          <CardBody>
            <Row>
              <Col md={7}>
                <div className="mb-3">
                  <Label className="form-label">Property Category Option</Label>
                  <Input type="text" className="form-control" />
                </div>
              </Col>

              <Col md={7}>
                <div className="mb-3">
                  <Label for="propertyGroup" className="form-label">Property Category</Label>
                  <select id="propertyGroup" className="form-select" data-choices data-choices-sorting="true" >
                    <option>Property Type</option>
                    <option>Furnishing</option>
                    <option>Bed Rooms</option>
                    <option>Living Areas</option>
                    <option>Other Rooms</option>
                    <option>Speciality</option>
                  </select>
                </div>
              </Col>
              <Col md={7}>
                <div className="mb-3">
                  <Label className="form-label ">CBM (m3)</Label>
                  <Input type="number" className="form-control" />
                </div>
              </Col>
              <Col md={7}>
                <div className="mb-3">
                  <Label className="form-label">Other Value</Label>
                  <Input type="text" className="form-control" />
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
              tog_prop_option();
            }} >Cancel</button>
          </ModalFooter>
        </Card>


      </Modal>
    </div>
  )
}
