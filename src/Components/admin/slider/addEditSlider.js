import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';

import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';

import Fileuploader from '../../ui/fileuploader';
import { firebaseSlider, firebaseDB, firebase } from '../../../firebase';

// Icons
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

class AddEditSlider extends Component {

    state = {
        slideId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formdata: {
            position: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a position',
                    name: 'select_position',
                    type: 'select',
                    options: [
                        { key: '', value: '' }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
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

    updateFields = (slide, slideId, formType, defaultImg) => {
        const newFormdata = { ...this.state.formdata }


        for (let key in newFormdata) {
            newFormdata[key].value = slide[key];
            newFormdata[key].valid = true
        }

        this.setState({
            slideId,
            defaultImg,
            formType,
            formdata: newFormdata
        })
    }

    componentWillMount() {
        const slideId = this.props.match.params.id;

        const newFormdata = { ...this.state.formdata }

        // Format the position Selector
        firebaseDB.ref('slider').orderByChild('position').once('value')
            .then((snapshot) => {

                let counter = 1;
                let newOptionAr = []

                snapshot.forEach(() => {

                    newOptionAr.push({ key: counter, value: counter })
                    counter = counter + 1;

                    if (!slideId) {
                        newOptionAr.push({ key: counter, value: counter })
                        counter = counter + 1;
                    }


                })

                if (newOptionAr && newOptionAr.length) {
                    newFormdata.position.config.options = newOptionAr
                } else {
                    newOptionAr = [{ key: 1, value: 1 }]
                    newFormdata.position.config.options = newOptionAr
                }


                this.setState({
                    formdata: newFormdata
                })

            })

    }

    componentDidMount() {
        const slideId = this.props.match.params.id;
        
        if (!slideId) {
            this.setState({
                formType: 'Add'
            })
        } else {
            firebaseDB.ref(`slider/${slideId}`).once('value')
                .then(snapshot => {
                    const slideData = snapshot.val();
                    
console.log(slideData.image)
console.log(typeof(slideData.image))  
                    firebase.storage().ref('slides')
                        .child(slideData.image).getDownloadURL()
                        .then(url => {
                            this.updateFields(slideData, slideId, 'Edit', url)
                        }).catch(e => {

                            this.updateFields({
                                ...slideData,
                                image: ''
                            }, slideId, 'Edit', '')
                        })
                })
        }

    }


    updateForm(element, content = '') {
        const newFormdata = { ...this.state.formdata }
        const newElement = { ...newFormdata[element.id] }

        if (content === '') {
            newElement.value = element.event.target.value;
        } else {
            newElement.value = content
        }


        // console.log(this.state.formdata.position.valid)
        // console.log(this.state.formdata.image.valid)

        let validData = validate(newElement)
        // console.log(newElement)
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



        firebaseDB.ref('slider/' + itemToRemoveID).set(null)
            .then(() => {
                console.log('data removed')

                this.props.history.push('/admin_slider');

            })
            .catch((e) => {
                console.log(e)
            })
    }
    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        // console.log(this.state.formdata.position.valid)
        // console.log(this.state.formdata.image.valid)

        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
            // console.log(formIsValid)
            // console.log(this.state.formdata[key].valid)
            formIsValid = this.state.formdata[key].valid && formIsValid;

        }




        if (formIsValid) {
            if (this.state.formType === 'Edit') {
                firebaseDB.ref(`slider/${this.state.slideId}`)
                    .update(dataToSubmit).then(() => {
                        this.successForm('Update correctly');
                    }).catch(e => {
                        this.setState({ formError: true })
                    })
            } else {

                firebaseSlider.push(dataToSubmit).then(() => {
                    this.props.history.push('/admin_slider')
                }).catch(e => {
                    this.setState({
                        formError: true
                    })
                })
            }

        } else {
            this.setState({
                formError: true
            })
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

                            <Fileuploader
                                dir="slides"
                                tag={"Slide image"}
                                defaultImg={this.state.defaultImg}
                                defaultImgName={this.state.formdata.image.value}
                                resetImage={() => this.resetImage()}
                                filename={(filename) => this.storeFilename(filename)}
                            />
                            <FormField
                                id={'position'}
                                formdata={this.state.formdata.position}
                                change={(element) => this.updateForm(element)}
                            />

                            <div className="success_label">{this.state.formSuccess}</div>
                            {this.state.formError ?
                                <div className="error_label">
                                    Something is wrong
                                </div>
                                : ''
                            }
                            <div className="admin_submit">
                                <button onClick={(event) => this.submitForm(event)}>
                                    {this.state.formType}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default AddEditSlider;