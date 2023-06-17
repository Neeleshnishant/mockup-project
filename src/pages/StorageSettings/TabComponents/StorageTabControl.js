import React from 'react'
import { Card, CardBody, Nav, NavItem, NavLink } from 'reactstrap';
import { StorageSettingsTabPages } from '../Constants/StorageSettingsConstants';
import TabControlNavItem from '../../../Components/Common/TabControlNavItem';

export default function StorageTabControl({ activeTabSetter, activeTab }) {

    function clickHandler(navObject) {
        activeTabSetter(navObject);
    }

    return (
        <Card>
            <CardBody>
                <Nav pills vertical>
                    {
                        Object.keys(StorageSettingsTabPages).map(tabKey =>
                            <TabControlNavItem navObject={StorageSettingsTabPages[tabKey]} onClickCallback={clickHandler} key={tabKey.id} activeTab={activeTab} />
                        )
                    }
                </Nav>
            </CardBody>
        </Card>


    )
}
