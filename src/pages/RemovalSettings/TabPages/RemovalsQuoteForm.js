import { Card, CardBody, Col, Row, CardHeader, Label, Input } from "reactstrap";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { isEmpty } from "lodash";
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

export const RemovalsQuoteForm = () => {
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
          <h5>Removals Quote Form</h5>
        </CardHeader>
        <CardBody>
          <Row className="mb-3">
            <Col lg={6}>

              <Label className="form-label">Redirect to Thank You page after form submission</Label>
              <div className="form-check form-switch form-switch-lg" dir="ltr">
                <Input type="checkbox" className="form-check-input" id="customSwitchsizelg" defaultChecked="" />
              </div>
            </Col>
          </Row>
          <hr></hr>
          <Col md={12}>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </Col>
          <hr></hr>
          <Row>
            <Col md={6}>
              <div className="mb-3">
                <Label for="successstatus" className="form-label">Choose company for the external Removals Quote form: </Label>
                <select id="successstatus" className="form-select" data-choices data-choices-sorting="true" >
                  <option>Onexfort</option>
                  <option>Box Removals</option>

                </select>
              </div>
            </Col>
          </Row>
          <h5>Hidden Tab</h5>
          <hr></hr>
          <Col md={12} className="mb-3">
            <div className="text-left">
              <button type="submit" className="btn btn-primary">Generate Script</button>
            </div>
          </Col>
          <h5>
            Always Protruding
          </h5>
          <hr></hr>

          <Col md={12}>
            <div className="text-left">
              <button type="submit" className="btn btn-primary">Generate Script</button>
            </div>
          </Col>

        </CardBody>
      </Card>
    </div>
  )
}
