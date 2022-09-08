import React, {useEffect, useRef} from 'react';
import './SliceWindow.css';

const SliceWindow = ({ slicePeaks }) => {
    const canvas = useRef(null);

    const draw = (peaks) => {
        const ctx = canvas.current.getContext('2d');
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

        peaks.forEach((peak, index) => {
            ctx.beginPath();
            ctx.moveTo(peak.x + 300 ,peak.y + 300 );
            peaks.forEach((peak2, index2) => {
                if (index !== index2) {
                    ctx.lineTo(peak2.x + 300 ,peak2.y + 300 );
                }
            });
            ctx.fill();
        });
    }

    useEffect(() => {
        if (slicePeaks.length) {
            draw(slicePeaks);
            console.log(slicePeaks);
        } else {
            const ctx = canvas.current.getContext('2d');
            ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
        }
    }, [slicePeaks]);

    return (
        <div className={'window'}>
            <canvas ref={canvas} width={600} height={600} className={'canvas'}></canvas>
        </div>
    );
};

export default SliceWindow;