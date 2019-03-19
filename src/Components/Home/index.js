import React from 'react';
import Featured from './Featured/'
import Description from './Description/'
import ContactDetails from './Contact/'

const Home = () => {
    return (
        <div>
            <Featured />
            <Description />
            <ContactDetails />
        </div>
    );
};

export default Home;