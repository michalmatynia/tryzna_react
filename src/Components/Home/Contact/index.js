import React from 'react';
import Location from './Location';
import CAddress from './CAddress';

const ContactDetails = () => {
    return (
        <div className="contact_wrapper">
        <div className="contact_left">
        <Location/>
        </div>
        <div className="contact_right">
        <CAddress/>

        </div>
        </div>
    );
};

export default ContactDetails;