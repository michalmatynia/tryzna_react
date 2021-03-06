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
import { firebaseSlider } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';
import IndexThumb from '../../ui/indexThumb';

class AdminSlider extends Component {

    state = {
        isloading: true,
        slides: [],
       
    }

    componentDidMount() {
        firebaseSlider.orderByChild('position').once('value')
            .then((snapshot) => {
                const slides = firebaseLooper(snapshot);

                this.setState({
                    isloading: false,
                    slides
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
                                    <TableCell>Position</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.slides ?
                                        this.state.slides.map((slide, i) => (
                                            <TableRow key={i}>
                                                <TableCell className='main_cell'><Link to={`/admin_slider/edit_slider/${slide.id}`}>
                                                <IndexThumb
                                                thisId = {slide.id}
                                                thisImage = {slide.image}
                                                thisImageFolder = 'slides'
                                                />
                                                </Link>
                                                </TableCell>
                                                <TableCell>{slide.position}</TableCell>

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

export default AdminSlider;