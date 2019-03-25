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

import NavQuery from './NavQuery';

class Header extends Component {

    state = {
        drawerOpen: false,
        headerShow: false,
    }

    componentDidMount(){

        window.addEventListener('click', this.handleClick);
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('scroll', this.handleClick);
    }

    handleClick = () => {
        if(window.location.pathname === '/dashboard'
            || window.location.pathname ==='/sign_in'
            || window.location.pathname.includes('admin')) {
            this.setState({
                headerShow: true
            })
        } else {
            this.setState({
                headerShow: false
            })
        }
    }
        handleScroll = () => {
            if(window.scrollY > 0
                || window.location.pathname === '/sign_in'
                || window.location.pathname === '/dashboard'
                || window.location.pathname.includes('admin')) {
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
                    backgroundColor: this.state.headerShow ? '#3c3c3c' : 'transparent',
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
                        <NavQuery/>
                    <Link to="/sign_in" className="link_main"><PermIdentity /></Link>


                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;