import React from 'react';
import { Grid, _ } from 'gridjs-react';

import {Link} from "react-router-dom";
import NameDetails from "./NameDetails"

const data = [
    ["Jonathan", "90909090", "jonathan@example.com", "Senior Implementation Architect", "Hauck Inc", "Holy See"],
    ["Harold", "90909090", "harold@example.com", "Forward Creative Coordinator", "Metz Inc", "Iran"],
    ["Shannon", "90909090", "shannon@example.com", "Legacy Functionality Associate", "Zemlak Group", "South Georgia"],
    ["Robert", "90909090", "robert@example.com", "Product Accounts Technician", "Hoeger", "San Marino"],
    ["Noel", "90909090", "noel@example.com", "Customer Data Director", "Howell - Rippin", "Germany"],
    ["Traci", "90909090", "traci@example.com", "Corporate Identity Director", "Koelpin - Goldner", "Vanuatu"],
    ["Kerry", "90909090", "kerry@example.com", "Lead Applications Associate", "Feeney, Langworth and Tremblay", "Niger"],
    ["Patsy", "90909090", "patsy@example.com", "Dynamic Assurance Director", "Streich Group", "Niue"],
    ["Cathy", "90909090", "cathy@example.com", "Customer Data Director", "Ebert, Schamberger and Johnston", "Mexico"],
    ["Tyrone", "90909090", "tyrone@example.com", "Senior Response Liaison", "Raynor, Rolfson and Daugherty", "Qatar"],
];




// Base Example
const BaseExample = () => {
    const filterData= data.filter((each)=>(each[0].includes("on")))

    return (
        <React.Fragment>
            <Grid
                data={filterData}
                columns={[
                    {
                        name: 'Name',
                        formatter: (cell) => _(<a href={`/customer-name/${cell}`}> {cell} </a>),
                    },
                    "Mobile",
                    {
                        name: 'Email',
                        formatter: (cell) => _(<a href="/#"> {cell} </a>)
                    },
                    "Status"

                ]}
                search={true}
                sort={true}
                pagination={{ enabled: true, limit: 5, }}
            />
        </React.Fragment>
    );
};

export { BaseExample};
