import React from 'react'
import './Phases.css';

function Phases() {
    return (
        <div className="phases__container">

            <h2 className="phases__heading">Select the Phase to Evaluate</h2>

            <p className="phases__name">
                Phase 1
                <a href="http://google.com" target="_self">
                    <button className="phase__buttonEvaluate">Evaluate</button>
                </a>
            </p>

            <p className="phases__name">
                Phase 2
                <a href="http://google.com" target="_self">
                    <button className="phase__button">Evaluate</button>
                </a>
            </p>

            <p className="phases__name">
                Phase 3
                <a href="http://google.com" target="_self">
                    <button className="phase__button">Evaluate</button>
                </a>
            </p>

            <p className="phases__name">
                Phase 4
                <a href="http://google.com" target="_self">
                    <button className="phase__button">Evaluate</button>
                </a>
            </p>

            <p className="phases__name">
                Phase 5
                <a href="http://google.com" target="_self">
                    <button className="phase__button">Evaluate</button>
                </a>
            </p>

        </div>
    )
}

export default Phases;
