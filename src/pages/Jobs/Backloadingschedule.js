import React, { useState } from 'react';
import { Container, Card, Modal, ModalHeader, ModalBody, Label, Button, Row, Col, Table, Input } from 'reactstrap';
import "../../assets/scss/pages/_backloading-schedule.scss";
import Flatpickr from "react-flatpickr";
import angle1 from "../../assets/images/backloading/angle1.png";
import angle2 from "../../assets/images/backloading/angle2.png";
import arrow from "../../assets/images/backloading/arrow.png";
import calendar from "../../assets/images/backloading/calendar.png";
import car from "../../assets/images/backloading/car.png";


// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { SketchPicker } from "react-color";


const Backloading = () => {
    const [modal_assignModal, setmodal_assignModal] = useState(false);
    const [modal_createTrip, set_createTrip] = useState(false);

    function tog_assignModal() {
        setmodal_assignModal(!modal_assignModal);
    }
    function toggle_createTrip() {
        set_createTrip(!modal_createTrip);
    }

    //colorpicker
    const [colorCust, setcolorCust] = useState("rgba(95, 208, 243, 1)");
    const [display_Cust, setdisplay_Cust] = useState(false);
    function handleCust() {
        setdisplay_Cust(!display_Cust);
      }
      const onSwatchHover_Cust = (color) => {
        const format1 =
          "rgba(" +
          color.rgb.r +
          "," +
          color.rgb.g +
          "," +
          color.rgb.b +
          "," +
          color.rgb.a +
          ")";
          setcolorCust(format1);
      };
      
    //hover-dropdown
    const [showDropdown, setShowDropdown] = useState(false);

    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };
    document.title = "Widgets | Onexfort";
    return (
        <React.Fragment>
            <Modal
                size="lg"
                isOpen={modal_assignModal}
                toggle={() => {
                    tog_assignModal();
                }}
            >
                <ModalHeader>
                    <h5>Assign Jobs</h5>
                </ModalHeader>
                <hr></hr>
                <ModalBody>
                    <Label className="form-label mb-0">Date Range</Label>
                    <Row>
                        <Col lg={8}>
                            <div >

                                <Flatpickr
                                    className="form-control"
                                    options={{
                                        mode: "multiple",
                                        dateFormat: "Y-m-d",
                                        defaultDate: ["2022-01-20"]
                                    }}
                                />
                            </div>
                        </Col>
                        <Col lg={4} className='hstack gap-2'>
                            <Button className="btn btn-success">Apply</Button>
                            <Button className="btn btn-dark">Reset</Button>
                        </Col>
                    </Row>
                    <Table className='table-bordered mt-3'>
                        <thead>
                            <tr>
                                <th>Job # </th>
                                <th>Leg #</th>
                                <th>Name</th>
                                <th>CBM</th>
                                <th>Job Date</th>
                                <th>Pickup Suburb</th>
                                <th>Drop off Suburb</th>
                                <th>Job States</th>
                                <th>Payment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr></tr>

                        </tbody>
                    </Table>


                </ModalBody>
            </Modal>
            <Modal size="lg"
                isOpen={modal_createTrip}
                toggle={() => {
                    toggle_createTrip();
                }}>
                <ModalHeader>
                    <h5>Create New Trip</h5>
                </ModalHeader>
                <hr></hr>
                <ModalBody>
                    <Row className=''>
                        <Col lg={6}>
                            <Label>Trip Name</Label>
                            <Input className='Form-control'></Input>
                        </Col>
                        <Col lg={6}>
                            <Label>Trip Type</Label>
                            <Input className='Form-control'></Input>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col lg={6}>
                            <Label>From City</Label>
                            <Input className='Form-control'></Input>
                        </Col>
                        <Col lg={6}>
                            <Label>To City</Label>
                            <Input className='Form-control'></Input>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col lg={6}>
                            <Label>Trip Status</Label>
                            <select className="form-select mb-3" aria-label="Default select example">
                                <option >Scheduled</option>
                                <option defaultValue="1">IT Transit</option>
                                <option defaultValue="1">Completed</option>
                            </select>
                        </Col>
                        <Col lg={6}>
                            <Label>Color Picker</Label>
                            <div
                                className="monolith-colorpicker"
                                onClick={handleCust}
                            >
                                <i
                                    style={{
                                        height: "28px",
                                        width: "28px",
                                        background: colorCust,
                                        display: "block"
                                    }}
                                />
                            </div>

                            {display_Cust ? (
                                <SketchPicker
                                    color="#fff"
                                    value={colorCust}
                                    width="160px"
                                    onChangeComplete={onSwatchHover_Cust}
                                />
                            ) : null}
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col lg={6}>
                            <Label><h6>Estimated Start Date</h6></Label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                    dateFormat: "d M, Y",
                                    defaultDate: ["2022-01-20"]
                                }}
                            />
                        </Col>
                        <Col lg={6}>
                            <Label><h6>Estimated Finish Date</h6></Label>
                            <Flatpickr
                                className="form-control"
                                options={{
                                    dateFormat: "d M, Y",
                                    defaultDate: ["2022-01-20"]
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col lg={6}>
                            <Label>Vehicle</Label>
                            <Input className='Form-control' disabled value="20T Interstate Truck"></Input>
                        </Col>
                        <Col lg={6}>
                            <Label>Driver</Label>
                            <select className="form-select mb-3" aria-label="Default select example">
                                <option >Scheduled</option>
                                <option defaultValue="1">Ammy Driver</option>
                                <option defaultValue="1">Joe Davids</option>
                            </select>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col lg={12}>
                            <Label>Trip Notes</Label>
                            <textarea className='form-control' rows="2"></textarea>
                        </Col>
                    </Row>
                    <div className='mt-2 hstack gap-2 justify-content-end'>
                        <Button className='btn btn-dark'>Cancel</Button>
                        <Button className='btn btn-success'>Create Trip</Button>
                    </div>
                </ModalBody>
            </Modal>

            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Backloading" pageTitle="Onexfort" />
                    <Card className='p-2'>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-3 col-md-3">
                                    <div className="header-item1">
                                        <ul>
                                            <li><a href="#"><img src={angle1} alt="" /></a></li>
                                            <li><a href="#"><img src={angle2} alt="" /></a></li>
                                            <li><span>Today</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-5">
                                    <div className="header-item2">
                                        <h4><span className='text-primary'>Sunday,</span> 19 November 2023 <span><img src={calendar} alt="" /></span></h4>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                    <div className="header-item3 text-primary">
                                        <ul>
                                            <li className="active"><a href="#">Day</a></li>
                                            <li><a href="#">Week</a></li>
                                            <li><a href="#">Month</a></li>
                                            <li><a href="#">Year</a></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Card>
                    {/* <!-- table-box-start --> */}
                    <Card>
                        <div className="table-area">
                            <div className="container-fluid">
                                <div className="table-box-wrap">
                                    <div className="table-box-main">
                                        <div className="table-header bg-primary">
                                            <div className="row">
                                                <div className="col-lg-3 col-8">
                                                    <div className="table-header-lft">
                                                        <h5>Vehicles</h5>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9 col-4">
                                                    <div className="table-header-rht">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-subheader">
                                            <div className="row">
                                                <div className="col-lg-3 col-8">
                                                    <div className="table-subheader-lft">
                                                        <h6><span><img src="images/arrow.png" alt="" /></span>imove trucks</h6>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9 col-4">
                                                    <div className="table-subheader-rht">

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="table-item-wrap border-inner">
                                            <div className="row">
                                                <div className="col-lg-3">
                                                    <div className="table-item-left table-item-left10">
                                                        <h6><span><img src={car} alt="" /></span>Adam Truck</h6>
                                                    </div>
                                                </div>
                                                <div className="col-lg-8">
                                                    <div className="table-item-rht">
                                                        <div className="trip-type-box-wrap">
                                                            <div className="trip-type-cnt">

                                                                <div className="trip-type-cnt-left"
                                                                    onMouseEnter={handleMouseEnter}
                                                                    onMouseLeave={handleMouseLeave}
                                                                >
                                                                    <p>Trip type</p>

                                                                </div>

                                                                <div className="trip-type-cnt-right">
                                                                    <ul>
                                                                        <li>1450</li>
                                                                        <li>2305</li>
                                                                        <li>1777</li>
                                                                    </ul>
                                                                </div>
                                                                <div className="assign_job_space">
                                                                    <p className="assign_jobs_pencil"><i className="bx bxs-pencil text-primary" onClick={() => tog_assignModal()} aria-hidden="true"></i></p>
                                                                </div>
                                                            </div>
                                                            <div className="trip-inner">
                                                                <span>60%</span>
                                                            </div>
                                                        </div>
                                                        <Card className='dropdown-hover'>
                                                            {showDropdown && (
                                                                <div className="dropdown  hover-drop-content">
                                                                    <div className='p-2'>
                                                                        <h6> Syd to Mel</h6>
                                                                        <Label className='mt-2 text-muted'>Loaded 24m3 of 80m3</Label>
                                                                    </div>
                                                                    <div className='bg-soft-purple p-2'>
                                                                        <div className='pt-2 '>
                                                                            <h6 className='mb-2 bg-soft-purple'> Waybill No #8</h6>
                                                                            <p className='mb-2'> Sydney - Melb</p>
                                                                            <p className='mb-2'> yyyy/mm/dd - yyyy/mm/dd</p>
                                                                            <p className='mb-2'> 4T -XYZ - 20T interstate Truck</p>
                                                                            <p className='mb-2'>Joe Davids</p>
                                                                            <p className='mb-2'>Tripe notese ttt</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Card>
                                                    </div>
                                                </div>
                                                <div className='col-lg-1'>
                                                    <Button className='btn btn-light text-primary m-3 ' onClick={() => toggle_createTrip()}>+</Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-item-wrap border-inner">
                                            <div className="row">
                                                <div className="col-lg-3 col-8">
                                                    <div className="table-item-left">
                                                        <h6><span><img src={car} alt="" /></span>Adam Truck</h6>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9 col-4">
                                                    <div className="table-item-rht">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-item-wrap border-inner">
                                            <div className="row">
                                                <div className="col-lg-3 col-8">
                                                    <div className="table-item-left">
                                                        <h6><span><img src={car} alt="" /></span>Adam Truck</h6>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9 col-4">
                                                    <div className="table-item-rht">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-item-wrap border-inner">
                                            <div className="row">
                                                <div className="col-lg-3">
                                                    <div className="table-item-left table-item-left10">
                                                        <h6><span><img src={car} alt="" /></span>Adam Truck</h6>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9">
                                                    <div className="table-item-rht">
                                                        <div className="trip-type-box-wrap trip-type-box-wrap2">
                                                            <div className="trip-type-cnt">
                                                                <div className="trip-type-cnt-left">
                                                                    <p>Trip type</p>
                                                                </div>
                                                                <div className="trip-type-cnt-right">
                                                                    <ul>
                                                                        <li>1450</li>
                                                                        <li>1499</li>
                                                                        <li>1777</li>
                                                                    </ul>
                                                                </div>
                                                                <div className="assign_job_space">
                                                                    <p className="assign_jobs_pencil"><i className="bx bxs-pencil text-primary" aria-hidden="true"></i></p>
                                                                </div>
                                                            </div>
                                                            <div className="trip-inner">
                                                                <span>60%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-item-wrap border-inner">
                                            <div className="row">
                                                <div className="col-lg-3 col-8">
                                                    <div className="table-item-left">
                                                        <h6><span><img src={car} alt="" /></span>Adam Truck</h6>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9 col-4">
                                                    <div className="table-item-rht">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-item-wrap border-inner">
                                            <div className="row">
                                                <div className="col-lg-3 col-8">
                                                    <div className="table-item-left">
                                                        <h6><span><img src={car} alt="" /></span>Adam Truck</h6>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9 col-4">
                                                    <div className="table-item-rht">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-item-wrap border-inner">
                                            <div className="row">
                                                <div className="col-lg-3">
                                                    <div className="table-item-left table-item-left10">
                                                        <h6><span><img src={car} alt="" /></span>Adam Truck</h6>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9">
                                                    <div className="table-item-rht">
                                                        <div className="trip-type-box-wrap trip-type-box-wrap3">
                                                            <div className="trip-type-cnt">
                                                                <div className="trip-type-cnt-left">
                                                                    <p>Trip type</p>
                                                                </div>
                                                                <div className="trip-type-cnt-right">
                                                                    <ul>
                                                                        <li>1450</li>
                                                                        <li>2305</li>
                                                                        <li>1499</li>

                                                                    </ul>
                                                                </div>
                                                                <div className="assign_job_space">
                                                                    <p className="assign_jobs_pencil"><i className="bx bxs-pencil text-primary" aria-hidden="true"></i></p>
                                                                </div>
                                                            </div>
                                                            <div className="trip-inner">
                                                                <span>60%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-item-wrap border-inner">
                                            <div className="row">
                                                <div className="col-lg-3 col-8">
                                                    <div className="table-item-left">
                                                        <h6><span><img src={car} alt="" /></span>Adam Truck</h6>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9 col-4">
                                                    <div className="table-item-rht">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-item-wrap border-inner">
                                            <div className="row">
                                                <div className="col-lg-3 col-8">
                                                    <div className="table-item-left">
                                                        <h6><span><img src={car} alt="" /></span>Adam Truck</h6>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9 col-4">
                                                    <div className="table-item-rht">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-item-left border-inner table-item-wrap1">
                                            <div className="row">
                                                <div className="col-lg-3 col-8">
                                                    <div className="table-item-left1">
                                                        <h6><span><img src="images/arrow.png" alt="" /></span>imove trucks</h6>
                                                    </div>
                                                </div>
                                                <div className="col-9 col-4">
                                                    <div className="table-item-rht">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-item-wrap border-inner">
                                            <div className="row">
                                                <div className="col-lg-3 col-8">
                                                    <div className="table-item-left">
                                                        <h6><span><img src={car} alt="" /></span>Adam Truck</h6>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9 col-4">
                                                    <div className="table-item-rht">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-item-wrap border-inner table-item-wrap2">
                                            <div className="row">
                                                <div className="col-lg-3 col-8">
                                                    <div className="table-item-left">
                                                        <h6><span><img src={car} alt="" /></span>Adam Truck</h6>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9 col-4">
                                                    <div className="table-item-rht">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Backloading;
