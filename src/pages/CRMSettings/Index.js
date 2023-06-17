import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, Nav, NavItem, } from 'reactstrap';
import CrmTabControl from './TabComponents/CrmTabControl';
import CrmTabContent from './TabComponents/CrmTabContent';
import { CrmSettingsTabPages } from './Constants/CrmSettingsConstants';
import { Outlet } from 'react-router-dom';
const CRMSettings = () => {
    const [activeTab, setActiveTab] = useState(CrmSettingsTabPages.Communication.EmailTemplates);

    return (
        <div className="page-content">
            <Container fluid>
                <Row>
                    <Col md="3">                
                        <CrmTabControl activeTabSetter={setActiveTab} activeTab={activeTab} />     
                    </Col>
                    <Col md="9">
                        <CrmTabContent  activeTab={activeTab} />
                         <Outlet />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default CRMSettings