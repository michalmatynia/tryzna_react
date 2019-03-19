import React from 'react';
import Fade from 'react-reveal/Fade';

const Footer = () => {
    return (
        <footer className="bck_black">
            <Fade delay={500}>
            
            <div className="font_righteous logo_font">Tryzna</div>
            <div className="footer_wrapper">
            
            <div className="footer_column footer_left">
            <p>All Content Copyright © <b>Tryzna</b> ® Permission to distribute any material from the webpage is given in a written form only. To any performance delivered by <b>Tryzna</b> ® the following <a href="images/pdfs/terms.pdf" target="_blank" rel="noopener">Terms & Conditions</a> apply.</p>
            </div>
            <div className="footer_column footer_right">
            Stay in touch
            <hr/>
            </div>
            </div>
            </Fade>
        </footer>
    );
};

export default Footer;