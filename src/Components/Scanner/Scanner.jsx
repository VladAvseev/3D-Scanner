import React from 'react';
import './Scaner.css';

const Scanner = ({scannerPosition}) => {
    return (
        <div
            className={'scanner'}
            style={{top: `${300 - scannerPosition}px`}}
        />
    );
};

export default Scanner;