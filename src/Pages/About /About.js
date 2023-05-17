import React from 'react';
import Abouthero from '../../Component/About-Hero-section/About-hero';
import Aboutsection from '../../Component/About-section/About';
import Join from '../../Component/Join us/join-us';
function About() {
    return (
        <div>
            <Abouthero/>
            <Aboutsection/>
            <Join/>
        </div>
    );
}

export default About;