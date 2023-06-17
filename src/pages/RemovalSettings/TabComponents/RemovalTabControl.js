import React from 'react'
import { Nav, NavItem, NavLink,Card,CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { RemovalSettingsTabPages } from '../Constants/RemovalSettingsConstants';
import TabControlNavItem from '../../../Components/Common/TabControlNavItem';

export default function RemovalTabControl({ activeTabSetter, activeTab }) {
    function clickHandler(navObject) {
        activeTabSetter(navObject);
    }
    return (
        <Card>
        <CardBody>
        <Nav pills vertical>
            <h6 className='text-brown mt-2 mb-3' >General</h6>

            {
                Object.keys(RemovalSettingsTabPages.General).map(tabKey =>
                    <TabControlNavItem navObject={RemovalSettingsTabPages.General[tabKey]} onClickCallback={clickHandler} key={tabKey.id}
                    activeTab={activeTab}  />
                )
            }

            <h6 className='text-brown mb-3 mt-2'>Auto Quote</h6>
            {
                Object.keys(RemovalSettingsTabPages.AutoQuote).map(tabKey =>
                    <TabControlNavItem navObject={RemovalSettingsTabPages.AutoQuote[tabKey]}  onClickCallback={clickHandler}  key={tabKey.id} 
                    activeTab={activeTab}/>
                )
            }
        </Nav>
        </CardBody>
        </Card>

    )
}