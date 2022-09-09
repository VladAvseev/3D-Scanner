import React, {useEffect} from 'react';
import './Cube.css';

const Cube = ({cubeRotate, setFigurePeaks}) => {
    const initialCubePeaksState = {
        LTF: { x: -100, y: 100, z: 100, adjacentPeaks: ['RTF', 'LDF', 'LTB'] },
        RTF: { x: 100, y: 100, z: 100, adjacentPeaks: ['LTF', 'RDF', 'RTB'] },
        LDF: { x: -100, y: -100, z: 100, adjacentPeaks: ['RDF', 'LTF', 'LDB'] },
        RDF: { x: 100, y: -100, z: 100, adjacentPeaks: ['LDF', 'RTF', 'RDB'] },
        LTB: { x: -100, y: 100, z: -100, adjacentPeaks: ['RTB', 'LDB', 'LTF'] },
        RTB: { x: 100, y: 100, z: -100, adjacentPeaks: ['LTB', 'RDB', 'RTF'] },
        LDB: { x: -100, y: -100, z: -100, adjacentPeaks: ['RDB', 'LTB', 'LDF'] },
        RDB: { x: 100, y: -100, z: -100, adjacentPeaks: ['LDB', 'RTB', 'RDF'] }
    }

    useEffect(() => {
        setFigurePeaks(initialCubePeaksState);
    }, [])

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