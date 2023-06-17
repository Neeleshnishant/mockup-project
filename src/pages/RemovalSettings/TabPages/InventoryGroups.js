import { Card, CardBody, Col, CardHeader, Table, Row, } from "reactstrap";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import TableRows from "../TableRows";
//Import actions
import {
  getContacts as onGetContacts,
  addNewContact as onAddNewContact,
  updateContact as onUpdateContact,
  deleteContact as onDeleteContact,
} from "../../../store/actions";
//redux
import { useSelector, useDispatch } from "react-redux";
// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import 'react-toastify/dist/ReactToastify.css';

export const InventoryGroups = () => {

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

  //rowsdata
  const [rowsData, setRowsData] = useState([]);

  const addTableRows = () => {

    const rowsInput = {
      fullName: '',
      emailAddress: '',
      salary: ''
    }
    setRowsData([...rowsData, rowsInput])

  }

  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  }
  const handleChange = (index, evnt) => {

    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);

  }
  return (
    <div>
      <Card>
        <CardHeader>
          <h5 className="mb-0">Inventory Groups</h5>
        </CardHeader>
        <CardBody>
          <div className="live-preview">
            <Row>
              <Col xl={12}>
                <div className="table-responsive mt-4 mt-xl-0">
                  <Table className="table table-bordered table-nowrap align-middle mb-3">
                    <thead>
                      <tr>
                        <th scope="col">Group Name</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="fw-medium">Study</td>
                        <td>
                          <div className="hstack gap-3 flex-wrap">
                            <Link to="#" className="link-success fs-15"><i className="ri-edit-2-line"></i></Link>
                            <Link to="#" className="link-danger fs-15"><i className="ri-delete-bin-line"></i></Link>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-medium">Bedroom</td>
                        <td>
                          <div className="hstack gap-3 flex-wrap">
                            <Link to="#" className="link-success fs-15"><i className="ri-edit-2-line"></i></Link>
                            <Link to="#" className="link-danger fs-15"><i className="ri-delete-bin-line"></i></Link>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-medium">Cartons & Bags</td>
                        <td>
                          <div className="hstack gap-3 flex-wrap">
                            <Link to="#" className="link-success fs-15"><i className="ri-edit-2-line"></i></Link>
                            <Link to="#" className="link-danger fs-15"><i className="ri-delete-bin-line"></i></Link>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-medium">Dining Room</td>
                        <td>
                          <div className="hstack gap-3 flex-wrap">
                            <Link to="#" className="link-success fs-15"><i className="ri-edit-2-line"></i></Link>
                            <Link to="#" className="link-danger fs-15"><i className="ri-delete-bin-line"></i></Link>
                          </div>
                        </td>
                      </tr>
                      <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
                    </tbody>
                  </Table>
                  <button className="btn btn-primary" onClick={addTableRows} >+</button>
                </div>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
