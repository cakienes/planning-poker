import React from 'react';

const Layout: React.FC = ({ children }) => {
    return (
        <div className="container-fluid">
            <div className="row ">
                <div className="col">{children}</div>
            </div>
        </div>
    );
};

export default Layout;
