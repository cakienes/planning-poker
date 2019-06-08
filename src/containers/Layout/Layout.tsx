import React from 'react';
import Header from '../../components/Header/Header';

const Layout: React.FC = ({ children }) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <Header />
                </div>
            </div>
            <div className="row ">
                <div className="col">{children}</div>
            </div>
        </div>
    );
};

export default Layout;
