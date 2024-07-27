'use client'
import React from 'react';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

const PlayGround: React.FC = () => {
    const [isPopupAction, setPopupAction] = useState(true);

    useEffect(() => {
        // Show popup when the component mounts
        setPopupAction(true);
    }, []);

    const handleClosePopup = () => {
        setPopupAction(false);
    };


    return (
        <>
            <div className="bg-black py-2 px-2">
                <div className='h-screen'>
                    <div className='flex justify-center items-center'>
                        <Image
                            src={'/backside/MAIN.jpg'}
                            alt={'Ảnh bìa chính'}
                            width={750}
                            height={1047}
                            className='w-[15%] h-auto'
                        />
                        <p className='text-2xl text-white mx-4'>x1</p>
                        <div className='flex flex-col justify-center items-center'>
                            <button
                                className="px-2 py-1 text-xs text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                            >
                                Bộ Bài Chính
                            </button>
                            <button
                                className="px-2 py-1 text-xs mt-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                            >
                                Bộ Bài LRIG
                            </button>
                        </div>
                        <div className='flex flex-col ml-2 justify-center items-center'>
                            <button
                                className="px-2 py-1 text-xs text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                            >
                                Nguyên Liệu
                            </button>
                            <button
                                className="px-2 py-1 text-xs mt-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                            >
                                Thùng Rác
                            </button>
                        </div>
                    </div>
                    <div className='flex justify-center mt-5 items-center'>
                        <Image
                            src={'/backside/LRIG.jpg'}
                            alt={'Ảnh bìa chính'}
                            width={750}
                            height={1047}
                            className='w-[20%] h-auto'
                        />
                        <Image
                            src={'/backside/LRIG.jpg'}
                            alt={'Ảnh bìa chính'}
                            width={750}
                            height={1047}
                            className='w-[20%] mx-12 h-auto'
                        />
                        <Image
                            src={'/backside/LRIG.jpg'}
                            alt={'Ảnh bìa chính'}
                            width={750}
                            height={1047}
                            className='w-[20%] h-auto'
                        />
                    </div>
                    <div className='flex justify-center mt-5 items-center'>
                        <Image
                            src={'/backside/MAIN.jpg'}
                            alt={'Ảnh bìa chính'}
                            width={750}
                            height={1047}
                            className='w-[20%] h-auto'
                        />
                        <Image
                            src={'/backside/MAIN.jpg'}
                            alt={'Ảnh bìa chính'}
                            width={750}
                            height={1047}
                            className='w-[20%] mx-12 h-auto'
                        />
                        <Image
                            src={'/backside/MAIN.jpg'}
                            alt={'Ảnh bìa chính'}
                            width={750}
                            height={1047}
                            className='w-[20%] h-auto'
                        />
                    </div>
                    <div className='flex justify-center items-center'>
                        <button
                            className="px-2 py-1 text-xs text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                        >
                            Tay Đối Thủ
                        </button>
                        <p className='text-white my-5 text-center mx-5'>Lượt 1</p>
                        <button
                            className="px-2 py-1 text-xs text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                        >
                            Tay Người Chơi
                        </button>
                    </div>
                    <div className='flex justify-center items-center'>
                        <Image
                            src={'/backside/MAIN.jpg'}
                            alt={'Ảnh bìa chính'}
                            width={750}
                            height={1047}
                            className='w-[20%] h-auto'
                        />
                        <Image
                            src={'/backside/MAIN.jpg'}
                            alt={'Ảnh bìa chính'}
                            width={750}
                            height={1047}
                            className='w-[20%] mx-12 h-auto'
                        />
                        <Image
                            src={'/backside/MAIN.jpg'}
                            alt={'Ảnh bìa chính'}
                            width={750}
                            height={1047}
                            className='w-[20%] h-auto'
                        />
                    </div>
                    <div className='flex justify-center mt-5 items-center'>
                        <Image
                            src={'/backside/LRIG.jpg'}
                            alt={'Ảnh bìa chính'}
                            width={750}
                            height={1047}
                            className='w-[20%] h-auto'
                        />
                        <Image
                            src={'/backside/LRIG.jpg'}
                            alt={'Ảnh bìa chính'}
                            width={750}
                            height={1047}
                            className='w-[20%] mx-12 h-auto'
                        />
                        <Image
                            src={'/backside/LRIG.jpg'}
                            alt={'Ảnh bìa chính'}
                            width={750}
                            height={1047}
                            className='w-[20%] h-auto'
                        />
                    </div>
                    <div className='flex justify-center mt-5 items-center'>
                        <Image
                            src={'/backside/MAIN.jpg'}
                            alt={'Ảnh bìa chính'}
                            width={750}
                            height={1047}
                            className='w-[15%] h-auto'
                        />
                        <p className='text-2xl text-white mx-4'>x1</p>
                        <div className='flex flex-col justify-center items-center'>
                            <button
                                className="px-2 py-1 text-xs text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                            >
                                Bộ Bài Chính
                            </button>
                            <button
                                className="px-2 py-1 text-xs mt-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                            >
                                Bộ Bài LRIG
                            </button>
                        </div>
                        <div className='flex flex-col ml-2 justify-center items-center'>
                            <button
                                className="px-2 py-1 text-xs text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                            >
                                Nguyên Liệu
                            </button>
                            <button
                                className="px-2 py-1 text-xs mt-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                            >
                                Thùng Rác
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isPopupAction && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 mx-5 rounded-lg shadow-lg text-center">
                        <p className="text-xl mb-4 font-bold">Chào Mừng đến với TomiWixoss</p>
                        <p className="text-md mb-4 font-bold">Đây là trang Web mô phỏng lại trò chơi thẻ bài Wixoss!</p>
                        <button
                            onClick={handleClosePopup}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Bắt Đầu
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default PlayGround;
