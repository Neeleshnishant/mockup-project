import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, Nav, NavItem, } from 'reactstrap';
import StorageTabControl from './TabComponents/StorageTabControl';
import StorageTabContent from './TabComponents/StorageTabContent';
import { StorageSettingsTabPages } from './Constants/StorageSettingsConstants';

// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
function StorageSettings() {
    const [activeTab, setActiveTab] = useState(StorageSettingsTabPages.StorageWarehouses);

    return (
        <div className="page-content">

            <Container fluid>

                <BreadCrumb title="Storage Settings" pageTitle="Onexfort" />
                <Row>
                    <Col md="3">
                        <StorageTabControl activeTabSetter={setActiveTab} activeTab={activeTab} />
                    </Col>
                    <Col md="9">
                        <StorageTabContent activeTab={activeTab} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default StorageSettings
