import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CircularProgress from '@material-ui/core/CircularProgress';
import { firebaseLooper } from '../../ui/misc';
import { firebaseDB, firebase } from '../../../firebase';

import IndexThumb from '../../ui/indexThumb';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

class TablePortfolioImgs extends Component {

    state = {
        entityID: '',
        parentID: '',
        isloading: true,
        portfolio_imgs: [],

    }


    componentDidMount() {
        const parentID = this.props.entityID;
        // let portfolio_imgs = [];

        firebaseDB.ref('portfolio_imgs').orderByChild("parentID").equalTo(parentID).once("value")
            .then(
                (snapshot) => {
                    const portfolio_imgs = firebaseLooper(snapshot);

                    // console.log(portfolio_imgs);

                    this.setState({
                        isloading: false,
                        portfolio_imgs
                    })
                }
            )
    }

    removeItemImage(itemToRemoveID, filename) {

    firebase.storage().ref('portfolio').child(filename).delete()
    firebaseDB.ref(`portfolio_imgs/${itemToRemoveID}`).set(null)
    .then(
        window.location.reload()
    )
    .catch((e) => {
        console.log(e)
    })
            
    }

    render() {
        return (
            <div>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Thumbnail</TableCell>
                                <TableCell>Position</TableCell>
                                <TableCell>Remove</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.portfolio_imgs ?
                                    this.state.portfolio_imgs.map((img, i) => (
                                        <TableRow key={i}>
                                            <TableCell className='main_cell'><Link to={`/admin_portfolio_img/edit_portfolio_img/${img.id}`}>
                                                <IndexThumb
                                                    thisId={img.id}
                                                    thisImage={img.filename}
                                                    thisImageFolder='portfolio'
                                                />

                                            </Link>
                                            </TableCell>
                                            <TableCell>position</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    onClick={(event) => this.removeItemImage(img.id, img.filename)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
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
        );
    }
}

export default TablePortfolioImgs;