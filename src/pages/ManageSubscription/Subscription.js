import React from 'react';
import { Container } from 'reactstrap';

// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';


const Subscription = () => {
    document.title="Widgets | Onexfort";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Subscription" pageTitle="Onexfort" />
                    
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Subscription;
