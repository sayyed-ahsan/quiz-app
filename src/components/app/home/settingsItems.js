import React from 'react';
import { IoClose } from 'react-icons/io5';

const SettingsItems = ({ setShowSettings }) => {
    return (
        <div className='settingDiv w-[290px] sm:w-[350px]'>
            <IoClose onClick={() => setShowSettings(false)} className='hover:bg-gray-400 rounded-full text-white text-[25px] absolute top-[7px] right-[7px]' />
            <p className='text-center text-white text-[16px] sm:text-[18px]'>SETTING</p>

            <div className='text-white text-[16px] sm:text-[18px] mt-[15px] flex justify-between pb-[5px] border-b-[1px]' >
                <p>Feedback</p>
                <a className='underline' href="syed.jaid.7748@gamil.com">Email</a>
            </div>
            <div className='text-white text-[16px] sm:text-[18px] mt-[15px] flex justify-between pb-[5px] border-b-[1px]' >
                <p>Report a Bug</p>
                <a className='underline' href="syed.jaid.7748@gamil.com">Email</a>
            </div>
            <div className='text-white text-[16px] sm:text-[18px] mt-[15px] flex justify-between pb-[5px] border-b-[1px]' >
                <p>Questions ?</p>
                <p className='underline cursor-pointer' href="syed.jaid.7748@gamil.com">FAQ</p>
            </div>
        </div>
    );
};

export default SettingsItems;