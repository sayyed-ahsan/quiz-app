import React, { useEffect, useState } from 'react';

const Congratulation = () => {
    const [result, setResult] = useState()
    useEffect(() => {
        let UserObject = localStorage.getItem('user')
        UserObject = JSON.parse(UserObject)
        setResult(UserObject)
    }, [])
    console.log(result)
    return (
        <div className='max-w-[720px] md:max-w-[760px] p-6 mx-auto text-white'>
            <p className='text-center font-semibold text-[30px] sm:text-[50px] mb-4'>Congratulation !</p>
            <img className='mx-auto' src="https://static.vecteezy.com/system/resources/thumbnails/012/872/159/small/party-icon-confetti-popper-illustration-png.png" alt="" />
            <div className='flex items-center flex-wrap justify-between gap-4'>
                <div className='max-w-[200px] min-w-[199px] mx-auto border-2 text-center p-3 rounded-[12px] bg-white text-black'>
                    <p className='text-[30px] font-semibold text-center'>{result?.matchPlayed}</p>
                    <p className='text-[20px] font-semibold'>Played</p>
                </div>
                <div className='max-w-[200px] min-w-[199px] mx-auto border-2 text-center p-3 rounded-[12px] bg-white text-black'>
                    <p className='text-[30px] font-semibold text-center'>{(((result?.point1 + result?.point2 + result?.point3) / 3) * 3 * 100 / 9).toFixed(2)}%</p>
                    <p className='text-[20px] font-semibold'>Win %</p>
                </div>
                <div className='max-w-[200px] min-w-[199px] mx-auto border-2 text-center p-3 rounded-[12px] bg-white text-black'>
                    <p className='text-[30px] font-semibold text-center'>1</p>
                    <p className='text-[20px] font-semibold'>Current Streak</p>
                </div>
            </div>
        </div>
    );
};

export default Congratulation;