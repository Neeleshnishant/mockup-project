import React, { useState } from 'react'
import { Accordion, AccordionItem, Button, Card, CardBody, CardHeader, Col, Collapse, Table, Form, Label, Input, Container, Row } from 'reactstrap';
import "../../../assets/scss/pages/_opportunities.scss"
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
export const Removals = () => {

  const [colFrom, setColFrom] = useState(false);
  const t_colFrom = () => {
    setColFrom(!colFrom);
  };
  const [colTo, setColTo] = useState(false);
  const t_colTo = () => {
    setColTo(!colTo);
  };
  const [bookingDetails, setBookingdetails] = useState(false);
  const t_bookingDetails = () => {
    setBookingdetails(!bookingDetails);
  };
  const [propertyDetails, setPropertyDetails] = useState(false);
  const t_propertyDetails = () => {
    setPropertyDetails(!propertyDetails);
  };
  return (
    <div>
      <Row>
        <Col lg={3}>
          <h5 className='pt-2'> Opportunity # </h5>
        </Col>
        <Col lg={3}>
          <select className="form-select mb-3" aria-label="Default select example">
            <option >Moving 335</option>
          </select>
        </Col>
        <Col lg={6} className='hstack justify-content-end mb-3'>
          <Button className='btn btn-success'>Confirm Booking</Button>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Card>
            <CardHeader > <h5>MOVING FROM </h5></CardHeader>
            <CardBody className='b-left-3-o'>
              <Row>
                <Col lg={6} className='pt-2'>
                  <h6>Rose Bay NSW 2029</h6>
                </Col>
                <Col lg={6} className='hstack justify-content-end'>
                  <Button color="soft-success" onClick={t_colFrom} style={{ cursor: "pointer" }} >
                    <b><i className="bx bx-pencil"></i> </b>
                  </Button>
                </Col>
              </Row>
              <Collapse isOpen={colFrom} id="collapseWithicon">
                <div className="card mb-0">
                  <Col lg={12}>
                    <Label>Address</Label>
                    <Input className='form-control' placeholder='Enter a location'></Input>
                  </Col>
                  <Col lg={12} className='mt-2'>
                    <Label>Suburb</Label>
                    <Input className='form-control' placeholder='Rose' value="Rose Bay NSW"></Input>
                  </Col>
                  <Col lg={12} className='mt-2'>
                    <Label>Post Code</Label>
                    <Input className='form-control' placeholder='2029'></Input>
                  </Col>
                  <Col lg={12} className='mt-2'>
                    <Label>Access Instructions</Label>
                    <textarea rows={2} className='form-control'></textarea>
                  </Col>
                  <Col lg={12} className='mt-2'>
                    <Label>Bedroom</Label>
                    <Input className='form-control' placeholder='Enter a location'></Input>
                  </Col>
                  <div className='hstack gap-3 mt-3'>
                    <Button className='btn btn-light' onClick={() => { setColFrom() }}>Cancel</Button>
                    <Button className="btn btn-info">Update</Button>
                  </div>
                </div>
              </Collapse>

            </CardBody>
            <CardHeader> <h5> BOOKING DETAILS</h5></CardHeader>
            <CardBody className='b-left-3-o'>
              <Row>
                <Col lg={8}>
                  <Row>
                    <Col lg={7}>
                      <h6>Opportunity</h6>
                    </Col>
                    <Col lg={5}>335</Col>
                  </Row>
                  <Row>
                    <Col lg={7}>
                      <h6>Estimated Job Date</h6>
                    </Col>
                    <Col lg={5}>08/mm/yyyy</Col>
                  </Row>
                  <Row>
                    <Col lg={7}>
                      <h6>Company</h6>
                    </Col>
                    <Col lg={5}>Onexfort</Col>
                  </Row>
                </Col>
                <Col lg={4} className='hstack justify-content-end'>
                  <Button color="soft-success" onClick={t_bookingDetails} style={{ cursor: "pointer" }} >
                    <b><i className="bx bx-pencil"></i> </b>
                  </Button>
                </Col>

              </Row>
              <Collapse isOpen={bookingDetails} id="collapseWithicon">
                <div className="card mb-0">
                  <Col lg={12}>
                    <Label>Estimated Job Date</Label>
                    <Flatpickr
                      className="form-control"
                      options={{
                        dateFormat: "d M, Y",
                        defaultDate: ["2022-01-20"]
                      }}
                    />
                  </Col>
                  <Col lg={12} className='mt-2'>
                    <Label>Company</Label>
                    <select className="form-select " aria-label="Default select example">
                      <option defaultValue="1">Onexfort</option>
                      <option defaultValue="2">Box Removals</option>
                    </select>
                  </Col>
                  <Col lg={12} className='mt-2'>
                    <Label>Status</Label>
                    <select className="form-select" aria-label="Default select example">
                      <option defaultValue="1">New</option>
                      <option defaultValue="2">Quote sent</option>
                      <option defaultValue="3">Follow Up 1</option>
                      <option defaultValue="2">Follow Up 2</option>

                    </select>
                  </Col>

                  <div className='hstack gap-3 mt-3'>
                    <Button className='btn btn-light' onClick={() => { setBookingdetails() }}>Cancel</Button>
                    <Button className="btn btn-info">Update</Button>
                  </div>
                </div>
              </Collapse>
            </CardBody>
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <CardHeader > <h5>MOVING TO </h5></CardHeader>
            <CardBody className='b-left-3-g'>
              <Row>
                <Col lg={6} className='pt-2'>
                  <h6>RockFord Drive 2029</h6>
                </Col>
                <Col lg={6} className='hstack justify-content-end'>
                  <Button color="soft-success" onClick={t_colTo} style={{ cursor: "pointer" }} >
                    <b><i className="bx bx-pencil"></i> </b>
                  </Button>
                </Col>
              </Row>
              <Collapse isOpen={colTo} id="collapseWithicon">
                <div className="card mb-0">
                  <Col lg={12}>
                    <Label>Address</Label>
                    <Input className='form-control' placeholder='Enter a location'></Input>
                  </Col>
                  <Col lg={12} className='mt-2'>
                    <Label>Suburb</Label>
                    <Input className='form-control' placeholder='Rose' value="Rose Bay NSW"></Input>
                  </Col>
                  <Col lg={12} className='mt-2'>
                    <Label>Post Code</Label>
                    <Input className='form-control' placeholder='3330'></Input>
                  </Col>
                  <Col lg={12} className='mt-2'>
                    <Label>Access Instructions</Label>
                    <textarea rows={2} className='form-control'></textarea>
                  </Col>
                  <Col lg={12} className='mt-2'>
                    <Label>Bedroom</Label>
                    <Input className='form-control' placeholder='Enter a location'></Input>
                  </Col>
                  <div className='hstack gap-3 mt-3'>
                    <Button className='btn btn-light' onClick={() => { setColTo() }}>Cancel</Button>
                    <Button className="btn btn-info">Update</Button>
                  </div>
                </div>
              </Collapse>

            </CardBody>
            <CardHeader> <h5> PROPERTY DETAILS</h5></CardHeader>
            <CardBody className='b-left-3-g'>
              <Row className='mb-2'>
                <Col lg={8}>
                  <Row className='mt-2'>
                    <Col lg={7}>
                      <h6>Property Type</h6>
                    </Col>
                    <Col lg={5}></Col>
                  </Row>
                  <Row className='mt-2'>
                    <Col lg={7}>
                      <h6>Furnishing</h6>
                    </Col>
                    <Col lg={5}></Col>
                  </Row>
                  <Row className='mt-2'>
                    <Col lg={7}>
                      <h6>Bedrooms</h6>
                    </Col>
                    <Col lg={5}></Col>
                  </Row>
                  <Row className='mt-2 mb-3'>
                    <Col lg={7}>
                      <h6>Living Area</h6>
                    </Col>
                    <Col lg={5}></Col>
                  </Row>
                </Col>

                <Col lg={4} className='hstack justify-content-end'>
                  <Button color="soft-success" onClick={t_propertyDetails} style={{ cursor: "pointer" }} >
                    <b><i className="bx bx-pencil"></i> </b>
                  </Button>
                </Col>
                <hr></hr>
                <h6>Other Rooms:</h6>
                <Row className='mt-2 mb-2'>
                  <Col lg={4}>
                    <i className='bx bx-checkbox'></i> Garage
                  </Col>
                  <Col lg={4}>
                    <i className='bx bx-checkbox'></i> Garden shed
                  </Col>
                  <Col lg={4}>
                    <i className='bx bx-checkbox'></i> Fitness room
                  </Col>
                  <Col lg={4}>
                    <i className='bx bx-checkbox'></i> Playroom
                  </Col>
                  <Col lg={4}>
                    <i className='bx bx-checkbox'></i> Study
                  </Col>
                  <Col lg={4}>
                    <i className='bx bx-checkbox'></i> Workshop
                  </Col>
                  <Col lg={4}>
                    <i className='bx bx-checkbox'></i> Storage room
                  </Col>
                  <Col lg={6}>
                    <i className='bx bx-checkbox'></i> Outdoor furniture
                  </Col>
                </Row>
                <h6>Speciality Items:</h6>
                <Row className='mt-2'>
                  <Col lg={4}>
                    <i className='bx bx-checkbox'></i> Piano
                  </Col>
                  <Col lg={4}>
                    <i className='bx bx-checkbox'></i> Cross Trainer
                  </Col>
                  <Col lg={4}>
                    <i className='bx bx-checkbox'></i> Treadmill
                  </Col>
                </Row>
                <h6 className='mt-2'>Instructions:</h6>

              </Row>
              <Collapse isOpen={propertyDetails} id="collapseWithicon">
                <div className="card mb-0">
                  <Col lg={12} className='mt-2'>
                    <Label>Property Type</Label>
                    <select className="form-select " aria-label="Default select example">
                      <option defaultValue="1">Flat</option>
                      <option defaultValue="2">House</option>
                      <option defaultValue="3">Business</option>
                      <option defaultValue="4">Storage Facility</option>
                    </select>
                  </Col>
                  <Col lg={12} className='mt-2'>
                    <Label>Furnishing</Label>
                    <select className="form-select" aria-label="Default select example">
                      <option defaultValue="1">Lightly Furnished</option>
                      <option defaultValue="2">Medium Furnished</option>
                      <option defaultValue="3">Heavily Furnished</option>
                    </select>
                  </Col>
                  <Col lg={12} className='mt-2'>
                    <Label>Bedrooms</Label>
                    <select className="form-select" aria-label="Default select example">
                      <option defaultValue="1">None</option>
                      <option defaultValue="2">1 Bedroom</option>
                      <option defaultValue="3">2 Bedroom</option>
                    </select>
                  </Col>
                  <Col lg={12} className='mt-2'>
                    <Label>Living Areas</Label>
                    <select className="form-select" aria-label="Default select example">
                      <option defaultValue="1">1 Living Area</option>
                      <option defaultValue="2">2 Living Areas</option>
                      <option defaultValue="3">3 Living Areas</option>
                    </select>
                  </Col>
                  <hr></hr>
                  <h6>Other Rooms:</h6>
                  <Row className='mt-2 mb-2'>
                    <Col lg={4}>
                      <div className="form-check mb-2">
                        <Input className="form-check-input" type="checkbox" id="formCheck1" />
                        <Label className="form-check-label" for="formCheck1">
                          Garage
                        </Label>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="form-check mb-2">
                        <Input className="form-check-input" type="checkbox" id="formCheck1" />
                        <Label className="form-check-label" for="formCheck1">
                          Garden shed
                        </Label>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="form-check mb-2">
                        <Input className="form-check-input" type="checkbox" id="formCheck1" />
                        <Label className="form-check-label" for="formCheck1">
                          Fitness room
                        </Label>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="form-check mb-2">
                        <Input className="form-check-input" type="checkbox" id="formCheck1" />
                        <Label className="form-check-label" for="formCheck1">
                          Playroom
                        </Label>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="form-check mb-2">
                        <Input className="form-check-input" type="checkbox" id="formCheck1" />
                        <Label className="form-check-label" for="formCheck1">
                          Study
                        </Label>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="form-check mb-2">
                        <Input className="form-check-input" type="checkbox" id="formCheck1" />
                        <Label className="form-check-label" for="formCheck1">
                          Workshop
                        </Label>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="form-check mb-2">
                        <Input className="form-check-input" type="checkbox" id="formCheck1" />
                        <Label className="form-check-label" for="formCheck1">
                          Storage room
                        </Label>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="form-check mb-2">
                        <Input className="form-check-input" type="checkbox" id="formCheck1" />
                        <Label className="form-check-label" for="formCheck1">
                          Outdoor furniture
                        </Label>
                      </div>
                    </Col>
                  </Row>
                  <h6>Speciality Items:</h6>
                  <Row className='mt-2'>
                    <Col lg={4}>
                      <div className="form-check mb-2">
                        <Input className="form-check-input" type="checkbox" id="formCheck1" />
                        <Label className="form-check-label" for="formCheck1">
                          Piano
                        </Label>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="form-check mb-2">
                        <Input className="form-check-input" type="checkbox" id="formCheck1" />
                        <Label className="form-check-label" for="formCheck1">
                          Cross Trainer
                        </Label>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="form-check mb-2">
                        <Input className="form-check-input" type="checkbox" id="formCheck1" />
                        <Label className="form-check-label" for="formCheck1">
                          Treadmill
                        </Label>
                      </div>
                    </Col>
                    <h6>Instructions:</h6>
                    <Col lg={12}>
                      <textarea rows={2} className='form-control mt-2' />
                    </Col>
                  </Row>

                  <div className='hstack gap-3 mt-3'>
                    <Button className='btn btn-light' onClick={() => { setPropertyDetails() }}>Cancel</Button>
                    <Button className="btn btn-info">Update</Button>
                  </div>
                </div>
              </Collapse>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
