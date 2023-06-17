
import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';

// Import Table Data
import { BaseExample } from '../GridTablesData';

const CustResidential = () => {
   
    document.title = "Admin Panel | Onexfort";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Residential Customer" pageTitle="Customer" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0 flex-grow-1">Search Filters</h4>
                                    
                                </CardHeader>

                                <CardBody>
                                    <div id="table-gridjs">
                                        <BaseExample />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    );
};

export default CustResidential;