import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    navigate(path);
  };

  return (
    <div className="col-3">
      <ul>
        <li>
          <NavLink exact to="/product" activeClassName="active">
            Product
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeClassName="active">
            Contact
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
export default Sidebar