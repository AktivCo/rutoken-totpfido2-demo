
import React from 'react';

const Layout = ({ children }) => {

    return (
        <div className="layout-container d-flex">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        <div className='layout-logo'></div>
                    </div>
                    <div className="col-lg-8">
                        {children}
                    </div>
                    <div className="col-lg-2">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
