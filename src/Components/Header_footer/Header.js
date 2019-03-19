import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


import PermIdentity from '@material-ui/icons/PermIdentity';

import { Link } from 'react-router-dom';

import MenuIcon from '@material-ui/icons/Menu';
import ListIcon from '@material-ui/icons/List';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

class Header extends Component {

    state = {
        drawerOpen: false,
        headerShow: false,
    }

    render() {
        return (
            <AppBar
                position="fixed"
                style={{
                    backgroundColor: this.state.headerShow ? 'blue' : 'transparent',
                    boxShadow: 'none',
                    padding: '10px 0px'
                }}
            >
                <Toolbar>
                    
                        <div className="header_logo">

                        <Link to="/" className="link_main">
                            <div className="logo_font">Tryzna</div>
                            <div className="sublogo_font">Medieval Group</div>
                        </Link>
                        </div>


                    <Link to="/signin" className="link_main"><PermIdentity /></Link>


                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;