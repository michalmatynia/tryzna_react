import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CircularProgress from '@material-ui/core/CircularProgress';

import { firebaseHNavs, firebaseDB, firebase } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

class AdminHNavs extends Component {

    state = {
        isloading: true,
        menuitems: [],
        tableMessage: ''
    }

    componentDidMount() {
        firebaseHNavs.once('value')
            .then(snapshot => {
                const menuitems = firebaseLooper(snapshot);

                this.setState({
                    isloading: false,
                    menuitems: reverseArray(menuitems)
                })
            })
    }

removeItem(itemToRemoveID) {



firebaseDB.ref('hnavs/' + itemToRemoveID).set(null)
.then(()=>{
    console.log('data removed')

    this.props.history.push('/admin_hostnav');

})
.catch((e)=>{
    console.log(e)
})
}

    render() {
        return (
            <AdminLayout>
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Remove</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                             {
                                
                                 this.state.menuitems ? 
                                 this.state.menuitems.map((menuitem, i)=>(
                                     <TableRow key={i}>
                                     <TableCell><Link to={`/admin_hostnav/edit_hnav/${menuitem.id}`}>
                                     {menuitem.title}</Link></TableCell>
                                     <TableCell><button onClick={(event) => this.removeItem(menuitem.id)}>
                                     X
                                </button></TableCell>
                                     </TableRow>

                                 ))
                                 :null
                             }   
                            </TableBody>
                        </Table>
                    </Paper>

                    <div className="admin_progress">
                        {
                            this.state.isloading ?
                                <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
                                : null
                        }
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default AdminHNavs;