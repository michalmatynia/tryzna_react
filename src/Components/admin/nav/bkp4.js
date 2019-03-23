import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import { firebase } from '../../../firebase'
import IconButton from '@material-ui/core/IconButton';

class AdminNav extends Component {

    state = {
        navigation_list: {
            title: 'Navigation',
            open: false,
            linkTo: '/admin_hostnav'
        },
        navigation_add: {
            title: 'Add Navigation',
            open: false,
            linkTo: '/admin_hostnav/add_hnav'
        }
    }

    renderItems (){
        const links = [
            {
                title: 'Navigation',
                linkTo: '/admin_hostnav'
            },
            {
                title: 'Add Navigation',
                linkTo: '/admin_hostnav/add_hnav'
            }
        ]
        return Object.keys(this.state).map((value, index) => {
console.log(value)

            return <Link to=''><ListItem button key={index}>{value.key}</ListItem></Link>
          })


        }

    logoutHandler = () => {
        firebase.auth().signOut().then(() => {
            console.log('logout successful')
        }, (error) => {
            console.log('Error Logging out')
        })
      };

render() {
        return (
            <div>

                {this.renderItems()}
                <ListItem button onClick={() => this.logoutHandler()}>
                    Log out                    
            </ListItem>
            </div>
        );
    }
}

export default AdminNav;