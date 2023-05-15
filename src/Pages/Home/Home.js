import React from 'react';
import Hero from '../../Component/Home-hero-section/hero';
import Ambition from '../../Component/Ambition-section/Ambition';
import Problem from '../../Component/Problem-section/Problem';
import Solution from '../../Component/Solution-section/Solution';
function Home() {
    return (
        <div>
        <Hero/>
        <Ambition/>
        <Problem/>
        <Solution/>
        </div>
    );
}

export default Home;