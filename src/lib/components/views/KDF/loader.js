import React from 'react';

class Loader extends React.Component {
    render() {
        return (
            <div className="site-loader loader">
                <div className="dot dot1"></div>
                <div className="dot dot2"></div>
                <div className="dot dot3"></div>
                <div className="dot dot4"></div>
            </div>
        )
    }
}

export default Loader;