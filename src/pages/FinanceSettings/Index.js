import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, Nav, NavItem, } from 'reactstrap';
import FinanceTabControl from './TabComponents/FinanceTabControl';
import FinanceTabContent from './TabComponents/FinanceTabContent';
import { FinanceSettingsTabPages } from './Constants/FinanceSettingsConstants';

// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
function FinanceSettings() {
    const [activeTab, setActiveTab] = useState(FinanceSettingsTabPages.Product);
    
    return (
        <div className="page-content">
            <Container fluid>
                <BreadCrumb title="Invoices" pageTitle="Onexfort" />
                <Row>
                    <Col md="3">
                        <FinanceTabControl activeTabSetter={setActiveTab} activeTab={activeTab} />
                    </Col>
                    <Col md="9">
                        <FinanceTabContent activeTab={activeTab} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default FinanceSettings
