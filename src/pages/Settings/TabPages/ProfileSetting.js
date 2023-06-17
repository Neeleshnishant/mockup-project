import { Card, CardBody, Col, Row } from "reactstrap";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import img3 from "../../../assets/images/small/img-3.jpg";
import { Button } from 'reactstrap';
import { isEmpty } from "lodash";
import "../../../assets/scss/pages/_settings.scss";

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
import 'react-toastify/dist/ReactToastify.css';


export const ProfileSetting = () => {
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
          <h5 className="mb-0 text-primary">Update Profile Info</h5>
        </CardHeader>
        <CardBody>
          <Col xxl={12}>

            <div className="live-preview">
              <Row className="gy-4">
                <Col xxl={12} md={12}>
                  <div>
                    <Label htmlFor="basiInput" className="form-label">Your Name</Label>
                    <Input type="text" className="form-control" id="readonlyInput" />
                  </div>
                </Col>

                <Col xxl={12} md={12}>
                  <div>
                    <Label className="form-label"> Your Email</Label>
                    <Input type="Email" className="form-control" />
                  </div>
                </Col>

                <Col xxl={12} md={12}>
                  <div>
                    <Label htmlFor="placeholderInput" className="form-label"> Your Password</Label>
                    <Input type="Password" className="form-control" id="placeholderInput" placeholder="********" />
                  </div>
                  Lev Blank to keep your current Password
                </Col>

                <Col xxl={12} md={12}>
                  <div>
                    <Label htmlFor="valueInput" className="form-label">Your Mobile Number</Label>
                    <Input type="Mobile" className="form-control" id="valueInput" defaultValue="01100000" />
                  </div>
                </Col>

                <Col xxl={12} md={12}>
                  <div>
                    <Label htmlFor="readonlyInput" className="form-label">Gender</Label>
                    <Input type="text" className="form-control" id="readonlyInput" readOnly />
                  </div>
                </Col>

                <Col xxl={12} md={12}>
                  <div className="mb-3">
                    <Label htmlFor="choices-single-default" className="form-label text-muted">Your Address</Label>
                    <Input type="text" className="form-control" id="readonlyInput" readOnly />
                  </div>

                </Col>
                <Col xxl={12} md={12}>
                  <div className="mb-3">
                    <Label htmlFor="choices-single-default" className="form-label text-muted">Profile Picture</Label>
                    <Row className="mb-2">
                      <Col md={4} >
                        <img className="img-thumbnail" alt="200x200" src={img3} />
                      </Col>
                    </Row>
                    <Button className="btn btn-info" > Select image </Button>
                  </div>
                </Col>
              </Row>
            </div>

          </Col>
          <hr></hr>
          <div className="text-center">
            <Button className="btn btn-success" >Update</Button> &nbsp;
            <Button className="btn btn-dark" >Reset</Button>
          </div>
        </CardBody>

      </Card>
    </div>
  )
}
