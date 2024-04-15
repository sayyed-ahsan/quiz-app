import React, { useEffect, useState } from 'react';
import SettingsItems from './settingsItems';
import HowToPlayModal from './howToPlayModal';
import { Link } from 'react-router-dom';
import { AiTwotonePlayCircle } from 'react-icons/ai';
import { Authenticator } from '@aws-amplify/ui-react';
import { IoMdSettings } from 'react-icons/io';

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
            <div className='home-main-div'>
                {/* Settings button  */}
                <IoMdSettings
                    onClick={() => setShowSettings(!showSettings)}
                    className={`settings-icon ${showSettings ? 'rotate-icon-click' : 'rotate-icon'}`}
                />

                {showSettings && <SettingsItems {...{ setShowSettings }} />}

                <div className="flex-container">
                    {/* Logo  */}
                    <div class="logo-container">
                        <img
                            class="logo-image"
                            src="https://i.ibb.co/JkPGn5d/noun-counting-154887-Photoroom.png"
                            alt="logo of quiz app"
                        />
                    </div>


                    {/* Title and Description */}
                    <h1 class="header text1">
                        Teach Me To Count!
                    </h1>
                    <p class="paragraph text2">
                        Get 3 chances to guess the right answers.
                        <br class="br-hidden" />{' '}
                        Learn counting now...!
                    </p>

                    {/* All buttons */}
                    <div className="button-container">
                        <button onClick={() => setIsModalOpen(true)} className="button">
                            How To Play
                        </button>

                        {userLogIn ? <>
                            <Authenticator>
                                {({ signOut, user }) => (
                                    <button
                                        className="button"
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
                                    className="button" >
                                    Log In
                                </button>
                            </Link>}

                        <Link to='/play'>
                            <button className="button special-button">
                                <AiTwotonePlayCircle className='play-btn-icon' />
                                Play
                            </button>
                        </Link>
                    </div>

                    {/* Today's Date */}
                    <p className="date-display">
                        Today's Date: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
            {/* modal  */}
            <HowToPlayModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default HomePage;
