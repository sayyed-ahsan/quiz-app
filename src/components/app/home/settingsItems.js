import React from 'react';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const SettingsItems = ({ setShowSettings }) => {
    const infoSections = [
        { id: 1, title: 'Feedback', linkText: 'Email', href: 'mailto:syed.jaid.7748@gmail.com' },
        { id: 2, title: 'Report a Bug', linkText: 'Email', href: 'mailto:syed.jaid.7748@gmail.com' },
        { id: 3, title: 'Questions ?', linkText: 'FAQ', href: '/faq' }
    ];
    return (
        <div className='settingDiv w-[290px] sm:w-[350px]'>
            <IoClose onClick={() => setShowSettings(false)} className='hover:bg-white/20 p-[3px] rounded-full text-white text-[30px] absolute top-[7px] right-[7px]' />
            <p className='text-center text-white text-[16px] sm:text-[18px]'>SETTING</p>

            {infoSections.map((section) => (
                <div
                    key={section.id}
                    className='text-white text-[16px] sm:text-[18px] px-[15px] py-[10px] bg-white/10 rounded-[4px] mt-[15px] flex justify-between'
                >
                    <p>{section.title}</p>
                    <Link to={section.href}>
                        <p className='underline cursor-pointer'>
                            {section.linkText}
                        </p>
                    </Link>
                </div>
            ))
            }
        </div >
    );
};

export default SettingsItems;