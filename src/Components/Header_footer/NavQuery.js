import React, { Component } from 'react';

// Material-UI
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';

import { scroller } from 'react-scroll';

// Firebase
import { firebaseHNavs } from '../../firebase';
import { firebaseLooper } from '../ui/misc';

import Fade from 'react-reveal/Fade';

class NavQuery extends Component {

    state = {
        isloading: true,
        menuitems: [],
        tableMessage: ''
    }

    scrollToElement(element) {
        scroller.scrollTo(element, {
            duration: 1500,
            delay: 100,
            smooth: true,
            offset: -150
        });
    }

    componentDidMount() {
        firebaseHNavs.orderByChild('position').once('value')
            .then(snapshot => {
                const menuitems = firebaseLooper(snapshot);

                this.setState({
                    isloading: false,
                    menuitems
                })
            })
    }

    render() {
        return (<Fade delay={500}> 
            <List component="nav">                              
            {this.state.menuitems ?
                    this.state.menuitems.map((menuitem, i) => (
                        
                            <Button key={i} onClick={() => this.scrollToElement(menuitem.link)}>{menuitem.title}</Button>
                        
                    ))
                    : null
            }

            </List></Fade> 
        );
    }
}

export default NavQuery;