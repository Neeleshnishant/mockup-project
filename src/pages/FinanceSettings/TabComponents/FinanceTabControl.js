import React from 'react'
import { Card, CardBody, Nav, NavItem, NavLink } from 'reactstrap';
import { FinanceSettingsTabPages } from '../Constants/FinanceSettingsConstants';
import TabControlNavItem from '../../../Components/Common/TabControlNavItem';

export default function FinanceTabControl({ activeTabSetter, activeTab }) {

    function clickHandler(navObject) {
        activeTabSetter(navObject);
    }

    return (
        <Card>
            <CardBody>
                <Nav pills vertical>
                    {
                        Object.keys(FinanceSettingsTabPages).map(tabKey =>
                            <TabControlNavItem navObject={FinanceSettingsTabPages[tabKey]} onClickCallback={clickHandler} key={tabKey.id} activeTab={activeTab} />
                        )
                    }
                </Nav>
            </CardBody>
        </Card>


    )
}
