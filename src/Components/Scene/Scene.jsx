import React, {useCallback, useEffect, useState} from 'react';
import 'matrix-js';
import './Scene.css';
import Cube from "../figures/Cube/Cube";
import Scanner from "../Scanner/Scanner";

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

const Scene = ({ setSlicePeaks, settingState, setSettingState }) => {
    const [cubePeaks, setCubePeaks] = useState({initialCubePeaksState});

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
        const newPeaks = {}
        for (let key in initialCubePeaksState) {
            const peak = updatePeak(initialCubePeaksState[key]);
            newPeaks[key] = {...peak, adjacentPeaks: initialCubePeaksState[key].adjacentPeaks};
        }
        setCubePeaks(newPeaks);
    }, [settingState.cubeRotate]);

    useEffect(() => {
        const slicePeaks = [];
        for (let key in cubePeaks) {
            if (cubePeaks[key].y === settingState.scannerPosition) {
                slicePeaks.push({
                    x: cubePeaks[key].x,
                    y: cubePeaks[key].z
                })
            }
            if (cubePeaks[key].y > settingState.scannerPosition) {
                cubePeaks[key].adjacentPeaks.forEach((adjacentPeak) => {
                    if (cubePeaks[adjacentPeak].y < settingState.scannerPosition) {
                        const attitude = (settingState.scannerPosition - cubePeaks[adjacentPeak].y) / (cubePeaks[key].y - settingState.scannerPosition) ;
                        const x = (cubePeaks[adjacentPeak].x + attitude * cubePeaks[key].x) / (1 + attitude);
                        const y = (cubePeaks[adjacentPeak].z + attitude * cubePeaks[key].z) / (1 + attitude);
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
            <Cube cubeRotate={settingState.cubeRotate}/>
            <Scanner scannerPosition={settingState.scannerPosition}/>
        </div>
    );
};

export default Scene;