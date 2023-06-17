import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, Nav, NavItem, } from 'reactstrap';
import RemovalTabControl from './TabComponents/RemovalTabControl';
import RemovalTabContent from './TabComponents/RemovalTabContent';
import { RemovalSettingsTabPages } from './Constants/RemovalSettingsConstants';
import { Outlet } from 'react-router-dom';

export default function RemovalSettings() {
     const [activeTab, setActiveTab] = useState(RemovalSettingsTabPages.General.Vehicles);

    return (
        <div className="page-content">
            <Container fluid>
                <Row>
                    <Col md="3">
                  
                        <RemovalTabControl activeTabSetter={setActiveTab} activeTab={activeTab} />     
                    </Col>
                    <Col md="9">
                        <RemovalTabContent  activeTab={activeTab} />
                         <Outlet />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
