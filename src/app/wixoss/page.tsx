'use client'
import React from 'react';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import LRIGPopup from '../../components/LRIGCard';
import ChooseLRIGPopup from '../../components/ChooseCardLRIG';
import MAINPopup from '../../components/MAINCard';
import cardList from '../../components/CardDB';

const PlayGround: React.FC = () => {
    const [isPopupAction, setPopupAction] = useState(true);
    const [startPhase, setStartPhase] = useState<number>(0);
    const [isPopupLRIG, setIsPopupLRIG] = useState(false);
    const [isPopupMAIN, setIsPopupMAIN] = useState(false);
    const [isChoosePopupLRIG, setIsChoosePopupLRIG] = useState(false);
    const [numberMAINCard, setNumberMAINCard] = useState(40);
    const [numberLRIGCard, setNumberLRIGCard] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    const [cardLRIGSpacePlayer, setCardLRIGSpacePlayer] = useState([0, 0, 0]);
    const [cardLRIGSpaceTarget, setCardLRIGSpaceTarget] = useState([0, 0, 0]);
    const [cardMAINSpacePlayer, setCardMAINSpacePlayer] = useState([-1, -1, -1]);
    const [cardMAINSpaceTarget, setCardMAINSpaceTarget] = useState([-1, -1, -1]);

    const handleOpenPopupLRIG = () => {
        setIsPopupLRIG(true);
    };

    const handleClosePopupLRIG = () => {
        setIsPopupLRIG(false);
    };

    const handleCloseChoosePopupLRIG = () => {
        setIsChoosePopupLRIG(false);
    };

    const handleOpenPopupMAIN = () => {
        setIsPopupMAIN(true);
    };

    const handleClosePopupMAIN = () => {
        setIsPopupMAIN(false);
    };

    useEffect(() => {
        // Show popup when the component mounts
        setPopupAction(true);
    }, []);

    const handlePopup = () => {
        setStartPhase(prev => prev + 1);
        if (startPhase === 1) {
            setIsChoosePopupLRIG(true);
        }
    };

    useEffect(() => {
        if (startPhase > 1) {
            setPopupAction(false);
        }
    }, [startPhase]);

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
                        {cardLRIGSpaceTarget.map((id, index) => {
                            const card = cardList.find(card => card.id === id);
                            if (card && card.imageUrl) {
                                return (
                                    <Image
                                        key={index}
                                        src={card.imageUrl}
                                        alt={'Ảnh bìa chính'}
                                        width={750}
                                        height={1047}
                                        className={`w-[20%] h-auto ${index === 1 ? 'mx-12' : ''}`}
                                    />
                                );
                            }
                        })}
                    </div>
                    <div className='flex justify-center mt-5 items-center'>
                        {cardMAINSpaceTarget.map((id, index) => {
                            const card = cardList.find(card => card.id === id);
                            if (card && card.imageUrl) {
                                return (
                                    <Image
                                        key={index}
                                        src={card.imageUrl}
                                        alt={'Ảnh bìa chính'}
                                        width={750}
                                        height={1047}
                                        className={`w-[20%] h-auto ${index === 1 ? 'mx-12' : ''}`}
                                    />
                                );
                            }
                        })}
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
                        {cardMAINSpacePlayer.map((id, index) => {
                            const card = cardList.find(card => card.id === id);
                            if (card && card.imageUrl) {
                                return (
                                    <Image
                                        key={index}
                                        src={card.imageUrl}
                                        alt={'Ảnh bìa chính'}
                                        width={750}
                                        height={1047}
                                        className={`w-[20%] h-auto ${index === 1 ? 'mx-12' : ''}`}
                                    />
                                );
                            }
                        })}
                    </div>
                    <div className='flex justify-center mt-5 items-center'>
                        {cardLRIGSpacePlayer.map((id, index) => {
                            const card = cardList.find(card => card.id === id);
                            if (card && card.imageUrl) {
                                return (
                                    <Image
                                        key={index}
                                        src={card.imageUrl}
                                        alt={'Ảnh bìa chính'}
                                        width={750}
                                        height={1047}
                                        className={`w-[20%] h-auto ${index === 1 ? 'mx-12' : ''}`}
                                    />
                                );
                            }
                        })}
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
                                onClick={handleOpenPopupMAIN}
                            >
                                Bộ Bài Chính
                            </button>
                            <button
                                className="px-2 py-1 text-xs mt-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                                onClick={handleOpenPopupLRIG}
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
                        {startPhase === 0 &&
                            <>
                                <p className="text-xl mb-4 font-bold">Chào Mừng đến với TomiWixoss</p>
                                <p className="text-md mb-4 font-bold">Đây là trang Web mô phỏng lại trò chơi thẻ bài Wixoss!</p>
                                <button
                                    onClick={handlePopup}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Bắt Đầu
                                </button>
                            </>
                        }
                        {startPhase === 1 &&
                            <>
                                <p className="text-xl mb-4 font-bold">Giai đoạn đầu</p>
                                <p className="text-md mb-4 font-bold">Hãy lựa chọn các LRIG trung tâm và LRIG hỗ trợ từ bộ bài LRIG</p>
                                <button
                                    onClick={handlePopup}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Lựa Chọn
                                </button>
                            </>
                        }
                    </div>
                </div>
            )}
            <LRIGPopup isOpen={isPopupLRIG} onClose={handleClosePopupLRIG} numberCard={numberLRIGCard} />
            <MAINPopup isOpen={isPopupMAIN} onClose={handleClosePopupMAIN} view={false} numberCard={numberMAINCard} />
            <ChooseLRIGPopup isOpen={isChoosePopupLRIG} onClose={handleCloseChoosePopupLRIG} numberCard={numberLRIGCard} />
        </>
    );
};

export default PlayGround;
