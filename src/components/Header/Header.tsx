import React from 'react';
import './Header.scss';
import PlanningPoker from './PlanningPoker.jpg';

const Header: React.FC<{}> = () => {
    return (
        <div className="header">
            <div className="imageHolder">
                <img src={PlanningPoker} alt="Scrum Poker" />
            </div>
        </div>
    );
};

export default Header;
