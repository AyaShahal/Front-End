import React from "react";
import "./Problem.css";
function Problem() {
  return (
    <div className="problem-section">
        <div className="problem-text">
      <h1>The Problem</h1>
      <p>
        The problem of food waste refers to the significant amount of food that
        is discarded or wasted instead of being consumed
      </p>
      </div>
      <div class="aboutAuthor">
        <div class="K2_bio">
          <div className="K3_bio">
            <h2> Food Waste</h2>
            <span>33%</span>
          </div>
          <div class="h-divider"></div>
          <p>
            {" "}
            The amount of food wasted at various stages of the supply chain,
            from production to consumption, is staggering. Food that could have
            been consumed ends up in landfills, contributing to greenhouse gas
            emissions, wasting valuable resources, and exacerbating the global
            food crisis
          </p>
          <div class="h-divider">
            <div class="shadow"></div>
          </div>
        </div>
      </div>
      <div class="aboutAuthor">
        <div class="K2_bio">
          <div className="K3_bio">
            <h2> Environmental Degradation</h2>
            <span>33%</span>
          </div>
          <div class="h-divider"></div>
          <p>
            {" "}
            Food waste has severe environmental implications. As wasted food
            decomposes in landfills, it releases methane, a potent greenhouse
            gas that contributes to climate change. Additionally, the
            production, processing, and transportation of food that ultimately
            goes to waste require significant amounts of water, energy, and
            other resources, putting further strain on the environment.
          </p>
          <div class="h-divider">
            <div class="shadow"></div>
          </div>
        </div>
      </div>
      <div class="aboutAuthor">
        <div class="K2_bio">
          <div className="K3_bio">
            <h2> Social Inequity</h2>
            <span>33%</span>
          </div>
          <div class="h-divider"></div>
          <p>
            {" "}
            Food waste perpetuates social inequality and food insecurity. While
            food is wasted, millions of people around the world suffer from
            hunger and malnutrition. Food waste not only represents a missed
            opportunity to address these pressing social issues but also deepens
            the divide between those with access to an abundance of food and
            those struggling to meet their basic nutritional needs.
          </p>
          <div class="h-divider">
            <div class="shadow"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Problem;
