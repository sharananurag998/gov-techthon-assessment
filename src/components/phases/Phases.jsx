import React from 'react'
import './Phases.css';
import Logo from '../logo/Logo';

function Phases() {
    return (
        <div className="body__container">

            <div className="jury__detail">
                <h3>
                    Name: Test
                </h3>
                <h3>
                    Group: AI-Crop Recommendation
                </h3>
            </div>

            <div className="phases__heading">
                <h2>Select the Phase to Evaluate</h2>
            </div>

            <div className="phases__container">
                <p>
                    1. <a href="http://google.com" target="_self">Requirement Assessment</a>
                </p>

                <p>
                    2. <a href="http://google.com" target="_self">Architect-Design Assessment</a>
                </p>

                <p>
                    3. <a href="http://google.com" target="_self">Coding, Testing Assessment</a>
                </p>

                <p>
                    4. <a href="http://google.com" target="_self">Final Assessment</a>
                </p>

                <p>
                    5. <a href="http://google.com" target="_self">Grand Assessment</a>
                </p>

            </div>
        </div>
    )
}

export default Phases;
