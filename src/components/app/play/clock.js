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

    return (
        <div className='flex justify-center'>
            <h1 className='w-[60px] h-[60px] mt-2 rounded-full border-2 border-white text-center text-white text-[20px]  font-semibold pt-3'>
                {time}
            </h1>
        </div>
    );
}