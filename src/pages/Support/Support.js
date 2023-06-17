import React from 'react';
import { Container } from 'reactstrap';

// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';


const Support = () => {
    document.title="Widgets | Onexfort";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Support" pageTitle="Onexfort" />
                    
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Support;
