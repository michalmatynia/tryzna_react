import React, { Component } from 'react';
import { firebase } from '../../../firebase';


class GetImageUrl extends Component {

    state = {
        url: ''
    }

    componentDidMount() {
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
            <div
                className="carousel_image"
                style={{
                    background: `url(${this.state.url})`,
                    height: `${window.innerHeight}px`
                }}
            >
            </div>
        );
    }
}

export default GetImageUrl;
