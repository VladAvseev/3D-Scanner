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

const Scene = ({ setSlicePeaks }) => {
    const [cubeRotate, setCubeRotate] = useState({
        x: 0,
        y: 0,
        z: 0
    });
    const [cubePeaks, setCubePeaks] = useState({initialCubePeaksState});
    const [scannerPosition, setScannerPosition] = useState(295);

    const handleCubeKeyDown = useCallback((event) => {
        const ROTATE_SPEED = 1;

        switch (event.keyCode) {
            case 65:
                setCubeRotate((prev) => {
                    return {...prev, y: prev.y - ROTATE_SPEED}
                });
                break;
            case 68:
                setCubeRotate((prev) => {
                    return {...prev, y: prev.y + ROTATE_SPEED}
                });
                break;
            case 87:
                setCubeRotate((prev) => {
                    return {...prev, x: prev.x + ROTATE_SPEED}
                });
                break;
            case 83:
                setCubeRotate((prev) => {
                    return {...prev, x: prev.x - ROTATE_SPEED}
                });
                break;
            case 69:
                setCubeRotate((prev) => {
                    return {...prev, z: prev.z + ROTATE_SPEED}
                });
                break;
            case 81:
                setCubeRotate((prev) => {
                    return {...prev, z: prev.z - ROTATE_SPEED}
                });
                break;
            case 38:
                if (scannerPosition < 300) {
                    setScannerPosition((prev) => prev + 1);
                }
                break;
            case 40:
                if (scannerPosition > -300) {
                    setScannerPosition((prev) => prev - 1);
                }
                break;
        }
    }, [scannerPosition]);

    const rotateX = (peak) => {
        const x = peak.x;
        const y = peak.y * Math.cos(cubeRotate.x * Math.PI/180) - peak.z * Math.sin(cubeRotate.x * Math.PI/180);
        const z = peak.y * Math.sin(cubeRotate.x * Math.PI/180) + peak.z * Math.cos(cubeRotate.x * Math.PI/180);
        return {x, y, z}
    }

    const rotateY = (peak) => {
        const x = peak.x * Math.cos(cubeRotate.y * Math.PI/180) + peak.z * Math.sin(cubeRotate.y * Math.PI/180);
        const y = peak.y;
        const z = -peak.x * Math.sin(cubeRotate.y * Math.PI/180) + peak.z * Math.cos(cubeRotate.y * Math.PI/180);
        return {x, y, z}
    }

    const rotateZ = (peak) => {
        const x = peak.x * Math.cos(cubeRotate.z * Math.PI/180) - peak.y * Math.sin(cubeRotate.z * Math.PI/180);
        const y = peak.x * Math.sin(cubeRotate.z * Math.PI/180) + peak.y * Math.cos(cubeRotate.z * Math.PI/180);
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
        console.log(cubeRotate);
    }, [cubeRotate]);

    useEffect(() => {
        const slicePeaks = [];
        for (let key in cubePeaks) {
            if (cubePeaks[key].y === scannerPosition) {
                slicePeaks.push({
                    x: cubePeaks[key].x,
                    y: cubePeaks[key].z
                })
            }
            if (cubePeaks[key].y > scannerPosition) {
                cubePeaks[key].adjacentPeaks.forEach((adjacentPeak) => {
                    if (cubePeaks[adjacentPeak].y < scannerPosition) {
                        const attitude = (scannerPosition - cubePeaks[adjacentPeak].y) / (cubePeaks[key].y - scannerPosition) ;
                        const x = (cubePeaks[adjacentPeak].x + attitude * cubePeaks[key].x) / (1 + attitude);
                        const y = (cubePeaks[adjacentPeak].z + attitude * cubePeaks[key].z) / (1 + attitude);
                        slicePeaks.push({ x, y});
                    }
                })
            }
        }
        setSlicePeaks(slicePeaks);
    }, [scannerPosition, cubeRotate]);

    return (
        <div
            className={'scene'}
            tabIndex={0}
            onKeyDown={handleCubeKeyDown}
        >
            <Cube cubeRotate={cubeRotate}/>
            <Scanner scannerPosition={scannerPosition}/>
        </div>
    );
};

export default Scene;