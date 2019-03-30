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
import { firebaseDB } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';

// import IndexThmb from './indexThumb';

class AdminPortfolio extends Component {

    state = {
        isloading: true,
        items: [],
       
    }

    componentDidMount() {
        firebaseDB.ref('portfolio').once('value')
            .then((snapshot) => {
                const items = firebaseLooper(snapshot);

                this.setState({
                    isloading: false,
                    items
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
                                    <TableCell>Thumbnail</TableCell>
                                    <TableCell>Title</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.items ?
                                        this.state.items.map((item, i) => (
                                            <TableRow key={i}>
                                                <TableCell className='main_cell'><Link to={`/admin_portfolio/edit_portfolio/${item.id}`}>
                                                image
                                                {/* <IndexThmb
                                                thisId = {slide.id}
                                                thisImage = {slide.image}
                                                /> */}
                                                </Link>
                                                </TableCell>
                                                <TableCell>{item.title}</TableCell>

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

export default AdminPortfolio;