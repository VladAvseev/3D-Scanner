import React, {useEffect} from 'react';
import './Pyramid.css';

const Pyramid = ({cubeRotate, setFigurePeaks}) => {
    const initialPyramidPeaksState = {
        Left: { x: -100, y: -70, z: 48, adjacentPeaks: ['Right', 'Top', 'Back'] },
        Right: { x: 100, y: -70, z: 48, adjacentPeaks: ['Left', 'Top', 'Back'] },
        Top: { x: 0, y: -70, z: -96, adjacentPeaks: ['Right', 'Left', 'Back']},
        Back: { x: 0, y: 96, z: 0, adjacentPeaks: ['Right', 'Top', 'Left']}
    }

    useEffect(() => {
        setFigurePeaks(initialPyramidPeaksState);
    }, [])

    return (
        <div className={'container'}>
            <div className={'pyramid'}
                 style={{transform: `rotateY(${cubeRotate.y}deg) rotateX(${cubeRotate.x}deg) rotateZ(${cubeRotate.z}deg)`}}>
                <div className={'pyramid__side pyramid__front'}></div>
                <div className={'pyramid__side pyramid__right'}></div>
                <div className={'pyramid__side pyramid__left'}></div>
                <div className={'pyramid__side pyramid__bottom'}></div>
            </div>
        </div>
        );
};

export default Pyramid;