import React from 'react';
import PlanningPoker from './PlanningPoker.jpg';

const Header: React.FC<{}> = () => {
    return (
        <div className="mt-3 mb-3">
            <img src={PlanningPoker} alt="Scrum Poker" />
        </div>
    );
};

export default Header;
