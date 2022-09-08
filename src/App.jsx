import React, {useState} from 'react';
import './App.css';
import Scene from "./Components/Scene/Scene";
import SliceWindow from "./Components/SliceWindow/SliceWindow";

const App = () => {
    const [slicePeaks, setSlicePeaks] = useState([]);

    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
             <Scene setSlicePeaks={setSlicePeaks}/>
            <SliceWindow slicePeaks={slicePeaks}/>
        </div>
    );
};

export default App;