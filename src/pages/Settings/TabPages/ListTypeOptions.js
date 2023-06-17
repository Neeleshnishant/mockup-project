import { Card, CardBody, Col, NavLink, Row,  } from "reactstrap";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from 'reactstrap';
import { Checklist } from "../TableRows";
import { isEmpty } from "lodash";
import "../../../assets/scss/pages/_settings.scss";
import {
  CardHeader,
  Label,
  Table,
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

export const ListTypeOptions = () => {
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
  // Vertical Nav Tabs

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

  const [tag, setTag] = useState([]);
  const [assignTag, setAssignTag] = useState([]);
  return (
    <div>
      <Card>
        <CardHeader>
          <h5 className="mb-0 text-primary">List Type</h5>
        </CardHeader>
        <CardBody>

          <Table className="table table-bordered table-nowrap align-middle mb-3">
            <thead className="bg-light">
              <tr>
                <th>
                  List Type
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td >Backloading Status</td>
              </tr>
              <tr>
                <td >Contact Type</td>
              </tr>
              <tr>
                <td >Job Status</td>
              </tr>
              <tr>
                <td >Job Type</td>
              </tr>
              <tr> <td >Job Type</td>
              </tr>
              <tr><td >Lead Info</td>
              </tr>
              <tr> <td >Leg Status</td>
              </tr>
              <tr>  <td >Op Frequency</td>
              </tr>
              <tr>
                <td >Payment Status</td>
              </tr>
              <tr>
                <td>Price Structure</td>
              </tr>
            </tbody>
          </Table>
          <h5 className="mb-0 text-primary"> List Options:  </h5>
          <div className="live-preview mb-3">
            <Row className="g-3">
              <Col xxl={6} md={6}>
                <div>
                  <Label htmlFor="iconInput" className="form-label"></Label>
                  <Select
                    value={selectedSingle}
                    onChange={() => {
                      handleSelectSingle();
                    }}
                    options={SingleOptions}
                  />
                </div>
              </Col>
            </Row>
            <br />

            <Button className="btn btn-brown"> Load List Options </Button>
          </div>
          <Table className="table table-bordered   align-middle mb-3">
            <thead className="bg-light">
              <tr>
                <th className="listTypeHead" >
                  ListType
                </th>
                <th>
                  ListOptions
                </th>
                <th>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="mb-3">
              <Checklist rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
            </tbody>
            <button className="btn btn-primary mt-3" onClick={addTableRows} >+</button>
          </Table>
        </CardBody>
      </Card>
    </div>
  )
}
