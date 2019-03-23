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

        const links = { ...this.state }
        let dataToSubmit = {};
       /*
        for (let key in this.state) {
            dataToSubmit[key] = this.state[key].value;
            return (
                <Link to=''>
                <ListItem button >
                    {dataToSubmit[key]}
                </ListItem>
            </Link>
            
            )
        }

        */
/*
       return links.map(link => (
        <Link to='' key={link.title}>
            <ListItem button >
                ds
            </ListItem>
        </Link>
    )) 
    */
/*
               return links.map(link => (
                    <Link to={link.linkTo} key={link.title}>
                        <ListItem button >
                            {link.title}
                        </ListItem>
                    </Link>
                )) 
  */
            }


    logoutHandler = () => {
        firebase.auth().signOut().then(() => {
            console.log('logout successful')
        }, (error) => {
            console.log('Error Logging out')
        })
      };

    render() {

  const elements = ['one', 'two', 'three'];
  const links = { ...this.state };
  console.log(links.navigation_list.title)

        return (
            <div>
                        <ul>
        {elements.map((value, index) => {
          return <li key={index}>{value}</li>
        })}
      </ul>
                {this.renderItems()}
                <ListItem button onClick={() => this.logoutHandler()}>
                    Log out                    
            </ListItem>
            </div>
        );
    }
}

export default AdminNav;