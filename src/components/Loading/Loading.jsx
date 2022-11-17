import React from 'react';
import './Loading.css'
const Loading = () => {
    return (
        <div className={'Loading'}>
            <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <h3 className="allowData">allow getting location</h3>

        </div>
    );
};

export default Loading;
