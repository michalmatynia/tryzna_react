import React, { Component } from 'react';
import { firebase } from '../../firebase';


class indexThumb extends Component {

    state = {
        url: ''  
    }

    componentDidMount(){
        firebase.storage().ref(this.props.thisImageFolder)
        .child(this.props.thisImage).getDownloadURL()
        .then(url => {
            this.setState({
                url
            })
})
    }

    render() {
        
        return (
            <div>
            <img src={this.state.url} alt="thumbnail"/>
            </div>
        );
   }
}

export default indexThumb;


