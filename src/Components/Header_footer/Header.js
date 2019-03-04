import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListIcon from '@material-ui/icons/List';
import SideDrawer from './SideDrawer'

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
                        <div className="font_righteous logo_venue">The venue</div>
                        <div className="header_logo_title">Musical Events</div>
                    </div>

                    <IconButton
                        aria-label="Menu"
                        color="inherit"
                        onClick={() => this.toggleDrawer(true)}
                    >
                        <ListIcon />

                    </IconButton>
                    <SideDrawer
                        open={this.state.drawerOpen}
                        onClose={(value) => this.toggleDrawer(value)}
                    />
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;