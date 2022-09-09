import React, {useCallback, useEffect, useState} from 'react';
import 'matrix-js';
import './Scene.css';
import Cube from "../figures/Cube/Cube";
import Scanner from "../Scanner/Scanner";
import Pyramid from "../figures/Pyramid/Pyramid";

const Scene = ({ setSlicePeaks, settingState, setSettingState, }) => {
    const [initialFigurePeaks, setInitialFigurePeaks] = useState(null);
    const [figurePeaks, setFigurePeaks] = useState(null);

    const handleCubeKeyDown = useCallback((event) => {
        const ROTATE_SPEED = 1;

        switch (event.keyCode) {
            case 65:
                setSettingState((prev) => {
                    return {...prev, cubeRotate: {...prev.cubeRotate, y: prev.cubeRotate.y - ROTATE_SPEED}}
                });
                break;
            case 68:
                setSettingState((prev) => {
                    return {...prev, cubeRotate: {...prev.cubeRotate, y: prev.cubeRotate.y + ROTATE_SPEED}}
                });
                break;
            case 87:
                setSettingState((prev) => {
                    return {...prev, cubeRotate: {...prev.cubeRotate, x: prev.cubeRotate.x + ROTATE_SPEED}}
                });
                break;
            case 83:
                setSettingState((prev) => {
                    return {...prev, cubeRotate: {...prev.cubeRotate, x: prev.cubeRotate.x - ROTATE_SPEED}}
                });
                break;
            case 69:
                setSettingState((prev) => {
                    return {...prev, cubeRotate: {...prev.cubeRotate, z: prev.cubeRotate.z + ROTATE_SPEED}}
                });
                break;
            case 81:
                setSettingState((prev) => {
                    return {...prev, cubeRotate: {...prev.cubeRotate, z: prev.cubeRotate.z - ROTATE_SPEED}}
                });
                break;
            case 38:
                if (settingState.scannerPosition < 300) {
                    setSettingState((prev) => {
                        return {...prev, scannerPosition: prev.scannerPosition + 1}
                    });
                }
                break;
            case 40:
                if (settingState.scannerPosition > -300) {
                    setSettingState((prev) => {
                        return {...prev, scannerPosition: prev.scannerPosition - 1}
                    });
                }
                break;
        }
    }, [settingState.scannerPosition]);

    const rotateX = (peak) => {
        const x = peak.x;
        const y = peak.y * Math.cos(settingState.cubeRotate.x * Math.PI/180) - peak.z * Math.sin(settingState.cubeRotate.x * Math.PI/180);
        const z = peak.y * Math.sin(settingState.cubeRotate.x * Math.PI/180) + peak.z * Math.cos(settingState.cubeRotate.x * Math.PI/180);
        return {x, y, z}
    }

    const rotateY = (peak) => {
        const x = peak.x * Math.cos(settingState.cubeRotate.y * Math.PI/180) + peak.z * Math.sin(settingState.cubeRotate.y * Math.PI/180);
        const y = peak.y;
        const z = -peak.x * Math.sin(settingState.cubeRotate.y * Math.PI/180) + peak.z * Math.cos(settingState.cubeRotate.y * Math.PI/180);
        return {x, y, z}
    }

    const rotateZ = (peak) => {
        const x = peak.x * Math.cos(settingState.cubeRotate.z * Math.PI/180) - peak.y * Math.sin(settingState.cubeRotate.z * Math.PI/180);
        const y = peak.x * Math.sin(settingState.cubeRotate.z * Math.PI/180) + peak.y * Math.cos(settingState.cubeRotate.z * Math.PI/180);
        const z = peak.z;
        return {x, y, z}
    }

    const updatePeak = (peak) => {
        return rotateZ(rotateY(rotateX(peak)));
    }

    useEffect(() => {
        setFigurePeaks(initialFigurePeaks);
    }, [initialFigurePeaks]);

    useEffect(() => {
        const newPeaks = {}
        for (let key in initialFigurePeaks) {
            const peak = updatePeak(initialFigurePeaks[key]);
            newPeaks[key] = {...peak, adjacentPeaks: initialFigurePeaks[key].adjacentPeaks};
        }
        setFigurePeaks(newPeaks);
    }, [settingState.cubeRotate]);

    useEffect(() => {
        const slicePeaks = [];
        for (let key in figurePeaks) {
            if (figurePeaks[key].y === settingState.scannerPosition) {
                slicePeaks.push({
                    x: figurePeaks[key].x,
                    y: figurePeaks[key].z
                })
            }
            if (figurePeaks[key].y > settingState.scannerPosition) {
                figurePeaks[key].adjacentPeaks.forEach((adjacentPeak) => {
                    if (figurePeaks[adjacentPeak].y < settingState.scannerPosition) {
                        const attitude = (settingState.scannerPosition - figurePeaks[adjacentPeak].y) / (figurePeaks[key].y - settingState.scannerPosition) ;
                        const x = (figurePeaks[adjacentPeak].x + attitude * figurePeaks[key].x) / (1 + attitude);
                        const y = (figurePeaks[adjacentPeak].z + attitude * figurePeaks[key].z) / (1 + attitude);
                        slicePeaks.push({ x, y});
                    }
                })
            }
        }
        setSlicePeaks(slicePeaks);
    }, [settingState.scannerPosition, settingState.cubeRotate]);

    return (
        <div
            className={'scene'}
            tabIndex={0}
            onKeyDown={handleCubeKeyDown}
        >
            {settingState.figure === 'cube'
                ? (
                    <Cube cubeRotate={settingState.cubeRotate} setFigurePeaks={setInitialFigurePeaks}/>
                ) : settingState.figure === 'pyramid' ?
                    (
                        <Pyramid cubeRotate={settingState.cubeRotate} setFigurePeaks={setInitialFigurePeaks}/>
                    )
                        : null
            }
            <Scanner scannerPosition={settingState.scannerPosition}/>
        </div>
    );
};

export default Scene;