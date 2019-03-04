import React from 'react';
import Slider from "react-slick";

import slide_one from '../../../Resources/images/banner/banner01.jpg';
import slide_two from '../../../Resources/images/banner/banner02.jpg';
import slide_three from '../../../Resources/images/banner/banner03.jpg';

const Carousel = () => {

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500
    }

    return (
        <div
            className="carousel_wrapper"
            style={{
                height: `${window.innerHeight}px`,
                width: `${window.innerWidth}px`,
                overflow: 'hidden'
            }}
        >
            <Slider {...settings}>
                <div>
                    <div
                        className="carousel_image"
                        style={{
                            background: `url(${slide_one})`,
                            height: `${window.innerHeight}px`                        }}
                    >
                    </div>
                </div>

                <div>
                    <div
                        className="carousel_image"
                        style={{
                            background: `url(${slide_two})`,
                            height: `${window.innerHeight}px`
                        }}
                    >

                    </div>
                </div>

                <div>
                    <div
                        className="carousel_image"
                        style={{
                            background: `url(${slide_three})`,
                            height: `${window.innerHeight}px`
                        }}
                    >

                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default Carousel;