import React from 'react'
import { Card, CardBody, Nav, NavItem, NavLink } from 'reactstrap';
import {SettingsTabPages } from '../Constants/SettingsConstants';
import TabControlNavItem from '../../../Components/Common/TabControlNavItem';

export default function SettingsTabControl({ activeTabSetter, activeTab }) {

    function clickHandler(navObject) {
        activeTabSetter(navObject);
    }

    return (
        <Card>
            <CardBody>
                <Nav pills vertical>
                    {
                        Object.keys(SettingsTabPages).map(tabKey =>
                            <TabControlNavItem navObject={SettingsTabPages[tabKey]} onClickCallback={clickHandler} key={tabKey.id} activeTab={activeTab} />
                        )
                    }
                </Nav>
            </CardBody>
        </Card>


    )
}
