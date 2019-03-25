import React from 'react';
import Featured from './Featured/'
import Description from './Description/'
import ContactDetails from './Contact/'
import { Element } from 'react-scroll'

const Home = () => {
    return (
        <div>
            <Element name="Featured"><Featured/></Element>
            <Element name="Description"><Description /></Element>
            <Element name="Contact"><ContactDetails/></Element>
        </div>
    );
};

export default Home;