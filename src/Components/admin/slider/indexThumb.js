import React, { Component } from 'react';
import { firebaseSlider, firebaseDB, firebase } from '../../../firebase';


class indexThumb extends Component {

    state = {
        url: ''  
    }

    componentDidMount(){
        firebase.storage().ref('slides')
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
            <img src={this.state.url}/>
            </div>
        );
   }
}

export default indexThumb;


