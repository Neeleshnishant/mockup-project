import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, Nav, NavItem, } from 'reactstrap';
import SettingsTabControl from './TabComponents/SettingsTabControl';
import SettingsTabContent from './TabComponents/SettingsTabContent';
import {SettingsTabPages } from './Constants/SettingsConstants';

// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
function Settings() {
    const [activeTab, setActiveTab] = useState(SettingsTabPages.OrganisationSetting);

    return (
        <div className="page-content">

            <Container fluid>

                <BreadCrumb title="Invoices" pageTitle="Onexfort" />
                <Row>
                    <Col md="3">
                        <SettingsTabControl activeTabSetter={setActiveTab} activeTab={activeTab} />
                    </Col>
                    <Col md="9">
                        <SettingsTabContent activeTab={activeTab} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default Settings
