import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import { firebase } from '../../../firebase'

const AdminNav = () => {

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


const style = {
    color: '#ffffff',
    fontWeight: '300',
    borderBottom:'1px solid #353535',

}


const renderItems = () => (
    links.map(link => (
        <Link to={link.linkTo} key={link.title}>
            <ListItem button style={style}>
                {link.title}
            </ListItem>
        </Link>
    ))
)


const logoutHandler = () => {
firebase.auth().signOut().then(()=>{
    console.log('logout successful')
},(error)=>{
    console.log('Error Logging out')
})
}

    return (
        <div>
            {renderItems()}
            <ListItem button style={style} onClick={()=>logoutHandler()}>
                Log out
            </ListItem>
        </div>
    );
};

export default AdminNav;