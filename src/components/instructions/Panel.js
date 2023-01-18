import React from 'react';
import './Panel.css';

const Panel = () => {
    return (
        <div id="panel" className="card">
            <div className="card-body">
                <h5 className="card-title">General</h5>
                <ol>
                    <p>
                    Welcome to the Internship Database!

 

This site captures information to future focus internship planning and applying with companies from around the country.

 

Use the filter features to narrow down your interests and populate your list of companies to find when their internship applications will open so you can work proactively to apply early.

 

This information will help you be better prepared to apply and companies will benefit from your quality application earlier, it’s a win-win!
                    </p>
                   
                </ol>
                <h5 className="card-title">Work Cited</h5>
                <ol>
                     <p className="card-text tab">
                        The inspiration for this project are found <a href="https://github.com/Zackhardtoname/internships" target="_blank" rel="noopener noreferrer">Here</a>
                    </p>
                </ol>
                {/* <p className="card-text tab">
                    
                </p> */}
                
            </div>
        </div>
    );
};

export default Panel;