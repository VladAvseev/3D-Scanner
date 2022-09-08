import React from 'react';
import './Settings.css';

const Settings = ({settingState, setSettingState}) => {

    return (
        <div className={'setting_body'}>
            <h1>Settings</h1>
            <div className={'input__item'}>
                <label htmlFor="scanner">Scanner position:</label>
                <input
                    type="number"
                    max={300}
                    min={-300}
                    placeholder={'from -300 to 300'}
                    id={'scanner'}
                    value={settingState.scannerPosition}
                    onChange={(event) => {
                        if (event.target.value <= 300 && event.target.value >= -300) {
                            setSettingState((prev) => {
                                return {...prev, scannerPosition:  Math.round(event.target.value)}
                            });
                        }
                    }}
                />
            </div>
            <div className={'input__item'}>
                <label htmlFor="rotateX">Rotate cube X:</label>
                <input
                    type="number"
                    id={'rotateX'}w
                    placeholder={'deg'}
                    value={settingState.cubeRotate.x}
                    onChange={(event) => {
                        setSettingState((prev) => {
                            return {...prev, cubeRotate: {...prev.cubeRotate, x: Math.round(event.target.value)}}
                        });
                    }}
                />
            </div>
            <div className={'input__item'}>
                <label htmlFor="rotateY">Rotate cube Y:</label>
                <input
                    type="number"
                    id={'rotateY'}
                    placeholder={'deg'}
                    value={settingState.cubeRotate.y}
                    onChange={(event) => {
                        setSettingState((prev) => {
                            return {...prev, cubeRotate: {...prev.cubeRotate, y: Math.round(event.target.value)}}
                        });
                    }}
                />
            </div>
            <div className={'input__item'}>
                <label htmlFor="rotateZ">Rotate cube Z:</label>
                <input
                    type="number"
                    id={'rotateZ'}
                    placeholder={'deg'}
                    value={settingState.cubeRotate.z}
                    onChange={(event) => {
                        setSettingState((prev) => {
                            return {...prev, cubeRotate: {...prev.cubeRotate, z: Math.round(event.target.value)}}
                        });
                    }}
                />
            </div>
        </div>
    );
};

export default Settings;