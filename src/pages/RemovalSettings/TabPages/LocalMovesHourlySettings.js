import { Card, CardBody, Col, Row,  } from "reactstrap";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import TableRows from "../TableRows";
import {
  CardHeader,
  Label,
  Input,
  Table,
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

import 'react-toastify/dist/ReactToastify.css';

export const LocalMovesHourlySettings = () => {

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
          <h5>Local Moves Hourly Settings</h5>
        </CardHeader>
        <CardBody>
          <div className="form-check form-check-right form-switch mb-3 " dir="ltr">
            <Input type="checkbox" className="form-check-input" id="customSwitchsizelg" defaultChecked />
            <Label className="form-check-label" for="customSwitchsizelg">Use Hourly Pricing for Local Move?</Label>
          </div>
          <Row className="mb-3">
            <Col lg={4} >
              <Label htmlFor="tier1input" className="form-label">Excess Minutes - Tier 1:     From 0 to </Label>
            </Col>
            <Col lg={8} className="mb-3" >
              <Input type="text" className="form-control" id="tier1input" placeholder="" />
            </Col>    
            <Col lg={4} >
              <Label htmlFor="tier2input" className="form-label">Excess Minutes - Tier 2:     From 0 to </Label>
            </Col>
            <Col lg={8} className="mb-3"  >
              <Input type="text" className="form-control" id="tier2input" placeholder=" " />
            </Col>     
            <Col lg={4} >
              <Label htmlFor="minpriceinp" className="form-label">Min Price as a percent of the  max quote price </Label>
            </Col>
            <Col lg={8} className="mb-3"  >
              <Input type="text" className="form-control" id="minpriceinp" value={0} placeholder="" />
            </Col>
            <Col lg={4} >
              <Label htmlFor="invoicehrsinp" className="form-label">Minimum hours for invoice </Label>
            </Col>
            <Col lg={8} className="mb-3" >
              <Input type="text" className="form-control" id="invoicehrsinp" placeholder="Enter your name" />
            </Col>
          </Row>
          <hr></hr>
          <h5>Include In The Price Calculation:</h5>
          <hr></hr>
          <Row className="mb-3">
            <Col lg={6} >
              <div className="form-check form-check-right form-switch mb-3 " dir="ltr">
                <Input type="checkbox" className="form-check-input " id="customSwitchsizelg" />
                <Label className="form-check-label" for="customSwitchsizelg">Time from Depot to Pickup Suburb</Label>
              </div>
            </Col>
            <Col lg={6} >
              <div className="form-check form-check-right form-switch mb-3 " dir="ltr">
                <Input type="checkbox" className="form-check-input" id="customSwitchsizelg" />
                <Label className="form-check-label" for="customSwitchsizelg">Time from Drop off Suburb to Depot</Label>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={4} >
              <div className="form-check form-check-right form-switch mb-3 " dir="ltr">
                <Input type="checkbox" className="form-check-input" id="customSwitchsizelg" defaultChecked />
                <Label className="form-check-label" for="customSwitchsizelg">Loading Time </Label>
              </div>
            </Col>
            <Col lg={8} >
              <div className="form-check form-check-right form-switch mb-3 " dir="ltr">
                <Input type="checkbox" className="form-check-input" id="customSwitchsizelg" defaultChecked />
                <Label className="form-check-label" for="customSwitchsizelg">Unloading Time</Label>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={4} >
              <div className="form-check form-check-right form-switch mb-3 " dir="ltr">
                <Input type="checkbox" className="form-check-input" id="customSwitchsizelg" defaultChecked />
                <Label className="form-check-label" for="customSwitchsizelg">Time from Pickup Suburb to Drop off Suburb</Label>
              </div>
            </Col>
          </Row>
          <hr></hr>
          <Row className="mb-3">
            <Col lg={4} >
              <div className="form-check form-check-right form-switch mb-3 " dir="ltr">
                <Input type="checkbox" className="form-check-input" id="customSwitchsizelg" defaultChecked />
                <Label className="form-check-label" for="customSwitchsizelg">Use Booking Fee Instead of Deposit?</Label>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={3} >
              <Label htmlFor="iconInput" className="form-label">Booking Fee</Label>
            </Col>
            <Col lg={3} >
              <div className="form-icon">
                <Input type="number" className="form-control form-control-icon" value={0.00} id="iconInput" placeholder="" />
                <i className="bx bx-dollar"></i>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={4} >
              <div className="form-check form-check-right form-switch mb-3 " dir="ltr">
                <Input type="checkbox" className="form-check-input" id="customSwitchsizelg" defaultChecked />
                <Label className="form-check-label" for="customSwitchsizelg">Is Deposit a Fixed Amount? </Label>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6}>
              <div>
                <Label htmlFor="iconInput" className="form-label">Deposit Amount</Label>
                <div className="form-icon">
                  <Input type="number" className="form-control form-control-icon" value={3000} id="iconInput" placeholder="" />
                  <i className="bx bx-dollar"></i>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div>
                <Label htmlFor="iconInput" className="form-label">Deposit Percent</Label>
                <div className="form-icon">
                  <Input type="number" className="form-control form-control-icon" value={10} id="iconInput" placeholder="" />
                  <i className="bx bx-dollar"></i>
                </div>
              </div>
            </Col>
          </Row>
          <hr></hr>
          <Col md={12}>
            <div className="text-left mb-3">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </Col>
          <h5>Truck Size Based Rates: </h5>

          <Row className="mb-3">
            <Col xl={12}>
              <div className="table-responsive mt-4 mt-xl-0">
                <Table className="table table-bordered table-nowrap align-middle mb-3">
                  <thead>
                    <tr>
                      <th scope="col">Min Volume (m3)</th>
                      <th scope="col">Max Volume (m3)</th>
                      <th scope="col">Truck Size (tons)</th>
                      <th scope="col">Loading Time (mins)</th>
                      <th scope="col">Unloading Time (mins)</th>
                      <th scope="col">Hourly Rate</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-medium">11</td>
                      <td className="fw-medium">18</td>
                      <td className="fw-medium">Study</td>
                      <td className="fw-medium">Bedroom</td>
                      <td className="fw-medium">Bedroom</td>
                      <td className="fw-medium">Bedroom</td>
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
          <h5>Regional Depots: </h5>
          <Row className="mb-3">
            <Col xl={12}>
              <div className="table-responsive mt-4 mt-xl-0">
                <Table className="table table-bordered table-nowrap align-middle mb-3">
                  <thead>
                    <tr>
                      <th scope="col">Region </th>
                      <th scope="col">Depot Suburb</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-medium">11</td>
                      <td className="fw-medium">18</td>
                    </tr>
                    <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
                  </tbody>
                </Table>
                <button className="btn btn-primary" onClick={addTableRows} >+</button>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  )
}
