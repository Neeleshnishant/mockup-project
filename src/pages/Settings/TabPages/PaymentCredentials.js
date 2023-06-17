import { Card, CardBody, Col, Row, } from "reactstrap";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import "../../../assets/scss/pages/_settings.scss";

import {
  CardHeader,
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
// Export Modal

export const PaymentCredentials = () => {
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

  const TablesWithoutBorders = () => {
    const code = `<div className="table-responsive">
  <Table className="table-borderless align-middle table-nowrap mb-0">
      <thead>
          <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Job Title</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td className="fw-medium">01</td>
              <td>Annette Black</td>
              <td>Industrial Designer</td>
              <td>10, Nov 2021</td>
              <td><span className="badge badge-soft-success">Active</span></td>
              <td>
                  <div className="hstack gap-3 fs-15">
                      <Link to="#" className="link-primary"><i className="ri-settings-4-line"></i></Link>
                      <Link to="#" className="link-danger"><i className="ri-delete-bin-5-line"></i></Link>
                  </div>
              </td>
          </tr>
          <tr>
              <td className="fw-medium">02</td>
              <td>Bessie Cooper</td>
              <td>Graphic Designer</td>
              <td>13, Nov 2021</td>
              <td><span className="badge badge-soft-success">Active</span></td>
              <td>
                  <div className="hstack gap-3 fs-15">
                      <Link to="#" className="link-primary"><i className="ri-settings-4-line"></i></Link>
                      <Link to="#" className="link-danger"><i className="ri-delete-bin-5-line"></i></Link>
                  </div>
              </td>
          </tr>
          <tr>
              <td className="fw-medium">03</td>
              <td>Leslie Alexander</td>
              <td>Product Manager</td>
              <td>17, Nov 2021</td>
              <td><span className="badge badge-soft-success">Active</span></td>
              <td>
                  <div className="hstack gap-3 fs-15">
                      <Link to="#" className="link-primary"><i className="ri-settings-4-line"></i></Link>
                      <Link to="#" className="link-danger"><i className="ri-delete-bin-5-line"></i></Link>
                  </div>
              </td>
          </tr>
          <tr>
              <td className="fw-medium">04</td>
              <td>Lenora Sandoval</td>
              <td>Applications Engineer</td>
              <td>25, Nov 2021</td>
              <td><span className="badge badge-soft-danger">Disabled</span></td>
              <td>
                  <div className="hstack gap-3 fs-15">
                      <Link to="#" className="link-primary"><i className="ri-settings-4-line"></i></Link>
                      <Link to="#" className="link-danger"><i className="ri-delete-bin-5-line"></i></Link>
                  </div>
              </td>
          </tr>
      </tbody>
  </Table>
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
        <CardHeader> <Row>
          <Col md={9} className="paymentCredHead"><h5 className="mb-0 text-primary">Offline Payment Method</h5></Col>
          <Col md={3} className="paycredBtn"><Button className="btn btn-success"> Top Up and Save  </Button></Col>
        </Row></CardHeader>

        <Col lg={12}>
          <CardBody>

            <div className="live-preview">
              <div className="table-responsive">
                <Table className="table-bordered align-middle table-nowrap mb-0">
                  <thead className="bg-light">
                    <tr >
                      <th scope="col" >#</th>
                      <th scope="col" >Name</th>
                      <th scope="col" >Job Title</th>
                      <th scope="col" >Date</th>
                      <th scope="col" >Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-medium">01</td>

                      <td>Industrial Designer</td>
                      <td>10, Nov 2021</td>
                      <td><span className="badge badge-soft-success">Active</span></td>
                      <td>
                        <div className="hstack gap-3 fs-15">
                          <Link to="#" className="link-primary"><i className="ri-settings-4-line"></i></Link>
                          <Link to="#" className="link-danger"><i className="ri-delete-bin-5-line"></i></Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-medium">02</td>

                      <td>Graphic Designer</td>
                      <td>13, Nov 2021</td>
                      <td><span className="badge badge-soft-success">Active</span></td>
                      <td>
                        <div className="hstack gap-3 fs-15">
                          <Link to="#" className="link-primary"><i className="ri-settings-4-line"></i></Link>
                          <Link to="#" className="link-danger"><i className="ri-delete-bin-5-line"></i></Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-medium">03</td>

                      <td>Product Manager</td>
                      <td>17, Nov 2021</td>
                      <td><span className="badge badge-soft-success">Active</span></td>
                      <td>
                        <div className="hstack gap-3 fs-15">
                          <Link to="#" className="link-primary"><i className="ri-settings-4-line"></i></Link>
                          <Link to="#" className="link-danger"><i className="ri-delete-bin-5-line"></i></Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-medium">04</td>

                      <td>Applications Engineer</td>
                      <td>25, Nov 2021</td>
                      <td><span className="badge badge-soft-danger">Disabled</span></td>
                      <td>
                        <div className="hstack gap-3 fs-15">
                          <Link to="#" className="link-primary"><i className="ri-settings-4-line"></i></Link>
                          <Link to="#" className="link-danger"><i className="ri-delete-bin-5-line"></i></Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </CardBody>
        </Col>
      </Card>

    </div>
  )
}
