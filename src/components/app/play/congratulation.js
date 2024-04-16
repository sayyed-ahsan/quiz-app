import React, { useEffect, useState } from 'react';
import { HiShare } from "react-icons/hi";

const Congratulation = () => {
    const [result, setResult] = useState()
    useEffect(() => {
        let UserObject = localStorage.getItem('user')
        UserObject = JSON.parse(UserObject)
        setResult(UserObject)
    }, [])
    console.log(result)
    return (
        <div className='max-w-[550px] pt-[60px] px-3 sm:px-6 mx-auto text-white'>
            <p className='text-center text-black font-bold text-[30px] md:text-[40px] mb-2'>Congratulation !</p>
            <p className='text-center text-black font-bold text-[30px] md:text-[40px] mb-2'>Try Harder Next Time</p>
            <p className='text-center text-black text-[18px] md:text-[24px] mb-[60px] sm:mb-[80px]'>STATS</p>

            <div className='flex items-start justify-between gap-4 border-b-[1px] border-black pb-4 px-4'>
                <div className='min-w-[70px] text-center text-black'>
                    <p className='text-[35px] sm:text-[48px] font-bold text-center'>{result?.matchPlayed}</p>
                    <p className='text-[17px] sm:text-[20px]'>Played</p>
                </div>
                <div className='min-w-[70px] text-center text-black'>
                    {/* <p className='te35-[29px] sm:tex8-[40px] font-bold text-center'>{(((result?.point1 + result?.point2 + result?.point3) / 3) * 3 * 100 / 9).toFixed(2)}%</p> */}
                    <p className='text-[35px] sm:text-[48px] font-bold text-center'>92</p>
                    <p className='text-[17px] sm:text-[20px]'>Score %</p>
                </div>
                <div className='min-w-[70px] text-center text-black'>
                    <p className='text-[35px] sm:text-[48px] font-bold text-center'>1</p>
                    <p className='text-[17px] sm:text-[20px]'>Current Streak</p>
                </div>
            </div>
            <div className='flex justify-center mt-[100px]'>
                <button className='text-white font-bold px-[50px] py-2 rounded-full bg-[#06bf66]'>
                    Share<HiShare className='inline ml-2' />
                </button>
            </div>

        </div>
    );
};

export default Congratulation;