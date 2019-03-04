import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import IconButton from '@material-ui/core/IconButton';

import PermIdentity from '@material-ui/icons/PermIdentity';

import SideDrawer from './SideDrawer';
import MyLogo from './MyLogo';


import MenuIcon from '@material-ui/icons/Menu';
import ListIcon from '@material-ui/icons/List';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Header extends Component {

    state = {
        drawerOpen: false,
        headerShow: false,
    }
    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
    }
        handleScroll = () => {
            if(window.scrollY > 0 ){
                this.setState({
                    headerShow: true
                })
            } else {
                this.setState({
                    headerShow: false
                })
            }
        }
    
    
    toggleDrawer = (value) => {
        this.setState({
            drawerOpen: value
        })
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
                    
                        <MyLogo
                            link={true}
                            linkTo="/"
                        />
                    </div>

                    <IconButton
                        aria-label="Menu"
                        color="inherit"
                        onClick={() => this.toggleDrawer(true)}
                    >
                        <PermIdentity />

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