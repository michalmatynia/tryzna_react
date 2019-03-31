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

                console.log(portfolio_imgs);

                this.setState({
                    isloading: false,
                    portfolio_imgs
                })   
            }
        )
           
          
          // console.log(this.azportfolio_imgs);
          // console.log(typeof(portfolio_imgs));
          // console.log(portfolio_imgs);
         // console.log(this.state.portfolio_imgs);


/*         this.setState({
            parentID
        }) */

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
                                </TableRow>
                            </TableHead>
                            <TableBody>
           {
                                    this.state.portfolio_imgs ?
                                        this.state.portfolio_imgs.map((img, i) => (
                                            <TableRow key={i}>
                                                <TableCell className='main_cell'><Link to={`/admin_portfolio_img/edit_portfolio_img/${img.id}`}>
                                                {img.filename}
                                                </Link>
                                                </TableCell>
                                                <TableCell>position</TableCell>

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