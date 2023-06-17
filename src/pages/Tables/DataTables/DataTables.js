
import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';

import { BasicTable} from './datatableCom';

const DataTables = () => {
    document.title = "Datatables | Onexfort";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Datatables" pageTitle="Tables" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h5 className="card-title mb-0">Basic Datatables</h5>
                                </CardHeader>
                                <CardBody>
                                    <BasicTable />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    );
};

export default DataTables;
