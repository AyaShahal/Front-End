import React from 'react';
import './Ambition.css';
import icon from './HandsCelebrate.a15dd155.svg';
import icon1 from './PlantGrowing.9904aeaf.svg';
import icon2 from './PlanetEarth.d32221e0.svg';
function Ambition() {
    return (
     
            <div className='Ambition-section'>
                <div className='Ambition-title'>
            <h1>OUR AMBITION</h1>
            </div>
            <div className='Ambition-text'>
            <p>We're working to end food waste. To do so, we're assembling a passionate team of problem-solvers to help us make this happen. From customer care to sales, marketing to public affairs - we give you a chance to use your talent for good.</p>
        </div>
        <div className='Ambition-card'>
        <div class="card-space">
    <div class="card">
      <div class="face front">
      <img class="tgtg-icon tgtg-stats-promo__icon" src={icon} alt="" width="136" height="136"/>
        <h1>Mission</h1>
        <p>Bridging surplus food and charitable organizations to reduce waste, protect the environment, and promote social responsibility</p>
      </div>
      <div class="face back">
        <p>Our mission is to bridge the gap between surplus food and charitable organizations, aiming to achieve multiple positive outcomes. Firstly, we strive to reduce food waste by connecting businesses, restaurants, and other food providers that have excess food with charitable organizations that can efficiently distribute it to those in need.</p>
      </div>
    </div>
  </div>
  <div class="card-space">
    <div class="card">
      <div class="face front">
      <img class="tgtg-icon tgtg-stats-promo__icon" src={icon1} alt="" width="136" height="136"/>
        <h1>Vision</h1>
        <p>Revolutionizing food waste reduction through technology, collaboration, and social responsibility.</p>
      </div>
      <div class="face back">
        <p>Our organization is dedicated to revolutionizing food waste reduction by leveraging technology, fostering collaboration, and promoting social responsibility. We believe that by combining these elements, we can create a substantial and sustainable impact on reducing food waste and its associated negative consequences.</p>
      </div>
    </div>
  </div>
  <div class="card-space">
    <div class="card">
      <div class="face front">
      <img class="tgtg-icon tgtg-stats-promo__icon" src={icon2} alt="" width="136" height="136"/>
        <h1>Impact</h1>
        <p>Our platform aims to have a significant impact by reducing food waste, minimizing environmental degradation, and fostering social responsibility.</p>
      </div>
      <div class="face back">
        <p>At our platform, we have a clear objective: to make a significant impact by reducing food waste, minimizing environmental degradation, and fostering social responsibility. We recognize the interconnectedness of these goals and strive to address them in a comprehensive and integrated manner.</p>
      </div>
    </div>
  </div>
            </div>
            </div>
  
    );
}

export default Ambition;