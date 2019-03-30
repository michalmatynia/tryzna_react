import React, { Component } from 'react';
import Slider from "react-slick";

import GetImageUrl from './GetImageUrl';

import { firebaseSlider } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';

class Carousel extends Component {

    state = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        isloading: true,
        slides: [],
    }

    componentDidMount() {
        firebaseSlider.orderByChild('position').once('value')
            .then((snapshot) => {
                const slides = firebaseLooper(snapshot);

                this.setState({
                    isloading: false,
                    slides
                })
            })
    }

    render() {
        return (
            <div
                className="carousel_wrapper"
                style={{
                    height: `${window.innerHeight}px`,
                    width: `${window.innerWidth}px`,
                    overflow: 'hidden'
                }}
            >
                <Slider {...this.state}>
                    {
                        this.state.slides ?
                            this.state.slides.map((slide, i) => (
                                
                                <GetImageUrl key={i}
                                thisId = {slide.id}
                                thisImage = {slide.image}
                                thisImageFolder = {'slides'}
                                 />
                            ))
                            : null
                    }
                </Slider>
            </div>
        );
    }
}

export default Carousel;