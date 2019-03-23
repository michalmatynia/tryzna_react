import React from 'react';

const Location = () => {
    return (
        <div className="location_wrapper">
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1190.386584952812!2d14.648569299242888!3d53.365214305558936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4700a7da55db250d%3A0xd4188b304932eed1!2sFioletowa+71%2C+70-001+Szczecin!5e0!3m2!1spl!2spl!4v1550998127760"
            width="100%"
            height="500px"
            frameBorder="0"
            allowFullScreen
            title="location frame" >
            </iframe>
        <div className="location_tag">
        <div>Location</div>

        </div>
        </div>
    );
};

export default Location;