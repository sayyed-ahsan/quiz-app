import React, { useEffect, useRef } from 'react';

const ClockTimer = ({ count, running, setCount }) => {
    const timerRef = useRef(null);

    useEffect(() => {
        if (running) {
            timerRef.current = setInterval(() => {
                setCount((prevCount) => Math.max(prevCount - 1, 0));
            }, 1000);
        }

        return () => clearInterval(timerRef.current);
    }, [running]);
    return (
        <div>
            <Clock time={count} />
        </div>
    );
};

export default ClockTimer;


function Clock({ time }) {
    const format = (time) => {
        let seconds = time % 60;
        let minutes = Math.floor(time / 60);
        minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
        seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
        return minutes + ' min ' + ' : ' + seconds + ' sec';
    };

    return (
        <div className="displayedTime">

            <h1 className='text-center text-green-500 text-[20px] mb-2'>
                <span className='text-center text-white text-[22px]'>
                    Quiz Time :{' '}
                </span>
                {format(time)}
            </h1>
        </div>
    );
}