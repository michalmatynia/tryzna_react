import React from 'react';
import ReactDOM from 'react-dom';

import './Resources/css/styles.css';
import './Resources/css/mycustom.css';
import './Resources/css/admin.css';
import './Resources/css/header.css';
import './Resources/css/footer.css';
import './Resources/css/homepage.css';

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import {firebase} from './firebase';

const App = (props) => {
    return (
        <BrowserRouter>
            <Routes {...props}/>
        </BrowserRouter>
    )
}

firebase.auth().onAuthStateChanged((user)=>{
    ReactDOM.render(<App user={user}/>, document.getElementById('root'));
})