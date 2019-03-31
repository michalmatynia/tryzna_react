import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';

import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';

import Fileuploader from '../../ui/fileuploader';
import { firebaseSlider, firebaseDB, firebase } from '../../../firebase';

import TablePortfolioImgs from './TablePortfolioImgs';

// Icons
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { fdatasync } from 'fs';


class EditPortfolio extends Component {

    state = {
        entityID: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formdata: {
            title: {
                element: 'input',
                value: '',
                config: {
                    label: 'Title',
                    name: 'desc_title',
                    type: 'text',
                },
                validation: {
                    required: false,
                },
                valid: false,
                validationMessage: '',
                showlabel: true

            },
            content: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Description',
                    name: 'desc_text',
                    type: 'textarea',
                    rows: 10,
                    cols: 100
                },
                validation: {
                    required: false,
                },
                valid: false,
                validationMessage: '',
                showlabel: true

            },
            image: {
                element: 'image',
                value: '',
                validation: {
                    required: false
                },
                valid: true
            }
        }
    }

    updateFields = (entity, entityID, formType) => {
        const newFormdata = { ...this.state.formdata }

        for (let key in newFormdata) {
            newFormdata[key].value = entity[key];
            newFormdata[key].valid = true
        }

        this.setState({
            entityID,
            formType,
            formdata: newFormdata
        })
    }

    componentDidMount() {
        const entityID = this.props.match.params.id;

        if (!entityID) {
            this.setState({
                formType: 'Add'
            })
        } else {
            firebaseDB.ref(`portfolio/${entityID}`).once('value')
                .then(snapshot => {
                    this.updateFields(snapshot.val(), entityID, 'Edit')
                })
        }


    }


    updateForm(element, content = '') {
        const newFormdata = { ...this.state.formdata }
        const newElement = { ...newFormdata[element.id] }

        const previousPosition = newFormdata[element.id].value

        if (content === '') {
            newElement.value = element.event.target.value;
        } else {
            newElement.value = content
        }

        let validData = validate(newElement)

        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]

        newFormdata[element.id] = newElement;

        this.setState({
            formError: false,
            formdata: newFormdata
        })

    }


    successForm = (message) => {
        this.setState({
            formSuccess: message
        });
        setTimeout(() => {
            this.setState({
                formSuccess: ''
            });
        }, 2000)

    }
    removeItem(itemToRemoveID) {

        firebaseDB.ref(`portfolio/${itemToRemoveID}`).set(null)
            .then(() => {
                console.log('data removed')

                this.props.history.push('/admin_portfolio');

            })
            .catch((e) => {
                console.log(e)
            })
    }

    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formdata) {

            
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
            
        }


       

        let portfolio_img = []

        if (dataToSubmit.image) {

            portfolio_img = {
                filename: dataToSubmit.image,
                parentID: this.state.entityID
            }
            dataToSubmit.image = '';
        }



        if (formIsValid) {
            if (this.state.formType === 'Edit') {
                firebaseDB.ref(`portfolio/${this.state.entityID}`)
                    .update(dataToSubmit)
                    .then(() => {

                        this.successForm('Updated correctly');

                    })
                    .catch((e) => {
                        this.setState({ formError: true })
                    })
                // Image Upload

                if (portfolio_img) {
                    firebaseDB.ref('portfolio_imgs').push(portfolio_img)
                        .then(() => {
                            this.successForm('Image Uploaded');
                        })
                        .catch((e) => {
                            this.setState({ formError: true })
                        })
                }

            } else {
                ///Add Portfolio

                firebaseDB.ref('portfolio').push(dataToSubmit)
                    .then(() => {
                        this.props.history.push('/admin_portfolio');
                    })
                    .catch((e) => {
                        this.setState({ formError: true })
                    })

            }

        } else {
            this.setState({
                formError: true
            });
        }
    }

    resetImage = () => {
        const newFormdata = { ...this.state.formdata }
        newFormdata['image'].value = '';
        newFormdata['image'].valid = false;

        this.setState({
            defaultImg: '',
            formdata: newFormdata
        })
    }

    storeFilename = (filename) => {
        this.updateForm({ id: 'image' }, filename)
    }

    render() {
        return (
            <AdminLayout>
                <div className="edit_dialog_wrapper">
                    <h2>{this.state.formType}
                        {(this.state.formType === 'Edit') ? <IconButton
                            onClick={(event) => this.removeItem(this.props.match.params.id)}
                        >
                            <DeleteIcon />
                        </IconButton> :
                            null}

                    </h2>
                    <div>
                        <form onSubmit={(event) => this.submitForm(event)}>
                            <FormField
                                id={'title'}
                                formdata={this.state.formdata.title}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'content'}
                                formdata={this.state.formdata.content}
                                change={(element) => this.updateForm(element)}
                            />

                            <div className="success_label">{this.state.formSuccess}</div>
                            {this.state.formError ?
                                <div className="error_label">
                                    Something is wrong
                                </div>
                                : ''
                            }
                            {this.state.entityID ? 
                            <Fileuploader
                                dir="portfolio"
                                parentID={this.state.entityID}
                                tag='Insert Image'
                                defaultImg={this.state.defaultImg}
                                defaultImgName={this.state.formdata.image.value}
                                resetImage={() => this.resetImage()}
                                filename={(filename) => this.storeFilename(filename)}
                            /> :
                            null
                        }
                            <div className="admin_submit">
                                <button onClick={(event) => this.submitForm(event)}>
                                    Save
                                </button>
                            </div>
                        </form>

                    </div>
                    {this.state.entityID ? <TablePortfolioImgs entityID={this.state.entityID} /> : null}
                </div>
            </AdminLayout>
        );
    }
}

export default EditPortfolio;