import React, { useState } from 'react';
import { IoMdSettings } from "react-icons/io";
import SettingsItems from './settingsItems';
import HowToPlayModal from './howToPlayModal';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [showSettings, setShowSettings] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className='app'>
            <div className='w-full sm:w-[660px] md:w-[700px] lg:w-[890px] xl:w-[1000px] relative'>

                {/* Settings button  */}
                <IoMdSettings
                    onClick={() => setShowSettings(!showSettings)}
                    className={`text-white text-[30px] absolute right-2 top-2 cursor-pointer ${showSettings ? 'rotate-icon' : 'rotate-icon-click'}`}
                />

                {showSettings && <SettingsItems {...{ setShowSettings }} />}

                <div className="flex min-h-screen flex-col items-center justify-center p-2 text-center">

                    {/* Logo  */}
                    <div className='overflow-hidden h-[60px] bg-white rounded-full '>
                        <img
                            className="h-[70px] rounded-full"
                            src="https://i.ibb.co/JkPGn5d/noun-counting-154887-Photoroom.png"
                            alt='logo of quiz app'
                        />
                    </div>

                    {/* Title and Description */}
                    <h1 className="text1 text-[35px] sm:text-[45px] md:text-[50px]">
                        Teach Me To Count !
                    </h1>
                    <p className="text2 text-center text-[18px] sm:text-[20px] md:text-[22px] text-gray-200 mb-[80px]">
                        Get 3 chances to guess the right answers.<br className='hidden sm:block' /> Learn counting now...!
                    </p>

                    {/* All buttons */}
                    <div className="w-full mx-auto  gap-3 flex items-center justify-center flex-col-reverse sm:flex-row">
                        <button className="btn" onClick={() => setIsModalOpen(true)}><span>How to play</span></button>
                        <Link to='/play'>
                            <button className="btn"><span >Play</span></button>
                        </Link>
                        <Link to='/auth'>
                            <button className="btn"><span>Log In</span></button>
                        </Link>
                    </div>

                    {/* Today's Date  */}
                    <p className="mt-10 text-sm text-white">
                        Today's Date : {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* modal  */}
            <HowToPlayModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <p className='text-white text-[26px]'>How To Play</p>
            </HowToPlayModal>
        </div>
    );
};

export default HomePage;