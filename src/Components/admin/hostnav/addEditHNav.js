import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';

import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';

import { firebaseDB, firebaseHNavs } from '../../../firebase'

// Icons
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

class AddEditHNav extends Component {

    state = {
        menuitemId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        teams: [],
        formdata: {
            title: {
                element: 'input',
                value: '',
                config: {
                    label: 'Title',
                    name: 'menuitem_title',
                    type: 'text',
                },
                validation: {
                    required: false,
                },
                valid: false,
                validationMessage: '',
                showlabel: true

            },
            link: {
                element: 'input',
                value: '',
                config: {
                    label: 'Link',
                    name: 'menuitem_link',
                    type: 'text',
                },
                validation: {
                    required: false,
                },
                valid: false,
                validationMessage: '',
                showlabel: true

            },
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
            }
        }
    }

    updateFields = (menuitem, menuitemId, formType) => {
        const newFormdata = { ...this.state.formdata }

        for (let key in newFormdata) {
            newFormdata[key].value = menuitem[key];
            newFormdata[key].valid = true
        }

        this.setState({
            menuitemId,
            formType,
            formdata: newFormdata
        })
    }

componentWillMount(){

    const newFormdata = { ...this.state.formdata }

    // Format the position Selector
firebaseDB.ref('hnavs').orderByChild('position').once('value')
.then((snapshot) => {

    let counter = 1;
    let newOptionAr = []

    snapshot.forEach(() => {
        newOptionAr.push({key: counter, value: counter})
        counter = counter + 1;
    })

    newFormdata.position.config.options = newOptionAr

    this.setState({
        formdata: newFormdata
    })
})
   
}

    componentDidMount() {
        const menuitemId = this.props.match.params.id;

        if (!menuitemId) {

// Set the Form Type
            this.setState({
                formType: 'Add'
            })

        } else {
            firebaseDB.ref(`hnavs/${menuitemId}`).once('value')
                .then(snapshot => {
                    this.updateFields(snapshot.val(), menuitemId, 'Edit')
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

        if ((newElement.config.name === 'select_position') && (this.state.formType === 'Edit')) {

            firebaseDB.ref('hnavs').orderByChild('position').once('value')
                .then((snapshot) => {

                    let counter = 0;

                    snapshot.forEach(() => {
                        counter = counter + 1;
                    })


                    // Update position on two elements
                    snapshot.forEach((childSnapshot) => {

                        let grandChildSnaphot = childSnapshot.val()
                        let grandChildSnaphotKey = childSnapshot.key

                        if ((newFormdata.title.value !== grandChildSnaphot.title) && (grandChildSnaphot.position === newElement.value)) {

                            firebaseDB.ref(`hnavs/${grandChildSnaphotKey}`).update({
                                position: previousPosition
                            })


                            firebaseDB.ref(`hnavs/${this.props.match.params.id}`).update({
                                position: newElement.value
                            })
                        }
                    })

                })
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
    successForm(message) {
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



        firebaseDB.ref('hnavs/' + itemToRemoveID).set(null)
            .then(() => {
                console.log('data removed')

                this.props.history.push('/admin_hostnav');

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

        if (formIsValid) {
            if (this.state.formType === 'Edit') {
                firebaseDB.ref(`hnavs/${this.state.menuitemId}`)
                    .update(dataToSubmit)
                    .then(() => {
                        this.successForm('Updated correctly');

                    })
                    .catch((e) => {
                        this.setState({ formError: true })
                    })
            } else {
                ///Add Match

                firebaseHNavs.push(dataToSubmit)
                    .then(() => {
                        this.props.history.push('/admin_hostnav');
                    })
                    .catch((e) => {
                        this.setState({ formError: true })
                    })

            }

        } else {
            this.setState({
                formError: true
            })
        }
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
                                id={'link'}
                                formdata={this.state.formdata.link}
                                change={(element) => this.updateForm(element)}
                            />
                            <FormField
                                id={'position'}
                                formdata={this.state.formdata.position}
                                change={(element) => this.updateForm(element)}
                            />
                            <div className="success_label">
                                {this.state.formSuccess}
                            </div>
                            {this.state.formError ?
                                <div className="error_label">
                                    Something is wrong</div>
                                : null}
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

export default AddEditHNav;