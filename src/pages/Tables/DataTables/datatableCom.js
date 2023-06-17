import React, { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { DropdownItem, DropdownMenu, DropdownToggle, Input, UncontrolledDropdown } from 'reactstrap';
import { Link } from 'react-router-dom';

//import Images
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../../assets/images/users/avatar-8.jpg";
import avatar9 from "../../../assets/images/users/avatar-9.jpg";
import avatar10 from "../../../assets/images/users/avatar-10.jpg";

import btc from "../../../assets/images/svg/crypto-icons/btc.svg";
import eth from "../../../assets/images/svg/crypto-icons/eth.svg";
import ltc from "../../../assets/images/svg/crypto-icons/ltc.svg";
import xmr from "../../../assets/images/svg/crypto-icons/xmr.svg";
import ant from "../../../assets/images/svg/crypto-icons/ant.svg";
import sol from "../../../assets/images/svg/crypto-icons/sol.svg";
import fil from "../../../assets/images/svg/crypto-icons/fil.svg";
import aave from "../../../assets/images/svg/crypto-icons/aave.svg";
import ada from "../../../assets/images/svg/crypto-icons/ada.svg";

const BasicTable = () => {

    const columns = [
        {
            name: <Input className="form-check-input fs-15" type="checkbox" name="checkAll" value="option1" />,
            cell: () => (
                <input className="form-check-input fs-15" type="checkbox" name="checkAll" value="option1" />
            ),
        },
        {
            name: <span className='font-weight-bold fs-13'>SR No.</span>,
            selector: row => row.srNo,
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>ID</span>,
            selector: row => row.id,
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Purchase ID</span>,
            selector: row => row.purchaseId,
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Title</span>,
            selector: row => (<Link to="#!">{row.title}</Link>),
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>User</span>,
            selector: row => row.user,
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Assigned To</span>,
            selector: row => row.assigned,
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Create By</span>,
            selector: row => row.createdBy,
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Create Date</span>,
            selector: row => row.createDate,
            sortable: true
        },
        {
            name: <span className='font-weight-bold fs-13'>Status</span>,
            sortable: true,
            selector: (cell) => {
                switch (cell.status) {
                    case "Re-open":
                        return <span className="badge badge-soft-info"> {cell.status} </span>;
                    case "On-Hold":
                        return <span className="badge badge-soft-secondary"> {cell.status} </span>;
                    case "Closed":
                        return <span className="badge badge-soft-danger"> {cell.status} </span>;
                    case "Inprogress":
                        return <span className="badge badge-soft-warning"> {cell.status} </span>;
                    case "Open":
                        return <span className="badge badge-soft-primary"> {cell.status} </span>;
                    case "New":
                        return <span className="badge badge-soft-success"> {cell.status} </span>;
                    default:
                        return <span className="badge badge-soft-success"> {cell.status} </span>;
                }
            },
        },
        {
            name: <span className='font-weight-bold fs-13'>Priority</span>,
            sortable: true,
            selector: (cell) => {
                switch (cell.priority) {
                    case "High":
                        return <span className="badge bg-danger"> {cell.priority} </span>;
                    case "Medium":
                        return <span className="badge bg-info"> {cell.priority} </span>;
                    case "Low":
                        return <span className="badge bg-success"> {cell.priority} </span>;
                    default:
                        return <span className="badge bg-danger"> {cell.priority} </span>;
                }
            },
        },
        {
            name: <span className='font-weight-bold fs-13'>Action</span>,
            sortable: true,

            cell: () => {
                return (
                    <UncontrolledDropdown className="dropdown d-inline-block">
                        <DropdownToggle className="btn btn-soft-secondary btn-sm" tag="button">
                            <i className="ri-more-fill align-middle"></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem href="#!"><i className="ri-eye-fill align-bottom me-2 text-muted"></i>View</DropdownItem>
                            <DropdownItem className='edit-item-btn'><i className="ri-pencil-fill align-bottom me-2 text-muted"></i>Edit</DropdownItem>
                            <DropdownItem className='remove-item-btn'> <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                );
            },
        },
    ];

    const data = [
        {
            srNo: "01",
            id: "VLZ-452",
            purchaseId: "VLZ1400087402",
            title: "Post launch reminder/ post list",
            user: "Joseph Parker",
            assigned: "Alexis Clarke",
            createdBy: "Joseph Parker",
            createDate: "03 Oct, 2021",
            status: "Re-open",
            priority: "High",
        },
        {
            srNo: "02",
            id: "VLZ-453",
            purchaseId: "VLZ1400087425",
            title: "Additional Calendar",
            user: "Diana Kohler",
            assigned: "Admin",
            createdBy: "Mary Rucker",
            createDate: "05 Oct, 2021",
            status: "On-Hold",
            priority: "Medium",
        },
        {
            srNo: "03",
            id: "VLZ-454",
            purchaseId: "VLZ1400087438",
            title: "Make a creating an account profile",
            user: "Tonya Noble",
            assigned: "Admin",
            createdBy: "Tonya Noble",
            createDate: "27 April, 2022",
            status: "Closed",
            priority: "Low",
        },
        {
            srNo: "04",
            id: "VLZ-455",
            purchaseId: "VLZ1400087748",
            title: "Apologize for shopping Error!",
            user: "Joseph Parker",
            assigned: "Alexis Clarke",
            createdBy: "Joseph Parker",
            createDate: "14 June, 2021",
            status: "Inprogress",
            priority: "Medium",
        },
        {
            srNo: "05",
            id: "VLZ-456",
            purchaseId: "VLZ1400087547",
            title: "Support for theme",
            user: "Donald Palmer",
            assigned: "Admin",
            createdBy: "Donald Palmer",
            createDate: "25 June, 2021",
            status: "Closed",
            priority: "Low",
        },
        {
            srNo: "06",
            id: "VLZ-457",
            purchaseId: "VLZ1400087245",
            title: "Benner design for FB & Twitter",
            user: "Mary Rucker",
            assigned: "Jennifer Carter",
            createdBy: "Mary Rucker",
            createDate: "14 Aug, 2021",
            status: "Inprogress",
            priority: "Medium",
        },
        {
            srNo: "07",
            id: "VLZ-458",
            purchaseId: "VLZ1400087785",
            title: "Change email option process",
            user: "James Morris",
            assigned: "Admin",
            createdBy: "James Morris",
            createDate: "12 March, 2022",
            status: "Open",
            priority: "High",
        },
        {
            srNo: "08",
            id: "VLZ-460",
            purchaseId: "VLZ1400087745",
            title: "Support for theme",
            user: "Nathan Cole",
            assigned: "Nancy Martino",
            createdBy: "Nathan Cole",
            createDate: "28 Feb, 2022",
            status: "On-Hold",
            priority: "Low",
        },
        {
            srNo: "09",
            id: "VLZ-461",
            purchaseId: "VLZ1400087179",
            title: "Form submit issue",
            user: "Grace Coles",
            assigned: "Admin",
            createdBy: "Grace Coles",
            createDate: "07 Jan, 2022",
            status: "New",
            priority: "High",
        },
        {
            srNo: "10",
            id: "VLZ-462",
            purchaseId: "VLZ140008856",
            title: "Edit customer testimonial",
            user: "Freda",
            assigned: "Alexis Clarke",
            createdBy: "Freda",
            createDate: "16 Aug, 2021",
            status: "Closed",
            priority: "Medium",
        },
    ];
    return (
        <DataTable
            columns={columns}
            data={data}
            pagination
        />
    );
};



export { BasicTable};