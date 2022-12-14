import React, {useState} from 'react';
import './App.css';
import Scene from "./Components/Scene/Scene";
import SliceWindow from "./Components/SliceWindow/SliceWindow";
import Header from "./Components/Header/Header";
import Settings from "./Components/Settings/Settings";

const App = () => {
    const [slicePeaks, setSlicePeaks] = useState([]);
    const [settingState, setSettingState] = useState({
        scannerPosition: 295,
        cubeRotate: {
            x: 0,
            y: 0,
            z: 0
        }
    })

    return (
        <>
            <Header />
            <div className={'wrapper'}>
                <Scene setSlicePeaks={setSlicePeaks} settingState={settingState} setSettingState={setSettingState}/>
                <Settings settingState={settingState} setSettingState={setSettingState}/>
                <SliceWindow slicePeaks={slicePeaks}/>
            </div>
        </>
    );
};

export default App;