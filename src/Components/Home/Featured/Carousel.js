import React from 'react';
import Slider from "react-slick";

import slide_one from '../../../Resources/images/banner/banner01.jpg';
// import slide_two from '../../../Resources/images/banner/banner02.jpg';
// import slide_three from '../../../Resources/images/banner/banner03.jpg';

const Carousel = () => {

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500
    }

    return (
        <div
            className="carousel_wrapper"
            style={{
                height: `${window.innerHeight}px`,
                overflow: 'hidden'
            }}
        >
            <Slider {...settings}>
                <div>
                    <div
                        className="carousel_image"
                        style={{
                            background: `url(${slide_one})`,
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