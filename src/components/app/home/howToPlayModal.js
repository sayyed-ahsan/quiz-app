import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { AiFillLike, AiFillDislike } from "react-icons/ai";

const HowToPlayModal = ({ isOpen, onClose, children }) => {
    const [like, setLike] = useState('')
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  flex justify-center items-center">
            <div className="howToPlayModalDiv p-5 rounded-lg shadow-lg">

                {/* modal close button  */}
                <IoClose onClick={onClose} className='hover:bg-white/20 p-[3px] rounded-full text-white text-[30px] absolute top-[7px] right-[7px]' />

                {/* body part */}
                <p className='text-white text-[25px]'>How To Play</p>
                <p className='text-gray-200 text-[16px] max-h-[500px] overflow-y-auto'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam pariatur, cumque alias reiciendis porro cupiditate vero atque quis eligendi accusamus doloremque, eius maiores nam eaque facere voluptatem, quam neque doloribus saepe possimus dicta! Possimus nisi corrupti cupiditate officiis vero similique nesciunt libero, voluptate, praesentium in quia quaerat qui, pariatur neque quisquam. Totam atque incidunt mollitia, laudantium vel explicabo quibusdam alias enim, rerum ut necessitatibus temporibus assumenda? Magnam eveniet unde quisquam, quo dolore porro earum quasi molestiae saepe veniam, repellendus repudiandae nobis deleniti nemo. Adipisci libero iste similique laudantium debitis illum itaque et quia deleniti expedita sequi vero mollitia, consectetur consequuntur voluptatem ipsa quidem molestiae quo veniam quod inventore corporis. Nesciunt vel aut,
                </p>

                {/* Feedback section  */}
                <div className='text-white text-[15px] flex gap-3 fixed bottom-[10px] right-[10px]'>
                    <p>Did you find it help full ?</p>

                    <AiFillLike onClick={() => setLike('like')} className={`text-[20px] ${like === 'like' && 'text-blue-500'}`} />
                    <AiFillDislike onClick={() => setLike('disLike')} className={`text-[20px] ${like === 'disLike' && 'text-blue-500'}`} />
                </div>
            </div>
        </div>
    );
};

export default HowToPlayModal;