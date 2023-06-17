import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Accordion, AccordionItem, Button, Card, CardBody, CardHeader, Col, Collapse, Table, Form, Label, Input, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Flatpickr from 'react-flatpickr';
import "./TableRowCss.css"
export const Storage = () => {
  const [rowsData, setRowsData] = useState([]);
  const [rowsData1, setRowsData1] = useState([]);
  const [newGroupNames, setNewGroupNames] = useState([]);

  //UseState for delete
  const [showModal,setShowModal]= useState(false)

  //useState for edit  
  const [editable, setEditable] = useState(false);
  const [storageJobNumber, setStorageJobNumber] = useState('1');
  const [moveIn, setMoveIn] = useState('2312/mm/dd');
  const [moveOut, setMoveOut] = useState('yyyy/mm/dd');
  const [status, setStatus] = useState('Active');
  const [volume, setVolume] = useState('0 cbm');

  const clickEdit = () => {
    setEditable(true);
  };

  const saveEdit = () => {
    // Save the updated values
    setEditable(false);
    // Perform any other necessary actions
  };

  const cancelEdit = () => {
    // Revert the changes
    setEditable(false);
    setStorageJobNumber('1');
    setMoveIn('2312/mm/dd');
    setMoveOut('yyyy/mm/dd');
    setStatus('Active');
    setVolume('0 cbm')
  };


  const addTableRows = () => {
    const rowsInput = {
      groupName: '',
    }
    setRowsData([...rowsData, rowsInput])
  }

  const addTableRows1 = () => {
    const rowsInput = {
      groupName: '',
    }
    setRowsData1([...rowsData1, rowsInput])
  }



  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    console.log(rows)
    rows.splice(index, 1);
    setRowsData(rows);
  }

  const deleteTableRows1 = (index) => {
    const rows = [...rowsData1];
    console.log(rows)
    rows.splice(index, 1);
    setRowsData1(rows);
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <h5>Reservation</h5>
        </CardHeader>
        <CardBody>
          <div className='form-check mb-2'>
            <Input className='form-check-input' type='checkbox' id='formCheck1' />
            <Label className='form-check-label' for='formCheck1'>
              <b>Enable End Date</b>
            </Label>
          </div>
          <Row className='hstack gap-3 mt-3'>
            <Col lg={3} className='mt-3'>
              <Label><h6>Storage Type</h6></Label>
              <select className='form-select mb-3' aria-label='Default select example'>
                <option >20' COntainer</option>
                <option defaultValue='1'>40' COntainer</option>
                <option defaultValue='2'>Capsule New</option>
                <option defaultValue='3'>Container</option>
              </select>
            </Col>
            <Col lg={3} className='mt-3'>
              <Label><h6>Location</h6></Label>
              <select className='form-select mb-3' aria-label='Default select example'>
                <option >Ware</option>
                <option defaultValue='1'>Sydney Warehouse</option>
              </select>
            </Col>
            <Col lg={3}>
              <Label><h6>Start Date</h6></Label>
              <Flatpickr
                className='form-control'
                options={{
                  dateFormat: 'd M, Y',
                  defaultDate: ['2022-01-20']
                }}
              />
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col lg={9} className='text-muted'>
              <p > *Use the search when you want to add a new resrvation <br />Enter the parameters for the search and click on the Search</p>
            </Col>
            <Col lg={3} className='hstack gap-3'>
              <Button className='btn btn-success'>Search</Button>
              <Button className='btn btn-dark'>Reset</Button>

            </Col>
          </Row>
          <Table className='mt-5 table-bordered'>
              <thead className='bg-soft-purple'>
                <tr>
                  <th>Storage Job Number</th>
                  <th>Move In</th>
                  <th>Move Out</th>
                  <th>Status</th>
                  <th>Volume</th>
                  <th>  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{editable ? <input className="w-100 form-control" type="text" value={storageJobNumber} onChange={(e) => setStorageJobNumber(e.target.value)} /> :storageJobNumber}</td>
                  <td>{editable ? <input className="w-100 form-control" type="text" value={moveIn} onChange={(e) => setMoveIn(e.target.value)} /> : moveIn}</td>
                  <td>{editable ? <input className="w-100 form-control" type="text" value={moveOut} onChange={(e) => setMoveOut(e.target.value)} /> : moveOut}</td>
                  <td>{editable ? <input className="w-100 form-control" type="text" value={status} onChange={(e) => setStatus(e.target.value)} /> : status}</td>
                  <td>{editable ? <input className="w-100 form-control" type="text" value={volume} onChange={(e) => setVolume(e.target.value)} /> : volume}</td>
                  <td className='hstack gap-2'>
                    {editable ? (
                      <>
                        <button className='btn btn-sm btn-soft-success' onClick={saveEdit}>
                          Save
                        </button>
                        <button className='btn btn-sm btn-soft-danger' onClick={cancelEdit}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <div className='d-flex'>  
                      <button className='btn btn-sm btn-soft-info editBtn' onClick={clickEdit}>
                        Edit
                      </button>
                      <button
                      className=' btn btn-sm btn-soft-danger fs-13 pt-1 editBtn' onClick={()=>setShowModal(true)} >
                      <i className='bx bxs-trash fs-12 dltFont' style={{ fontSize:"40px" }}></i>
                    </button> 
                    </div>
                    )}
                  
                  </td>
                </tr>
                
                {rowsData.map((data, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        // value={newGroupNames[index] || ''}
                        // onChange={(event) => handleNewChange(index, event)}
                        name="groupName"
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input className='form-control'/>
                    </td>
                    <td> <input className='form-control'/> </td>
                    <td> <input className='form-control'/> </td>
                    <td> <input className="form-control"/> </td>
                    <td>
                      <div className="hstack gap-2">
                        <button className="btn btn-success" >
                          Save
                        </button>
                        <button className="btn btn-primary" onClick={() => deleteTableRows(index)}>
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
          </Table>
          <Button className='btn btn-brown mt-3' onClick={addTableRows} >+</Button>
          <Table className='mt-5 table-bordered' >
              <thead className='bg-soft-purple'>
                <tr>
                  <th>Storage Unit</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> No Reservations found!</td>
                </tr>
              </tbody>
          </Table>
          <Table>
            <tbody>
            {rowsData1.map((data, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        // value={newGroupNames[index] || ''}
                        // onChange={(event) => handleNewChange(index, event)}
                        name="groupName"
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input className='form-control'/>
                    </td>
                    <td> <input className='form-control'/> </td>
                    <td> <input className='form-control'/> </td>
                    <td> <input className="form-control"/> </td>
                    <td>
                      <div className="hstack gap-2">
                        <button className="btn btn-success" >
                          Save
                        </button>
                        <button className="btn btn-primary" onClick={() => deleteTableRows1(index)}>
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Button className='btn btn-brown mt-3' onClick={addTableRows1} >+</Button>
        </CardBody>
      </Card>
      {/* <Card>
        <CardHeader>
          <h5>Invoice</h5>
        </CardHeader>
        <CardBody>
          <p className='text-muted'>Add an invoice in this section only if you want the Storage invoice seperate from the Removals job invoice</p>
          <Table className='table-bordered mt-4'>
            <thead className='bg-soft-purple'>
              <tr>
                <th>Item Name & Description</th>
                <th>Tax</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Total Inc Tax</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No record available!</td>
              </tr>
            </tbody>
          </Table>
          <Button className='btn btn-brown' onClick={addTableRows} >+</Button>
          <Row>
            <Col lg={6}></Col>
            <Col lg={6}>
              <Table className='table-bordered '>
                <tbody>
                  <tr>
                    <th className='bg-soft-purple'><span>Total (excl tax)</span></th>
                    <td><span id='grand_total_tax'>$16.00</span></td>
                  </tr>
                  <tr>
                    <th className='bg-soft-purple'><span>Tax</span></th>
                    <td><span id='grand_total_incl_tax'>$7.00</span></td>
                  </tr>
                  <tr>
                    <th className='bg-soft-purple'><span>Total (incl tax)</span></th>
                    <td><span id='grand_total_incl_tax'>$177.00</span></td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card> */}
      {/* <Card>
        <CardHeader>
          <span className='badge badge-soft-success badge-border fs-14 mt=3'>PAYMENTS</span>
        </CardHeader>
        <CardBody>
          <Table className='table-bordered mt-4'>
            <thead className='bg-soft-purple'>
              <tr>
                <th>Payment Method</th>
                <th>Reference / Notes</th>
                <th>Paid on</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No record available!</td>
              </tr>
            </tbody>
          </Table>
          <Button className='btn btn-brown' onClick={addTableRows} >+</Button>
        </CardBody>
        <Row>
          <Col lg={6}></Col>
          <Col lg={6}>
            <Table className='table-bordered '>
              <tbody>
                <tr>
                  <th className='bg-soft-purple'><span>Payments</span></th>
                  <td><span id='grand_total_tax'>$16.00</span></td>
                </tr>
                <tr>
                  <th className='bg-soft-purple'><span>Balance</span></th>
                  <td><span id='grand_total_incl_tax'>$177.00</span></td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Card> */}
      <Modal id='showModal' className='modal-dialog-edit' isOpen={showModal} toggle={()=>setShowModal(false)} centered>
      <ModalBody className='py-2 px-3'>
            <div className='mt-2 text-center'>
            <lord-icon
                src='https://cdn.lordicon.com/wdqztrtx.json'
                trigger='loop'
                colors='primary:#912a4e,secondary:#f06548'
                style={{ width: '100px', height: '100px' }}
            ></lord-icon>
            <div className='mt-4 pt-2 fs-15 mx-4 mx-sm-5'>
                <h4>Are you sure ?</h4>
                <p className='text-muted mx-4 mb-0'>
                Do you want to delete this storage job and release the storage units?
                </p>
            </div>
            </div>
            <div className='d-flex gap-2 justify-content-center mt-4 mb-2'>
            <button
                type='button'
                className='btn w-sm btn-light'
                data-bs-dismiss='modal'
                onClick={()=>setShowModal(false)}>
            Cancel
            </button>
            <button
                type='button'
                className='btn w-sm btn-danger '
                id='delete-record'
            >
            Ok
            </button>
            </div>
            </ModalBody>
      </Modal>
    </div>
  )
}
