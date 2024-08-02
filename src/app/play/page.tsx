'use client'
import React from 'react';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import EnerPopup from './EnerCard';
import HandPopup from './HandCard';
import LRIGPopup from './LRIGCard';
import MAINPopup from './MAINCard';
import TrashPopup from './TrashCard';
import EnerPopupBot from './EnerCardBot';
import HandPopupBot from './HandCardBot';
import LRIGPopupBot from './LRIGCardBot';
import MAINPopupBot from './MAINCardBot';
import TrashPopupBot from './TrashCardBot';
import CardDetail from '../../components/CardDetail';
import Card from "../../types/cardList";
import cardList from '../../components/CardDB';

const PlayGround: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [isPopupAction, setPopupAction] = useState(true);
    const [MainPhase, setMainPhase] = useState<number>(0);
    const [botMainPhase, setBotMainPhase] = useState<number>(0);
    const [isPopupLRIG, setIsPopupLRIG] = useState(false);
    const [isPopupEner, setIsPopupEner] = useState(false);
    const [isPopupMAIN, setIsPopupMAIN] = useState(false);
    const [isPopupTrash, setIsPopupTrash] = useState(false);
    const [isPopupHand, setIsPopupHand] = useState(false);
    const [isPopupLRIGBot, setIsPopupLRIGBot] = useState(false);
    const [isPopupEnerBot, setIsPopupEnerBot] = useState(false);
    const [isPopupMAINBot, setIsPopupMAINBot] = useState(false);
    const [isPopupHandBot, setIsPopupHandBot] = useState(false);
    const [isPopupTrashBot, setIsPopupTrashBot] = useState(false);
    const [numberMAINCard, setNumberMAINCard] = useState<number[]>([
        12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14,
        15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17,
        18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20,
        21, 21, 21, 21
    ]);
    const [numberLRIGCard, setNumberLRIGCard] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    const [numberLifeCard, setNumberLifeCard] = useState<number[]>([]);
    const [numberHandCard, setNumberHandCard] = useState<number[]>([]);
    const [numberEnerCard, setNumberEnerCard] = useState<number[]>([]);
    const [numberTrashCard, setNumberTrashCard] = useState<number[]>([]);
    const [numberMAINCardBot, setNumberMAINCardBot] = useState<number[]>([
        12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14,
        15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17,
        18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20,
        21, 21, 21, 21
    ]);
    const [numberLRIGCardBot, setNumberLRIGCardBot] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    const [numberLifeCardBot, setNumberLifeCardBot] = useState<number[]>([]);
    const [numberHandCardBot, setNumberHandCardBot] = useState<number[]>([]);
    const [numberEnerCardBot, setNumberEnerCardBot] = useState<number[]>([]);
    const [numberTrashCardBot, setNumberTrashCardBot] = useState<number[]>([]);
    const [cardLRIGSpacePlayer, setCardLRIGSpacePlayer] = useState([0, 0, 0]);
    const [cardLRIGSpaceTarget, setCardLRIGSpaceTarget] = useState([0, 0, 0]);
    const [cardMAINSpacePlayer, setCardMAINSpacePlayer] = useState([-1, -1, -1]);
    const [cardMAINSpaceTarget, setCardMAINSpaceTarget] = useState([-1, -1, -1]);
    const [cardUseMAINSpacePlayer, setCardUseMAINSpacePlayer] = useState<Card[]>([]);
    const [cardUseMAINSpaceTarget, setCardUseMAINSpaceTarget] = useState<Card[]>([]);

    useEffect(() => {
        const cardUseMAINPlayer = [...cardUseMAINSpacePlayer];
        const cardUseMAINTarget = [...cardUseMAINSpaceTarget];
        cardMAINSpacePlayer.forEach((value, index) => {
            const card = cardList.find(card => card.id === value);
            if (card) {
                cardUseMAINPlayer.push(card);
            }
        });
        cardMAINSpaceTarget.forEach((value, index) => {
            const card = cardList.find(card => card.id === value);
            if (card) {
                cardUseMAINTarget.push(card);
            }
        });

        setCardUseMAINSpacePlayer(cardUseMAINPlayer);
        setCardUseMAINSpaceTarget(cardUseMAINTarget);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                        <p className='text-2xl text-white mx-4'>x{numberLifeCardBot.length}</p>
                        <div className='flex flex-col justify-center items-center'>
                            <button
                                className="px-2 py-1 text-xs text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                                onClick={() => { setIsPopupMAINBot(true) }}
                            >
                                Bộ Bài Chính
                            </button>
                            <button
                                className="px-2 py-1 text-xs mt-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                                onClick={() => { setIsPopupLRIGBot(true) }}
                            >
                                Bộ Bài LRIG
                            </button>
                        </div>
                        <div className='flex flex-col ml-2 justify-center items-center'>
                            <button
                                className="px-2 py-1 text-xs text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                                onClick={() => { setIsPopupEnerBot(true) }}
                            >
                                Nguyên Liệu
                            </button>
                            <button
                                className="px-2 py-1 text-xs mt-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                                onClick={() => { setIsPopupTrashBot(true) }}
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
                                        className={`w-[20%] h-auto cursor-pointer ${index === 1 ? 'mx-12' : ''}`}
                                        onClick={() => { setSelectedCard(card) }}
                                    />
                                );
                            }
                        })}
                    </div>
                    <div className='flex justify-center mt-5 items-center'>
                        {cardUseMAINSpaceTarget.map((card, index) => (
                            <div key={index} className={`relative w-[20%] cursor-pointer ${index === 1 ? 'mx-12' : ''}`}>
                                <Image
                                    src={card.imageUrl}
                                    alt={'Ảnh bìa chính'}
                                    width={750}
                                    height={1047}
                                    className={`w-full h-auto`}
                                    onClick={() => { setSelectedCard(card) }}
                                />
                                {card.id !== -1 &&
                                    <p className="absolute text-xs bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center">
                                        {`${card.cardPower}`}
                                    </p>
                                }
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center items-center'>
                        <button
                            className="px-2 py-1 text-xs text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                            onClick={() => { setIsPopupHandBot(true) }}
                        >
                            Tay Đối Thủ
                        </button>
                        {(MainPhase === 0 || botMainPhase === 0) &&
                            <p className='text-white font-bold text-xs my-5 text-center mx-5'>Giai Đoạn Khởi Đầu</p>
                        }
                        {(MainPhase === 1 || botMainPhase === 1) &&
                            <p className='text-white font-bold text-xs my-5 text-center mx-5'>Giai Đoạn Mở Bài</p>
                        }
                        {(MainPhase === 2 || botMainPhase === 2) &&
                            <p className='text-white font-bold text-xs my-5 text-center mx-5'>Giai Đoạn Rút Bài</p>
                        }
                        {(MainPhase === 3 || botMainPhase === 3) &&
                            <p className='text-white font-bold text-xs my-5 text-center mx-5'>Giai Đoạn Nhập Bài</p>
                        }
                        {(MainPhase === 4 || botMainPhase === 4) &&
                            <p className='text-white font-bold text-xs my-5 text-center mx-5'>Giai Đoạn Phát Triển</p>
                        }
                        {(MainPhase === 5 || botMainPhase === 5) &&
                            <p className='text-white font-bold text-xs my-5 text-center mx-5'>Giai Đoạn Chính</p>
                        }
                        {(MainPhase === 6 || botMainPhase === 6) &&
                            <p className='text-white cursor-pointer font-bold text-xs my-5 text-center mx-5'
                            >Giai Đoạn Tấn Công
                            </p>
                        }
                        {(MainPhase === 7 || botMainPhase === 7) &&
                            <p className='text-white cursor-pointer font-bold text-xs my-5 text-center mx-5'
                            >Giai Đoạn Kết Thúc
                            </p>
                        }
                        <button
                            className="px-2 py-1 text-xs text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                            onClick={() => { setIsPopupHand(true) }}
                        >
                            Tay Người Chơi
                        </button>
                    </div>
                    <div className='flex justify-center items-center'>
                        {cardUseMAINSpacePlayer.map((card, index) => (
                            <div key={index} className={`relative w-[20%] cursor-pointer ${index === 1 ? 'mx-12' : ''}`}>
                                <Image
                                    src={card.imageUrl}
                                    alt={'Ảnh bìa chính'}
                                    width={750}
                                    height={1047}
                                    className={`w-full h-auto`}
                                    onClick={() => { setSelectedCard(card) }}
                                />
                                {card.id !== -1 &&
                                    <p className="absolute text-xs bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center">
                                        {`${card.cardPower}`}
                                    </p>
                                }
                            </div>
                        ))}
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
                                        className={`w-[20%] h-auto cursor-pointer ${index === 1 ? 'mx-12' : ''}`}
                                        onClick={() => { setSelectedCard(card) }}
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
                        <p className='text-2xl text-white mx-4'>x{numberLifeCard.length}</p>
                        <div className='flex flex-col justify-center items-center'>
                            <button
                                className="px-2 py-1 text-xs text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                                onClick={() => { setIsPopupMAIN(true) }}
                            >
                                Bộ Bài Chính
                            </button>
                            <button
                                className="px-2 py-1 text-xs mt-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                                onClick={() => { setIsPopupLRIG(true) }}
                            >
                                Bộ Bài LRIG
                            </button>
                        </div>
                        <div className='flex flex-col ml-2 justify-center items-center'>
                            <button
                                className="px-2 py-1 text-xs text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                                onClick={() => { setIsPopupEner(true) }}
                            >
                                Nguyên Liệu
                            </button>
                            <button
                                className="px-2 py-1 text-xs mt-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                                onClick={() => { setIsPopupTrash(true) }}
                            >
                                Thùng Rác
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <EnerPopup isOpen={isPopupEner} onClose={() => { setIsPopupEner(false) }} numberCard={numberEnerCard} />
            <HandPopup isOpen={isPopupHand} onClose={() => { setIsPopupHand(false) }} numberCard={numberHandCard} />
            <LRIGPopup isOpen={isPopupLRIG} onClose={() => { setIsPopupLRIG(false) }} numberCard={numberLRIGCard} />
            <MAINPopup isOpen={isPopupMAIN} onClose={() => { setIsPopupMAIN(false) }} numberCard={numberMAINCard} />
            <TrashPopup isOpen={isPopupTrash} onClose={() => { setIsPopupTrash(false) }} numberCard={numberTrashCard} />
            <EnerPopupBot isOpen={isPopupEnerBot} onClose={() => { setIsPopupEnerBot(false) }} numberCard={numberEnerCardBot} />
            <HandPopupBot isOpen={isPopupHandBot} onClose={() => { setIsPopupHandBot(false) }} numberCard={numberHandCardBot} />
            <LRIGPopupBot isOpen={isPopupLRIGBot} onClose={() => { setIsPopupLRIGBot(false) }} numberCard={numberLRIGCardBot} />
            <MAINPopupBot isOpen={isPopupMAINBot} onClose={() => { setIsPopupMAINBot(false) }} numberCard={numberMAINCardBot} />
            <TrashPopupBot isOpen={isPopupTrashBot} onClose={() => { setIsPopupTrashBot(false) }} numberCard={numberTrashCardBot} />
        </>
    );
};

export default PlayGround;