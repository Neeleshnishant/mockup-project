import React, { useState } from 'react';
import { Accordion, AccordionItem, Button, Card, CardBody, CardHeader, Col, Collapse, Form, Label, Input, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export const Activities = () => {

    const [coll3, setcoll3] = useState(true);
    const [coll4, setcoll4] = useState(true);

    const t_coll3 = () => {
        setcoll3(!coll3);
    };

    const t_coll4 = () => {
        setcoll4(!coll4);
    };

    // Collapse with Icon

    const [note, setnote] = useState(true);
    const [email, setemail] = useState(false);
    const [sms, setsms] = useState(false);

    const col_note = () => {
        setnote(!note);
    };

    const col_email = () => {
        setemail(!email);
    };
    const col_sms = () => {
        setsms(!sms);
    };
    return (
        <div className="live-preview">
            <Card>
                <CardHeader>
                    <div className="hstack gap-3 ">
                        <Button color="light" onClick={col_note} style={{ cursor: "pointer" }} >
                            <i className="bx bx-pencil"></i> Note
                        </Button>
                        <Button color="light" onClick={col_email} style={{ cursor: "pointer" }} >
                            <i className="bx bx-mail-send"></i>  Email
                        </Button>

                        <Button color="light" onClick={col_sms} style={{ cursor: "pointer" }} >
                            <i className="bx bx-message-square-dots"></i>  SMS
                        </Button>
                    </div>
                </CardHeader>
            </Card>
            <div className="timeline-2">
                <div className="timeline-continue">
                    <Row className="timeline-right">
                        <Col xs={12}>
                            <Collapse isOpen={note} id="collapseWithicon" className='timeline-date'>
                                <div className="card mb-0">
                                    <CardHeader className="align-items-center d-flex">
                                        <h4 className="card-title mb-0">Ckeditor Classic Editor</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <Form method="post">
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data="<p>Hello from CKEditor 5!</p>"
                                                onReady={(editor) => {
                                                    // You can store the "editor" and use when it is needed.

                                                }}
                                                onChange={(editor) => {
                                                    editor.getData();
                                                }}
                                            />
                                        </Form>
                                        <div className="hstack gap-3 justify-content-end mt-3">
                                            <i className='bx bx-paperclip fs-3'></i>
                                            <i className='bx bx-x-circle fs-3'></i>
                                            <button type="submit" className="btn btn-brown" >Done <i className='bx bx-check fs-5'></i></button>
                                        </div>
                                    </CardBody>
                                </div>
                            </Collapse>
                        </Col>
                    </Row>
                    <Row className="timeline-right">
                        <Col xs={12}>
                            <Collapse isOpen={sms} id="collapseWithicon2" className='timeline-date'>
                                <div className="card mb-0 mt-3">
                                    <CardBody>
                                        <Row>
                                            <Col lg={6}>
                                                <Label>SMS FROM</Label>
                                                <Input disabled placeholder="92394324"></Input>
                                            </Col>
                                            <Col lg={6}>
                                                <Label>SMS To</Label>
                                                <select className="form-select mb-3" aria-label="Default select example">
                                                    <option defaultValue="1">SMS To</option>
                                                    <option defaultValue="2">Storage Test</option>
                                                </select>
                                            </Col>
                                            <Col lg={6}>
                                                <select className="form-select mb-3" aria-label="Default select example">
                                                    <option defaultValue="1">Choose a Template</option>
                                                    <option defaultValue="2">Follow Up</option>
                                                </select>
                                            </Col>
                                            <Col lg={12}>
                                                <textarea className="form-control" id="VertimeassageInput" rows="3"></textarea>
                                                <span >Cost = 1 Credit (160 characters will cost 1 credit) 0 characters</span>
                                            </Col>
                                        </Row>
                                        <div className="hstack gap-3 justify-content-end mt-3">                                        
                                            <i className='bx bx-x-circle fs-3'></i>
                                            <button type="submit" className="btn btn-brown" >Send <i className='bx bxl-telegram'></i></button>
                                        </div>
                                    </CardBody>
                                </div>
                            </Collapse>
                        </Col>
                    </Row>
                    <Row className="timeline-right mb-3">
                        <Col xs={12}>
                            <Collapse isOpen={email} id="collapseWithicon2" className='timeline-date'>
                                <div className="card mb-0 mt-3">
                                    <CardBody>
                                        <Row>
                                            <Col lg={6}>
                                                <div className="input-group">
                                                    <span className="input-group-text" id="inputGroup-sizing-default">From</span>
                                                    <select className="form-select" aria-label="Default select example">
                                                        <option defaultValue="1">info@schoolboard.com.au</option>
                                                        <option defaultValue="2">box@schoolboard.com.au</option>
                                                    </select>
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="input-group">
                                                    <span className="input-group-text" id="inputGroup-sizing-default">To</span>
                                                    <Input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='onexfort.teststar22@gmail.com' />
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="d-flex gap-2 flex-wrap mb-0 mt-3">
                                            <Button onClick={t_coll3} color="primary" style={{ cursor: "pointer" }} >Add CC </Button>
                                            <Button onClick={t_coll4} color="primary" style={{ cursor: "pointer" }} > Add BCC </Button>

                                        </div>
                                        <Row className='mb-3 mt-3'>
                                            <Col lg={6}>
                                                <Collapse isOpen={coll3} id="multiCollapseExample1">
                                                    <div className="input-group">
                                                        <span className="input-group-text" id="inputGroup-sizing-default">CC</span>
                                                        <Input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                                    </div>
                                                </Collapse>
                                            </Col>
                                            <Col lg={6}>
                                                <Collapse isOpen={coll4} id="multiCollapseExample2">
                                                    <div className="input-group">
                                                        <span className="input-group-text" id="inputGroup-sizing-default">BCC</span>
                                                        <Input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                                                    </div>
                                                </Collapse>
                                            </Col>
                                        </Row>
                                        <Row className='mb-3'>
                                            <Col lg={6}>
                                                <Input placeholder='Subject'></Input>
                                            </Col>
                                            <Col lg={6}>
                                                <select className="form-select" aria-label="Default select example">
                                                    <option defaultValue="1">Choose a Template</option>
                                                    <option defaultValue="2">Folloe Up 1 - Box Removals</option>
                                                    <option defaultValue="3">Insurance Quote</option>
                                                    <option defaultValue="4">Inventory PDF Attached</option>
                                                    <option defaultValue="5">Proof of Delivery</option>
                                                    <option defaultValue="6">Your Invoice is Ready</option>
                                                    <option defaultValue="7">Your Move is in 2 Days</option>
                                                    <option defaultValue="8">Your Quote is Ready</option>
                                                    <option defaultValue="9">Your Work Order</option>

                                                </select>
                                            </Col>

                                        </Row>
                                        <Form method="post">
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data="<p>Hello from CKEditor 5!</p>"
                                                onReady={(editor) => {
                                                    // You can store the "editor" and use when it is needed.

                                                }}
                                                onChange={(editor) => {
                                                    editor.getData();
                                                }}
                                            />
                                        </Form>
                                        <div className="hstack gap-3 justify-content-end mt-3">
                                            <i className='bx bx-paperclip fs-3'></i>
                                            <i className='bx bx-x-circle fs-3'></i>
                                            <button type="submit" className="btn btn-brown" >Send <i className='bx bxl-telegram'></i></button>
                                        </div>
                                    </CardBody>

                                </div>
                            </Collapse>
                        </Col>
                    </Row>

                </div>



            </div>
        </div>
    )
}
