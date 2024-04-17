import React, { useEffect, useState } from 'react';
import { HiShare } from "react-icons/hi";

const Congratulation = () => {

    const [result, setResult] = useState()
    useEffect(() => {
        let UserObject = localStorage.getItem('UserGamePlay')
        UserObject = JSON.parse(UserObject)
        setResult(UserObject)
    }, [])

    return (
        <div class="congratulations-container">
            <p className='font-bold text-[30px] md:text-[40px] mb-2'>Congratulations!Try Harder Next Time</p>
            <p className='text-[18px] md:text-[24px] mb-[60px] sm:mb-[80px]'>STATS</p>

            <div class="stats">
                <div>
                    <p class="large-text large-text-sm">{result?.matchPlayed}</p>
                    <p class="small-text small-text-sm">Played</p>
                </div>
                <div>
                    {/* <p class="large-text large-text-sm">{(((result?.point1 + result?.point2 + result?.point3) / 3) * 3 * 100 / 9).toFixed(0)}</p> */}
                    <p class="small-text small-text-sm">Score %</p>
                </div>
                <div>
                    <p class="large-text large-text-sm">1</p>
                    <p class="small-text small-text-sm">Current Streak</p>
                </div>
            </div>

            <button class="share-button">
                Share <HiShare class="share-icon" />
            </button>
        </div>

    );
};

export default Congratulation;