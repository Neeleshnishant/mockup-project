import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';

// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import {
    BasicLineCharts,
} from "./LineCharts";
import {
    BasicColumn,
    StackedColumn2,
    DistributedColumn
} from './ColumnCharts';
import { CustomDataLabel } from './BarCharts';
import { Line } from './MixedCharts';

const Dashboard = () => {
    document.title = "Widgets | Onexfort";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Dashboard" pageTitle="Onexfort" />
                  
                    <Row>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Basic Column Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <BasicColumn dataColors='["--vz-danger", "--vz-primary", "--vz-success"]' />
                                </CardBody>
                            </Card>
                        </Col>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Stacked Column 100</h4>
                                </CardHeader>
                                <CardBody>
                                    <StackedColumn2 dataColors='["--vz-primary", "--vz-success", "--vz-warning"]' />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>

                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Distributed Columns Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <DistributedColumn dataColors='["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-info"]' />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={6}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Custom DataLabels Bar</h4>
                                </CardHeader>
                                <CardBody>
                                    <CustomDataLabel dataColors='["--vz-primary", "--vz-secondary", "--vz-success", "--vz-info", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-primary", "--vz-success", "--vz-secondary"]'/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                    <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Line & Column Chart</h4>
                                </CardHeader>
                                <CardBody>
                                    <Line dataColors='["--vz-primary", "--vz-success"]'/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Dashboard;
