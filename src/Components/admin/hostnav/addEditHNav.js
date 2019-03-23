import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';

import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';

import { firebaseDB, firebaseHNavs } from '../../../firebase'

class AddEditHNav extends Component {

    state = {
        matchId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        teams: [],
        formdata: {
            title: {
                element: 'input',
                value: '',
                config: {
                    label: 'Menu Item',
                    name: 'menuitem_input',
                    type: 'text',
                },
                validation: {
                    required: false,
                },
                valid: false,
                validationMessage: '',
                showlabel: true

            }
        }
    }

    updateFields = (menuitem, menuitemId, formType) =>{
        const newFormdata = { ...this.state.formdata}

        for(let key in newFormdata){
            newFormdata[key].value = menuitem[key];
            newFormdata[key].valid = true
        }

        this.setState({
            menuitemId,
            formType,
            formdata: newFormdata
        })
    }


    componentDidMount(){
        const menuitemId = this.props.match.params.id;


        if(!menuitemId){
            this.setState({
                formType:'Add MenuItem'
            })
        } else {
           firebaseDB.ref(`hnavs/${menuitemId}`).once('value')
                .then( snapshot => {
                    this.updateFields(snapshot.val(),menuitemId,'Edit Menu Item')
                })
           
        }

    }


    updateForm(element, content = ''){
        const newFormdata = {...this.state.formdata}
        const newElement = { ...newFormdata[element.id]}

        if(content === ''){
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

    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formdata) {


            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }

        if (formIsValid) {
            if (this.state.formType === 'Edit Menu Item') {
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
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={(event) => this.submitForm(event)}>
                            <FormField
                                id={'title'}
                                formdata={this.state.formdata.title}
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