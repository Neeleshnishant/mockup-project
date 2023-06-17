import React from 'react'
import { Nav, NavItem, NavLink, Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { CrmSettingsTabPages } from '../Constants/CrmSettingsConstants';
import TabControlNavItem from '../../../Components/Common/TabControlNavItem';

export default function CrmTabControl({ activeTabSetter, activeTab }) {
    function clickHandler(navObject) {
        activeTabSetter(navObject);
    }
    return (
        <Card>
            <CardBody>
                <Nav pills vertical>
                    <h6 className='text-brown mt-2 mb-3' >Communication</h6>

                    {
                        Object.keys(CrmSettingsTabPages.Communication).map(tabKey =>
                            <TabControlNavItem navObject={CrmSettingsTabPages.Communication[tabKey]} onClickCallback={clickHandler} key={tabKey.id}
                                activeTab={activeTab} />
                        )
                    }

                    <h6 className='text-brown mb-3 mt-2'>Customisation</h6>
                    {
                        Object.keys(CrmSettingsTabPages.Customisation).map(tabKey =>
                            <TabControlNavItem navObject={CrmSettingsTabPages.Customisation[tabKey]} onClickCallback={clickHandler} key={tabKey.id}
                                activeTab={activeTab} />
                        )
                    }
                </Nav>
            </CardBody>
        </Card>

    )
}