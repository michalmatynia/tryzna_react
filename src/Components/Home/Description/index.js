import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

import { firebaseDB } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';

class Description extends Component {

    state = {
        isloading: true,
        description: [],
    }

    componentDidMount() {
        firebaseDB.ref('desc').once('value')
            .then((snapshot) => {
                const desc = firebaseLooper(snapshot);

                this.setState({
                    isloading: false,
                    desc
                })
            })
    }

    render() {
        return (
            <Fade>
        <div className="desc_wrapper">
        

        {
                        this.state.desc ?
                            this.state.desc.map((item, i) => (
                                <div key={i} className="center_wrapper">
                                <h2>{item.title}</h2>
                                <div className="description">
                                {item.content}
                                </div>
                                </div>
                            ))
                            : null
                    }
        </div>
            </Fade>
        );
    }
}

export default Description;