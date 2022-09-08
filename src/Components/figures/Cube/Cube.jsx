import React from 'react';
import './Cube.css';

const Cube = ({cubeRotate}) => {

    return (
        <div className={'container'}>
            <div
                className={'cube'}
                style={{transform: `rotateY(${cubeRotate.y}deg) rotateX(${cubeRotate.x}deg) rotateZ(${cubeRotate.z}deg)`}}
            >
                <div className={'side front'}>
                </div>
                <div className={'side back'}></div>
                <div className={'side right'}></div>
                <div className={'side left'}></div>
                <div className={'side top'}></div>
                <div className={'side bottom'}></div>
            </div>
        </div>
    );
};

export default Cube;