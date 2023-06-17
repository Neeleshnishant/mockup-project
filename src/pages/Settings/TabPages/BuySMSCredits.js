import { Card, CardBody, Col, Container, Row, } from "reactstrap";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from 'reactstrap';
import { isEmpty } from "lodash";
import "../../../assets/scss/pages/_settings.scss";
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

export const BuySMSCredits = () => {
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


  const StripedColumnsTables = () => {
    const code = `<div className="table-responsive table-card">
      <table className="table align-middle table-nowrap table-striped-columns mb-0">
          <thead className="table-light">
              <tr>
                  <th scope="col" style={{width: "46px"}}>
                      <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="" id="cardtableCheck" />
                          <label className="form-check-label" htmlFor="cardtableCheck"></label>
                      </div>
                  </th>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                  <th scope="col" style={{width: "150px"}}>Action</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>
                      <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="" id="cardtableCheck01" />
                          <label className="form-check-label" htmlFor="cardtableCheck01"></label>
                      </div>
                  </td>
                  <td><a href="#" className="fw-medium">#VL2110</a></td>
                  <td>William Elmore</td>
                  <td>07 Oct, 2021</td>
                  <td>$24.05</td>
                  <td><span className="badge bg-success">Paid</span></td>
                  <td>
                      <button type="button" className="btn btn-sm btn-light">Details</button>
                  </td>
              </tr>
              <tr>
                  <td>
                      <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="" id="cardtableCheck02" />
                          <label className="form-check-label" htmlFor="cardtableCheck02"></label>
                      </div>
                  </td>
                  <td><a href="#" className="fw-medium">#VL2109</a></td>
                  <td>Georgie Winters</td>
                  <td>07 Oct, 2021</td>
                  <td>$26.15</td>
                  <td><span className="badge bg-success">Paid</span></td>
                  <td>
                      <button type="button" className="btn btn-sm btn-light">Details</button>
                  </td>
              </tr>
              <tr>
                  <td>
                      <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="" id="cardtableCheck03" />
                          <label className="form-check-label" htmlFor="cardtableCheck03"></label>
                      </div>
                  </td>
                  <td><a href="#" className="fw-medium">#VL2108</a></td>
                  <td>Whitney Meier</td>
                  <td>06 Oct, 2021</td>
                  <td>$21.25</td>
                  <td><span className="badge bg-danger">Refund</span></td>
                  <td>
                      <button type="button" className="btn btn-sm btn-light">Details</button>
                  </td>
              </tr>
              <tr>
                  <td>
                      <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="" id="cardtableCheck04" />
                          <label className="form-check-label" htmlFor="cardtableCheck04"></label>
                      </div>
                  </td>
                  <td><a href="#" className="fw-medium">#VL2107</a></td>
                  <td>Justin Maier</td>
                  <td>05 Oct, 2021</td>
                  <td>$25.03</td>
                  <td><span className="badge bg-success">Paid</span></td>
                  <td>
                      <button type="button" className="btn btn-sm btn-light">Details</button>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
      `

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
        <CardHeader><h5 className="mb-0 text-brown">Buy SMS Credits</h5></CardHeader>
        <CardBody>
          <Row>
            <Col md={6}>
              <Label className="form-label text-black">Credits</Label>
              <Input type="Text" className="form-control" id="basiInput" />
              <p><span className="text-dark">1 credit = 1 sms at 7 cents per sms</span></p>
            </Col>
            <Col md={1}></Col>
            <Col md={5} className="mt-4">
              <Row>
                <Col md="2">
                  <span href="#" className="btn bg-transparent border-success text-success rounded-pill border-2 btn-icon mr-3">
                    <i className="bx bx-coin-stack icnCoin"></i>
                  </span>
                </Col>
                <Col md="10">
                  <span className="SMSCred">218
                    <p className="SMSCred-light">Available Credits</p></span>
                </Col>
              </Row>
            </Col>

          </Row>
          <div>
            <Button className="btn btn-brown  mb-1"> Buy</Button>
          </div>
          <hr></hr>
          <h5>Auto Top Up</h5>
          <Row className="mb-2">
            <Col lg={1}>
              <span className="form-check form-switch form-check-right mb-2">
                <Input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckRightDisabled" defaultChecked />
                <Label className="form-check-label pad-left" for="flexSwitchCheckRightDisabled">Off</Label>
              </span></Col>
            <Col lg={1} className="remove-padding">
              <span className="form-check mb-2">
                <Label className="form-check-label" for="flexSwitchCheckRightDisabled">On</Label>
              </span>
            </Col>
          </Row>

          <Table className="table table-bordered table-nowrap align-middle mb-3">
            <thead className="bg-light">
              <tr>
                <th>
                  Stripe Customer Id: cus_LHBW9lLEQIyVgp
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  When my balance falls below
                </td>
                <td><Input type="Text" className="form-control" id="basiInput" /></td>
              </tr>
              <tr>
                <td>
                  Then top up my balance by
                </td>
                <td><Input type="Text" className="form-control" id="basiInput" /></td>
              </tr>
            </tbody>
          </Table>
          <Button className="btn btn-success mb-3"> Top Up and Save  </Button>
          <h5 className="mb-3">SMS Purchases</h5>

          <table className="table align-middle table-nowrap table-striped-columns mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">
                  Gateway</th>
                <th scope="col">Transaction ID</th>
                <th scope="col">Transaction Date</th>
                <th scope="col">Credit Purchased</th>
                <th>Status</th>
                <th scope="col" style={{ width: "150px" }}>Payment Amount</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td>William Elmore</td>
                <td>William Elmore</td>
                <td>07 Oct, 2021</td>
                <td>$24.05</td>
                <td><span className="badge bg-success">Completed</span></td>
                <td>
                  <button type="button" className="btn btn-sm btn-primary">Details</button>
                </td>
              </tr>
              <tr>
                <td>Georgie Winters</td>
                <td>William Elmore</td>
                <td>07 Oct, 2021</td>
                <td>$26.15</td>
                <td><span className="badge bg-success">Completed</span></td>
                <td>
                  <button type="button" className="btn btn-sm btn-primary">Details</button>
                </td>
              </tr>
              <tr>
                <td>Whitney Meier</td>
                <td>William Elmore</td>
                <td>06 Oct, 2021</td>
                <td>$21.25</td>
                <td><span className="badge bg-danger">pending</span></td>
                <td>
                  <button type="button" className="btn btn-sm btn-primary">Details</button>
                </td>
              </tr>
              <tr>
                <td>Justin Maier</td>
                <td>William Elmore</td>
                <td>05 Oct, 2021</td>
                <td>$25.03</td>
                <td><span className="badge bg-success">Completed</span></td>
                <td>
                  <button type="button" className="btn btn-sm btn-primary">Details</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="d-none code-view">
            <pre className="language-markup" style={{ "height": "275px" }}>
              <code>
                <StripedColumnsTables />
              </code>
            </pre>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
