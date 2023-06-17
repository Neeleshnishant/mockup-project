import React from 'react'
import { NavItem, NavLink } from 'reactstrap';

export const TabControlNavItem = ({ navObject, onClickCallback, activeTab }) => {
    return (
        <NavItem>
            <NavLink className={`mb-2 cursor-pointer ${navObject === activeTab ? 'active' : ''}`}
                onClick={() => { onClickCallback(navObject); }}>
                <i className={`bx bx-${navObject.iconClass}`}></i>
                <span>{navObject.displayText}</span>
            </NavLink>
        </NavItem>
    )
}

export default TabControlNavItem;