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

import { firebaseHNavs} from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';


class AdminHNavs extends Component {

    state = {
        isloading: true,
        menuitems: [],
        tableMessage: ''
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
        return (
            <AdminLayout>
                <div>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Position</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {

                                    this.state.menuitems ?
                                        this.state.menuitems.map((menuitem, i) => (
                                            <TableRow key={i}>
                                                <TableCell className='main_cell'>
                                                    <Link to={`/admin_hostnav/edit_hnav/${menuitem.id}`}>

                                                        {menuitem.title}</Link></TableCell>
                                                        <TableCell>{menuitem.position}</TableCell>
                                            </TableRow>

                                        ))
                                        : null
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