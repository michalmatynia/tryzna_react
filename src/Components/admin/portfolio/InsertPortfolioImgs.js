import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

import TableRow from '@material-ui/core/TableRow';

import CircularProgress from '@material-ui/core/CircularProgress';
import Fileuploader from '../../ui/fileuploader';

class InsertPortfolioImgs extends Component {

    state = {
        entityID: '',
        parentID: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formdata: {
            image: {
                element: 'image',
                value: '',
                validation: {
                    required: true
                },
                valid: false
            }
        }
    }

    componentDidMount() {
        const entityID = this.props.entityID;
        
        this.setState({
            parentID: entityID
        })

    }

    render() {
        return (
                <TableRow>
                    <TableCell>
                    <Fileuploader
                        dir="portfolio"
                        parentID={this.state.entityID}
                        tag='Insert Image'
                        defaultImg={this.state.defaultImg}
                        defaultImgName={this.state.formdata.image.value}
                        resetImage={() => this.resetImage()}
                        filename={(filename) => this.storeFilename(filename)}
                    />
                    </TableCell>
                    <TableCell>Position</TableCell>
                </TableRow>
        );
    }
}

export default InsertPortfolioImgs;