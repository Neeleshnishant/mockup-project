import { Card, CardBody, Col, Row, CardHeader, Label, Input, } from "reactstrap";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { isEmpty } from "lodash";
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

export const EnableAutoQuote = () => {

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

  return (
    <div>
      <Card>
        <CardHeader>
          <h5>Auto Quote - Removal Opportunities</h5>

        </CardHeader>
        <CardBody>
          <Row>
            <Col md={12}>
              <Label className="form-label">Auto Quote Enabled?</Label>
              <div className="form-check form-switch form-switch-lg mb-3" dir="ltr">
                <Input type="checkbox" className="form-check-input" id="customSwitchsizelg" defaultChecked="" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Label className="form-label">Send Auto Quote Email to Customer?</Label>
              <div className="form-check form-switch form-switch-lg" dir="ltr">
                <Input type="checkbox" className="form-check-input" id="customSwitchsizelg" defaultChecked="" />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Label for="initialstatus" className="form-label">Initial Opportunity Status</Label>
                <select id="initialstatus" className="form-select" data-choices data-choices-sorting="true" >
                  <option>New</option>
                  <option>Quote Sent</option>
                  <option>Follow up 1</option>
                  <option>Follow up 2</option>
                  <option>Confirmed</option>
                  <option>Lost</option>
                  <option>Pre Authorised</option>
                </select>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Label for="successstatus" className="form-label">Successfully Quoted Opportunity Status</Label>
                <select id="successstatus" className="form-select" data-choices data-choices-sorting="true" >
                  <option>Quote Sent</option>
                  <option>New</option>
                  <option>Follow up 1</option>
                  <option>Follow up 2</option>
                  <option>Confirmed</option>
                  <option>Lost</option>
                  <option>Pre Authorised</option>
                </select>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Label for="failedstatus" className="form-label">Quoting Failed Opportunity Status</Label>
                <select id="failedstatus" className="form-select" data-choices data-choices-sorting="true" >
                  <option>Quote Sent</option>
                  <option>New</option>
                  <option>Follow up 1</option>
                  <option>Follow up 2</option>
                  <option>Confirmed</option>
                  <option>Lost</option>
                  <option>Pre Authorised</option>
                </select>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Label for="emailtemplate" className="form-label">Quote Email Template</Label>
                <select id="emailtemplate" className="form-select" data-choices data-choices-sorting="true" >
                  <option>Your Quote is Ready</option>
                  <option>Inventory PDF Attached</option>
                  <option>Your move is in 2 days </option>
                  <option>Follow up 1 - box Removals</option>
                  <option>Your Invoice is Ready</option>
                  <option>Your Work Order</option>
                  <option>Proof of Delivery</option>
                  <option>Insurance Quote</option>
                </select>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Label for="failemailtemp" className="form-label">fAILURE Email Template</Label>
                <select id="failemailtemp" className="form-select" data-choices data-choices-sorting="true" >
                  <option>Your Quote is Ready</option>
                  <option>Inventory PDF Attached</option>
                  <option>Your move is in 2 days </option>
                  <option>Follow up 1 - box Removals</option>
                  <option>Your Invoice is Ready</option>
                  <option>Your Work Order</option>
                  <option>Proof of Delivery</option>
                  <option>Insurance Quote</option>
                </select>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Label for="taxinquote" className="form-label">Tax Used In Quote</Label>
                <select id="taxinquote" className="form-select" data-choices data-choices-sorting="true" >
                  <option>GST - 10%</option>

                </select>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Label for="sendemail" className="form-label">Send Failure Email to</Label>
                <select id="sendemail" className="form-select" data-choices data-choices-sorting="true" >
                  <option>xyz@www.com</option>
                  <option>qwerty@gmail.com</option>
                </select>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Label for="quotelineitem" className="form-label">Quote Line item Product</Label>
                <select id="quotelineitem" className="form-select" data-choices data-choices-sorting="true" >
                  <option></option>

                </select>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Label className="form-label">Redirect to Inventory Form After Quote Payment</Label>
                <div className="form-check form-switch form-switch-lg mb-3" dir="ltr">
                  <Input type="checkbox" className="form-check-input" id="radioredirect" defaultChecked="" />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Label className="form-label">Send Auto Quote SMS to Customer</Label>
                <div className="form-check form-switch form-switch-lg mb-3" dir="ltr">
                  <Input type="checkbox" className="form-check-input" id="radiosendsms" defaultChecked="" />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Label for="smstemplate" className="form-label">Quote SMS Template</Label>
                <select id="smstemplate" className="form-select" data-choices data-choices-sorting="true" >
                  <option></option>
                  <option>Follow Up</option>
                </select>
              </div>
            </Col>
          </Row>
          <hr></hr>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
