import { Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, Alert, UncontrolledAlert, TabContent, TabPane, UncontrolledTooltip } from "reactstrap";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from 'reactstrap';
import { isEmpty } from "lodash";
import "../../../assets/scss/pages/_settings.scss";
import {
  CardHeader,
  Label,
  Input,
} from "reactstrap";
import Select from "react-select";
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

export const OrganizationSetting = () => {
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


  const SingleOptions = [
    { value: 'Choices 1', label: 'Choices 1' },
    { value: 'Choices 2', label: 'Choices 2' },
    { value: 'Choices 3', label: 'Choices 3' },
    { value: 'Choices 4', label: 'Choices 4' }
  ];

  const [selectedSingle, setSelectedSingle] = useState(null);

  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle);
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
      <Card id="contactList">
        <CardHeader><h5 className="mb-0 text-primary">Update Organization Settings</h5></CardHeader>
        <CardBody className="card-body">
          <div className="live-preview">
            <Row className="gy-4">
              <Col xxl={12} md={12}>
                <div>
                  <Label htmlFor="basiInput" className="form-label">Organisation Name</Label>
                  <Input type="password" className="form-control" id="basiInput" />
                </div>
              </Col>

              <Col xxl={12} md={12}>
                <div>
                  <Label className="form-label"> Organization Email</Label>
                  <Input type="Email" className="form-control" />
                </div>
              </Col>

              <Col xxl={12} md={12}>
                <div>
                  <Label htmlFor="placeholderInput" className="form-label">Organisation Phone</Label>
                  <Input type="text" className="form-control" id="placeholderInput" defaultValue="0390000002" />
                </div>
              </Col>

              <Col xxl={12} md={12}>
                <div>
                  <Label className="form-label">Organization Website</Label>
                  <Input type="text" className="form-control" defaultValue="" />
                </div>
              </Col>
              <Col xxl={12} md={12}>
                <div>
                  <Label htmlFor="readonlyInput" className="form-label">Organization Address</Label>
                  <textarea className="form-control" id="VertimeassageInput" rows="3" placeholder="Enter your message"></textarea>
                </div>
              </Col>

              <Col xxl={12} md={12}>
                <div >
                  <Label htmlFor="choices-single-default" className="form-label text-muted">Default Timezone</Label>
                  <Select
                    value={selectedSingle}
                    onChange={() => {
                      handleSelectSingle();
                    }}
                    options={SingleOptions}
                  />
                </div>
              </Col>

              <Col xxl={12} md={12}>
                <div>
                  <Label htmlFor="iconInput" className="form-label">Date Format</Label>
                  <Select
                    value={selectedSingle}
                    onChange={() => {
                      handleSelectSingle();
                    }}
                    options={SingleOptions}
                  />
                </div>
              </Col>

              <Col xxl={12} md={12}>
                <div>
                  <Label htmlFor="iconrightInput" className="form-label">Time format</Label>

                  <Select
                    value={selectedSingle}
                    onChange={() => {
                      handleSelectSingle();
                    }}
                    options={SingleOptions}
                  />
                </div>
              </Col>

              <Col xxl={12} md={12}>
                <div>
                  <Label htmlFor="exampleDataList" className="form-label">weekstart</Label>
                  <Select
                    value={selectedSingle}
                    onChange={() => {
                      handleSelectSingle();
                    }}
                    options={SingleOptions}
                  />

                </div>
              </Col>
              <Col xxl={12} md={12}>
                <div>
                  <Label htmlFor="exampleInputdate" className="form-label">Change Language</Label>

                  <Select
                    value={selectedSingle}
                    onChange={() => {
                      handleSelectSingle();
                    }}
                    options={SingleOptions}
                  />
                </div>
              </Col>
              <div className="text-center">
                <Button className="btn btn-success ">Update</Button>&nbsp;
                <Button className="btn btn-danger">Reset</Button>
              </div>
            </Row>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
