import { Card, CardBody, Col, Row, } from "reactstrap";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { isEmpty } from "lodash";

import {
  CardHeader,
  Label,
  Input,

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
// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PricingSettings = () => {

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
          <h5>Auto Quote - Pricing Settings</h5>
        </CardHeader>
        <CardBody>
          <Row className="mb-3">
            <Col lg={6}>
              <div>
                <Label htmlFor="iconInput" className="form-label">Goods Value per CBM</Label>
                <div className="form-icon">
                  <Input type="number" className="form-control form-control-icon" value={3000} id="iconInput" placeholder="" />
                  <i className="bx bx-dollar"></i>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div>
                <Label htmlFor="iconInput" className="form-label">Minimum Goods Value</Label>
                <div className="form-icon">
                  <Input type="number" className="form-control form-control-icon" value={40000} id="iconInput" placeholder="" />
                  <i className="bx bx-dollar"></i>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6}>
              <Label className="form-label">Show CBM in Inventory Pdf</Label>
              <div className="form-check form-switch form-switch-lg" dir="ltr">
                <Input type="checkbox" className="form-check-input" id="customSwitchsizelg" defaultChecked="" />
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6}>
              <div>
                <Label htmlFor="iconInput" className="form-label">CBM (m3) per Bedroom</Label>
                <div className="form-icon">
                  <Input type="number" className="form-control" value={0.00} id="iconInput" placeholder="0.00" />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6}>
              <div>
                <Label htmlFor="iconInput" className="form-label">CBM (m3) per Living room</Label>
                <div className="form-icon">
                  <Input type="number" className="form-control " value={0.00} id="iconInput" placeholder="0.00" />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6}>
              <div>
                <Label htmlFor="iconInput" className="form-label">Stairs Access Charge per floor per CBM (m3)</Label>
                <div className="form-icon">
                  <Input type="number" className="form-control form-control-icon" value={0.00} id="iconInput" placeholder="0.00" />
                  <i className="bx bx-dollar"></i>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6}>
              <div>
                <Label htmlFor="iconInput" className="form-label">Lift Access Charge per CBM (m3)</Label>
                <div className="form-icon">
                  <Input type="number" className="form-control form-control-icon" value={0.00} id="iconInput" placeholder="0.00" />
                  <i className="bx bx-dollar"></i>
                </div>
              </div>
            </Col>
          </Row>
          <h5>Fixed Rate Calculation:</h5>
          <hr></hr>
          <Row className="mb-3">
            <Col lg={6}>
              <div>
                <Label htmlFor="iconInput" className="form-label">Excess Range - Start Km</Label>
                <div className="form-icon">
                  <Input type="number" className="form-control " value={0.00} id="iconInput" placeholder="0.00" />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6}>
              <div>
                <Label htmlFor="iconInput" className="form-label">Excess Range - Max Km</Label>
                <div className="form-icon">
                  <Input type="number" className="form-control " value={0.00} id="iconInput" placeholder="0.00" />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6}>
              <div>
                <Label htmlFor="iconInput" className="form-label">Price per Excess Km</Label>
                <div className="form-icon">
                  <Input type="number" className="form-control form-control-icon" value={0.00} id="iconInput" placeholder="0.00" />
                  <i className="bx bx-dollar"></i>
                </div>
              </div>
            </Col>
          </Row>
          <h5>Quote Deposit: </h5>
          <hr></hr>
          <Row className="mb-3">
            <Col lg={6}>
              <Label className="form-label">Is Deposit a Fixed Amount?</Label>
              <div className="form-check form-switch form-switch-lg" dir="ltr">
                <Input type="checkbox" className="form-check-input" id="customSwitchsizelg" defaultChecked="" />
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6}>
              <div>
                <Label htmlFor="iconInput" className="form-label">Price per Excess Km</Label>
                <div className="form-icon">
                  <Input type="number" className="form-control form-control-icon" value={10.00} id="iconInput" placeholder="0.00" />
                  <i className="bx bx-dollar"></i>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div>
                <Label htmlFor="iconInput" className="form-label">Deposit Percent</Label>
                <div className="form-icon">
                  <Input type="number" className="form-control " disabled value={25} id="iconInput" placeholder="0.00" />

                </div>
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
