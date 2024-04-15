import React, { useEffect, useState } from 'react';
import { IoMdSettings } from "react-icons/io";
import SettingsItems from './settingsItems';
import HowToPlayModal from './howToPlayModal';
import { Link } from 'react-router-dom';
import { AiTwotonePlayCircle } from 'react-icons/ai';
import { Authenticator } from '@aws-amplify/ui-react';

const HomePage = () => {
    const [showSettings, setShowSettings] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userLogIn, setIsUserLogIn] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('userLogIn') === 'true') {
            setIsUserLogIn(true)
        }
    }, [])
    return (
        <div>
            <div className='w-full rounded-[6px] sm:w-[660px] md:w-[700px] lg:w-[890px] xl:w-[1000px] mx-auto bg-[#4548e6] relative'>

                {showSettings && <SettingsItems {...{ setShowSettings }} />}

                <div className="flex min-h-screen flex-col items-center justify-center p-2 text-center">
                    {/* Logo  */}
                    <div className="overflow-hidden h-[60px] bg-white rounded-full mb-4">
                        <img
                            className="h-[70px] rounded-full"
                            src="https://i.ibb.co/JkPGn5d/noun-counting-154887-Photoroom.png"
                            alt="logo of quiz app"
                        />
                    </div>

                    {/* Title and Description */}
                    <h1 className="text1 text-white text-[35px] sm:text-[45px] md:text-[50px]">
                        Teach Me To Count !
                    </h1>
                    <p className="text2 text-white text-center text-[18px] sm:text-[20px] md:text-[22px] mb-[80px]">
                        Get 3 chances to guess the right answers.
                        <br className="hidden sm:block" /> Learn counting now...!
                    </p>

                    {/* All buttons */}
                    <div className="w-full mx-auto  gap-3 flex items-center justify-center flex-col-reverse sm:flex-row">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="rounded-full min-w-[180px] font-semibold py-[10px] border-2 border-white text-white hover:bg-white hover:text-black duration-200"
                        >
                            How To Play
                        </button>
                        <Link to="/auth">
                            <button className="rounded-full min-w-[180px] font-semibold py-[10px] border-2 border-white text-white hover:bg-white hover:text-black duration-200">
                                Log In
                            </button>
                        </Link>
                        <Link to="/play">
                            <button className="rounded-full min-w-[180px] font-semibold py-[10px] border-2 border-white text-black hover:bg-white/0 bg-white hover:text-white duration-200">
                                <AiTwotonePlayCircle className="inline mb-[3px] text-[19px] ml-[-11px]" />
                                Play
                            </button>
                        </Link>
                    </div>

                    {/* Title and Description */}
                    <h1 className="text1 text-white text-[35px] sm:text-[45px] md:text-[50px]">
                        Teach Me To Count !
                    </h1>
                    <p className="text2 text-white text-center text-[18px] sm:text-[20px] md:text-[22px] mb-[80px]">
                        Get 3 chances to guess the right answers.<br className='hidden sm:block' /> Learn counting now...!
                    </p>

                    {/* All buttons */}
                    <div className="w-full mx-auto  gap-3 flex items-center justify-center flex-col-reverse sm:flex-row">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="rounded-full min-w-[180px] font-semibold py-[10px] border-2 border-white text-white hover:bg-white hover:text-black duration-200"
                        >
                            How To Play
                        </button>
                        <>
                            {userLogIn ? <>
                                <Authenticator>
                                    {({ signOut, user }) => (
                                        <button
                                            className="rounded-full min-w-[180px] font-semibold py-[10px] border-2 border-white text-white hover:bg-white hover:text-black duration-200"
                                            onClick={() => {
                                                localStorage.setItem('userLogIn', false)
                                                signOut()
                                                setIsUserLogIn(false)
                                            }}
                                        >
                                            Log Out
                                        </button>
                                    )}
                                </Authenticator>
                            </>
                                :
                                <Link to='/auth'>
                                    <button
                                        className="rounded-full min-w-[180px] font-semibold py-[10px] border-2 border-white text-white hover:bg-white hover:text-black duration-200"
                                    >
                                        Log In
                                    </button>
                                </Link>}
                        </>

                        <Link to='/play'>
                            <button
                                className="rounded-full min-w-[180px] font-semibold py-[10px] border-2 border-white text-black hover:bg-white/0 bg-white hover:text-white duration-200"
                            >
                                <AiTwotonePlayCircle className='inline mb-[3px] text-[19px] ml-[-11px]' />        Play
                            </button>
                        </Link>
                    </div>

                    {/* Today's Date  */}
                    <p className="mt-10 text-white font-semibold">
                        Today's Date : {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* modal  */}
            <HowToPlayModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default HomePage;
