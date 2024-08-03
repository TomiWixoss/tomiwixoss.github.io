'use client'
import React from 'react';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import EnerPopup from './EnerCard';
import HandPopup from './HandCard';
import LRIGPopup from './LRIGCard';
import MAINPopup from './MAINCard';
import TrashPopup from './TrashCard';
import LifePopup from './LifeCard';
import { IoMdClose } from "react-icons/io";
import EnerPopupBot from './EnerCardBot';
import HandPopupBot from './HandCardBot';
import LRIGPopupBot from './LRIGCardBot';
import MAINPopupBot from './MAINCardBot';
import TrashPopupBot from './TrashCardBot';
import LifePopupBot from './LifeCardBot';
import CardDetail from '../../components/CardDetail';
import Card from "../../types/cardList";
import cardList from '../../components/CardDB';

const PlayGround: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [isPopupAction, setPopupAction] = useState<Card | null>(null);
    const [isPopupChangePhase, setPopupChangePhase] = useState(false);
    const [isPopupChangePositionAction, setPopupChangePositionAction] = useState<Card | null>(null);
    const [isEffectAction, setEffectAction] = useState<Card | null>(null);
    const [isTitleAction, setTitleAction] = useState<Card | null>(null);
    const [isTypeAction, setIsTypeAction] = useState(0);
    const [MainPhase, setMainPhase] = useState<number>(0);
    const [isPopupLRIG, setIsPopupLRIG] = useState(false);
    const [isPopupEner, setIsPopupEner] = useState(false);
    const [isPopupMAIN, setIsPopupMAIN] = useState(false);
    const [isPopupTrash, setIsPopupTrash] = useState(false);
    const [isPopupHand, setIsPopupHand] = useState(false);
    const [isPopupLife, setIsPopupLife] = useState(false);
    const [isPopupLRIGBot, setIsPopupLRIGBot] = useState(false);
    const [isPopupEnerBot, setIsPopupEnerBot] = useState(false);
    const [isPopupMAINBot, setIsPopupMAINBot] = useState(false);
    const [isPopupHandBot, setIsPopupHandBot] = useState(false);
    const [isPopupTrashBot, setIsPopupTrashBot] = useState(false);
    const [isPopupLifeBot, setIsPopupLifeBot] = useState(false);
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
    const [cardUseLRIGSpacePlayer, setCardUseLRIGSpacePlayer] = useState<Card[]>([]);
    const [cardUseLRIGSpaceTarget, setCardUseLRIGSpaceTarget] = useState<Card[]>([]);
    const [isTypePopupLRIG, setIsTypePopupLRIG] = useState(0);
    const [isTypePopupHand, setIsTypePopupHand] = useState(0);
    const [isPositionSpace, setIsPositionSpace] = useState(0);
    const [isPositionCard, setIsPositionCard] = useState(0);
    const [cardData0, setCardData0] = useState<Card>();
    const [cardData1, setCardData1] = useState<Card>();

    const reSetSpace = () => {

        const cardCheckData0 = cardList.find(card => card.id === 0);
        setCardData0(cardCheckData0);

        const cardCheckData1 = cardList.find(card => card.id === -1);
        setCardData1(cardCheckData1);

        let cardUseMAINPlayer = [...cardUseMAINSpacePlayer];
        let cardUseMAINTarget = [...cardUseMAINSpaceTarget];
        if (cardUseMAINPlayer.length === 0) {
            cardMAINSpacePlayer.forEach((value, index) => {
                const card = cardList.find(card => card.id === value);
                if (card) {
                    cardUseMAINPlayer.push(card);
                }
            });
        }
        else {
            const cardPut: Card[] = [];
            cardMAINSpacePlayer.forEach((value, index) => {
                const card = cardList.find(card => card.id === value);
                if (card) {
                    cardPut.push(card);
                }
            });
            cardUseMAINPlayer = cardPut;
        }
        if (cardUseMAINTarget.length === 0) {
            cardMAINSpaceTarget.forEach((value, index) => {
                const card = cardList.find(card => card.id === value);
                if (card) {
                    cardUseMAINTarget.push(card);
                }
            });
        }
        else {
            const cardPut: Card[] = [];
            cardMAINSpaceTarget.forEach((value, index) => {
                const card = cardList.find(card => card.id === value);
                if (card) {
                    cardPut.push(card);
                }
            });
            cardUseMAINTarget = cardPut;
        }
        setCardUseMAINSpacePlayer(cardUseMAINPlayer);
        setCardUseMAINSpaceTarget(cardUseMAINTarget);

        let cardUseLRIGPlayer = [...cardUseLRIGSpacePlayer];
        let cardUseLRIGTarget = [...cardUseLRIGSpaceTarget];
        if (cardUseLRIGPlayer.length === 0) {
            cardLRIGSpacePlayer.forEach((value, index) => {
                const card = cardList.find(card => card.id === value);
                if (card) {
                    cardUseLRIGPlayer.push(card);
                }
            });
        }
        else {
            const cardPut: Card[] = [];
            cardLRIGSpacePlayer.forEach((value, index) => {
                const card = cardList.find(card => card.id === value);
                if (card) {
                    cardPut.push(card);
                }
            });
            cardUseLRIGPlayer = cardPut;
        }
        if (cardUseLRIGTarget.length === 0) {
            cardLRIGSpaceTarget.forEach((value, index) => {
                const card = cardList.find(card => card.id === value);
                if (card) {
                    cardUseLRIGTarget.push(card);
                }
            });
        }
        else {
            const cardPut: Card[] = [];
            cardLRIGSpaceTarget.forEach((value, index) => {
                const card = cardList.find(card => card.id === value);
                if (card) {
                    cardPut.push(card);
                }
            });
            cardUseLRIGTarget = cardPut;
        }
        setCardUseLRIGSpacePlayer(cardUseLRIGPlayer);
        setCardUseLRIGSpaceTarget(cardUseLRIGTarget);
    }

    useEffect(() => {
        reSetSpace();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClickLRIGCardPlayer = (card: Card, index: number) => {
        if (card.id === 0) {
            setIsTypePopupLRIG(1);
            setIsPositionSpace(index);
            setIsPopupLRIG(true);
        } else {
            setIsTypeAction(1);
            setIsPositionCard(1);
            setIsPositionSpace(index);
            setPopupAction(card);
        }
    }

    const handleClickLRIGCardTarget = (card: Card, index: number) => {
        if (card.id === 0) {
            setIsTypePopupLRIG(1);
            setIsPositionSpace(index);
            setIsPopupLRIGBot(true);
        } else {
            setIsTypeAction(1);
            setIsPositionCard(2);
            setIsPositionSpace(index);
            setPopupAction(card);
        }
    }

    const handleClickMAINCardPlayer = (card: Card, index: number) => {
        if (card.id === -1) {
            setIsTypePopupHand(1);
            setIsPositionSpace(index);
            setIsPopupHand(true);
        } else {
            setIsTypeAction(2);
            setIsPositionCard(3);
            setIsPositionSpace(index);
            setPopupAction(card);
        }
    }

    const handleClickMAINCardTarget = (card: Card, index: number) => {
        if (card.id === -1) {
            setIsTypePopupHand(1);
            setIsPositionSpace(index);
            setIsPopupHandBot(true);
        } else {
            setIsTypeAction(2);
            setIsPositionCard(4);
            setIsPositionSpace(index);
            setPopupAction(card);
        }
    }

    const handleChangeCard = (id: number) => {
        switch (id) {
            case 1:
                switch (isPositionCard) {
                    case 1:
                        const cardPut1 = [...numberLRIGCard];  // Sao chép mảng hiện tại
                        cardPut1.push(cardLRIGSpacePlayer[isPositionSpace]);  // Thêm phần tử mới vào mảng sao chép
                        setNumberLRIGCard(cardPut1);  // Cập nhật trạng thái với mảng mới
                        cardLRIGSpacePlayer[isPositionSpace] = 0;  // Đặt phần tử tại vị trí `isPositionSpace` về 0
                        if (cardData0) cardUseLRIGSpacePlayer[isPositionSpace] = cardData0;
                        break;
                    case 2:
                        const cardPut2 = [...numberLRIGCardBot];  // Sao chép mảng hiện tại
                        cardPut2.push(cardLRIGSpaceTarget[isPositionSpace]);  // Thêm phần tử mới vào mảng sao chép
                        setNumberLRIGCardBot(cardPut2);  // Cập nhật trạng thái với mảng mới
                        cardLRIGSpaceTarget[isPositionSpace] = 0;  // Đặt phần tử tại vị trí `isPositionSpace` về 0
                        if (cardData0) cardUseLRIGSpaceTarget[isPositionSpace] = cardData0;
                        break;
                }
                break;
            case 2:
                switch (isPositionCard) {
                    case 3:
                        const cardPut1 = [...numberHandCard];  // Sao chép mảng hiện tại
                        cardPut1.push(cardMAINSpacePlayer[isPositionSpace]);  // Thêm phần tử mới vào mảng sao chép
                        setNumberHandCard(cardPut1);  // Cập nhật trạng thái với mảng mới
                        cardMAINSpacePlayer[isPositionSpace] = -1;  // Đặt phần tử tại vị trí `isPositionSpace` về 0
                        if (cardData1) cardUseMAINSpacePlayer[isPositionSpace] = cardData1;
                        break;
                    case 4:
                        const cardPut2 = [...numberHandCardBot];  // Sao chép mảng hiện tại
                        cardPut2.push(cardMAINSpaceTarget[isPositionSpace]);  // Thêm phần tử mới vào mảng sao chép
                        setNumberHandCardBot(cardPut2);  // Cập nhật trạng thái với mảng mới
                        cardMAINSpaceTarget[isPositionSpace] = -1;  // Đặt phần tử tại vị trí `isPositionSpace` về 0
                        if (cardData1) cardUseMAINSpaceTarget[isPositionSpace] = cardData1;
                        break;
                }
                break;
            case 3:
                switch (isPositionCard) {
                    case 3:
                        const cardPut1 = [...numberEnerCard];  // Sao chép mảng hiện tại
                        cardPut1.push(cardMAINSpacePlayer[isPositionSpace]);  // Thêm phần tử mới vào mảng sao chép
                        setNumberEnerCard(cardPut1);  // Cập nhật trạng thái với mảng mới
                        cardMAINSpacePlayer[isPositionSpace] = -1;  // Đặt phần tử tại vị trí `isPositionSpace` về 0
                        if (cardData1) cardUseMAINSpacePlayer[isPositionSpace] = cardData1;
                        break;
                    case 4:
                        const cardPut2 = [...numberEnerCardBot];  // Sao chép mảng hiện tại
                        cardPut2.push(cardMAINSpaceTarget[isPositionSpace]);  // Thêm phần tử mới vào mảng sao chép
                        setNumberEnerCardBot(cardPut2);  // Cập nhật trạng thái với mảng mới
                        cardMAINSpaceTarget[isPositionSpace] = -1;  // Đặt phần tử tại vị trí `isPositionSpace` về 0
                        if (cardData1) cardUseMAINSpaceTarget[isPositionSpace] = cardData1;
                        break;
                }
                break;
            case 4:
                switch (isPositionCard) {
                    case 3:
                        const cardPut1 = [...numberTrashCard];  // Sao chép mảng hiện tại
                        cardPut1.push(cardMAINSpacePlayer[isPositionSpace]);  // Thêm phần tử mới vào mảng sao chép
                        setNumberTrashCard(cardPut1);  // Cập nhật trạng thái với mảng mới
                        cardMAINSpacePlayer[isPositionSpace] = -1;  // Đặt phần tử tại vị trí `isPositionSpace` về 0
                        if (cardData1) cardUseMAINSpacePlayer[isPositionSpace] = cardData1;
                        break;
                    case 4:
                        const cardPut2 = [...numberTrashCardBot];  // Sao chép mảng hiện tại
                        cardPut2.push(cardMAINSpaceTarget[isPositionSpace]);  // Thêm phần tử mới vào mảng sao chép
                        setNumberTrashCardBot(cardPut2);  // Cập nhật trạng thái với mảng mới
                        cardMAINSpaceTarget[isPositionSpace] = -1;  // Đặt phần tử tại vị trí `isPositionSpace` về 0
                        if (cardData1) cardUseMAINSpaceTarget[isPositionSpace] = cardData1;
                        break;
                }
                break;
        }
        setPopupAction(null);
        setPopupChangePositionAction(null);
    }

    const handleEffectCard = (id: number) => {
        const updateCardPower = (cards: Card[], position: number, powerChange: number) => {
            return cards.map((card, index) =>
                index === position ? { ...card, cardPower: card.cardPower + powerChange } : card
            );
        };

        type CardProperty = 'isDown' | 'isFreeze'; // Thêm các thuộc tính boolean khác nếu cần

        const toggleCardProperty = (cards: Card[], position: number, property: CardProperty) => {
            return cards.map((card, index) =>
                index === position ? { ...card, [property]: !card[property] } : card
            );
        };
        switch (id) {
            case -1:
                switch (isPositionCard) {
                    case 1:
                        setCardUseLRIGSpacePlayer(toggleCardProperty(cardUseLRIGSpacePlayer, isPositionSpace, 'isDown'));
                        break;
                    case 2:
                        setCardUseLRIGSpaceTarget(toggleCardProperty(cardUseLRIGSpaceTarget, isPositionSpace, 'isDown'));
                        break;
                }
                break;
            case 1:
                switch (isPositionCard) {
                    case 3:
                        setCardUseMAINSpacePlayer(updateCardPower(cardUseMAINSpacePlayer, isPositionSpace, 1000));
                        break;
                    case 4:
                        setCardUseMAINSpaceTarget(updateCardPower(cardUseMAINSpaceTarget, isPositionSpace, 1000));
                        break;
                }
                break;
            case 2:
                switch (isPositionCard) {
                    case 3:
                        setCardUseMAINSpacePlayer(updateCardPower(cardUseMAINSpacePlayer, isPositionSpace, -1000));
                        break;
                    case 4:
                        setCardUseMAINSpaceTarget(updateCardPower(cardUseMAINSpaceTarget, isPositionSpace, -1000));
                        break;
                }
                break;
            case 3:
                switch (isPositionCard) {
                    case 3:
                        setCardUseMAINSpacePlayer(toggleCardProperty(cardUseMAINSpacePlayer, isPositionSpace, 'isDown'));
                        break;
                    case 4:
                        setCardUseMAINSpaceTarget(toggleCardProperty(cardUseMAINSpaceTarget, isPositionSpace, 'isDown'));
                        break;
                }
                break;
            case 4:
                switch (isPositionCard) {
                    case 3:
                        setCardUseMAINSpacePlayer(toggleCardProperty(cardUseMAINSpacePlayer, isPositionSpace, 'isFreeze'));
                        break;
                    case 4:
                        setCardUseMAINSpaceTarget(toggleCardProperty(cardUseMAINSpaceTarget, isPositionSpace, 'isFreeze'));
                        break;
                }
                break;
        }
        setPopupAction(null);
        setEffectAction(null);
    }

    const handleTitleCard = (id: number) => {
        const updateStatusName = (cards: Card[], position: number, statusName: string) => {
            if (statusName !== "") {
                return cards.map((card, index) => {
                    if (index === position) {
                        // Nếu statusName hiện tại không phải là chuỗi rỗng, thêm dấu phẩy trước giá trị mới
                        const updatedStatus = card.statusName && card.statusName !== ""
                            ? `${card.statusName} ${statusName}`
                            : statusName;
                        return { ...card, statusName: updatedStatus };
                    }
                    return card;
                });
            }
            else {
                return cards.map((card, index) =>
                    index === position ? { ...card, statusName: statusName } : card
                );
            }
        };

        switch (id) {
            case 1:
                switch (isPositionCard) {
                    case 3:
                        setCardUseMAINSpacePlayer(updateStatusName(cardUseMAINSpacePlayer, isPositionSpace, ""));
                        break;
                    case 4:
                        setCardUseMAINSpaceTarget(updateStatusName(cardUseMAINSpaceTarget, isPositionSpace, ""));
                        break;
                }
                break;
            case 2:
                switch (isPositionCard) {
                    case 3:
                        setCardUseMAINSpacePlayer(updateStatusName(cardUseMAINSpacePlayer, isPositionSpace, "【Assassin】"));
                        break;
                    case 4:
                        setCardUseMAINSpaceTarget(updateStatusName(cardUseMAINSpaceTarget, isPositionSpace, "【Assassin】"));
                        break;
                }
                break;
            case 3:
                switch (isPositionCard) {
                    case 3:
                        setCardUseMAINSpacePlayer(updateStatusName(cardUseMAINSpacePlayer, isPositionSpace, "【Double Crush】"));
                        break;
                    case 4:
                        setCardUseMAINSpaceTarget(updateStatusName(cardUseMAINSpaceTarget, isPositionSpace, "【Double Crush】"));
                        break;
                }
                break;
            case 4:
                switch (isPositionCard) {
                    case 3:
                        setCardUseMAINSpacePlayer(updateStatusName(cardUseMAINSpacePlayer, isPositionSpace, "【Lancer】"));
                        break;
                    case 4:
                        setCardUseMAINSpaceTarget(updateStatusName(cardUseMAINSpaceTarget, isPositionSpace, "【Lancer】"));
                        break;
                }
                break;
        }
        setPopupAction(null);
        setTitleAction(null);
    }

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
                            className='w-[15%] h-auto cursor-pointer'
                            onClick={() => { setIsPopupLifeBot(true) }}
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
                        {cardUseLRIGSpaceTarget.map((card, index) => (
                            <Image
                                key={index}
                                src={card.imageUrl}
                                alt={'Ảnh bìa chính'}
                                width={750}
                                height={1047}
                                className={`w-[20%] h-auto cursor-pointer ${index === 1 ? 'mx-12' : ''} ${card.isDown ? 'rotate-90' : ''}`}
                                onClick={() => { handleClickLRIGCardTarget(card, index) }}
                            />
                        ))}
                    </div>
                    <div className='flex justify-center mt-5 items-center'>
                        {cardUseMAINSpaceTarget.map((card, index) => (
                            <div key={index} className={`relative w-[20%] cursor-pointer ${index === 1 ? 'mx-12' : ''}`}>
                                {card.statusName !== "" &&
                                    <p className="absolute text-[8px] top-0 left-0 w-full bg-black bg-opacity-50 text-white text-center">
                                        {`${card.statusName}`}
                                    </p>
                                }
                                <Image
                                    src={card.imageUrl}
                                    alt={'Ảnh bìa chính'}
                                    width={750}
                                    height={1047}
                                    className={`w-full rounded-md h-auto ${card.isDown ? 'rotate-90' : ''} ${card.isFreeze ? 'border-[3px] border-cyan-300' : ''}`}
                                    onClick={() => { handleClickMAINCardTarget(card, index) }}
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
                        <div className='cursor-pointer' onClick={() => { setPopupChangePhase(true) }}>
                            {MainPhase === 0 &&
                                <p className='text-white font-bold text-xs my-5 text-center mx-5'>Giai Đoạn Khởi Đầu</p>
                            }
                            {MainPhase === 1 &&
                                <p className='text-white font-bold text-xs my-5 text-center mx-5'>Giai Đoạn Mở Bài</p>
                            }
                            {MainPhase === 2 &&
                                <p className='text-white font-bold text-xs my-5 text-center mx-5'>Giai Đoạn Rút Bài</p>
                            }
                            {MainPhase === 3 &&
                                <p className='text-white font-bold text-xs my-5 text-center mx-5'>Giai Đoạn Nhập Bài</p>
                            }
                            {MainPhase === 4 &&
                                <p className='text-white font-bold text-xs my-5 text-center mx-4'>Giai Đoạn Phát Triển</p>
                            }
                            {MainPhase === 5 &&
                                <p className='text-white font-bold text-xs my-5 text-center mx-5'>Giai Đoạn Chính</p>
                            }
                            {MainPhase === 6 &&
                                <p className='text-white cursor-pointer font-bold text-xs my-5 text-center mx-5'
                                >Giai Đoạn Tấn Công
                                </p>
                            }
                            {MainPhase === 7 &&
                                <p className='text-white cursor-pointer font-bold text-xs my-5 text-center mx-5'
                                >Giai Đoạn Kết Thúc
                                </p>
                            }
                        </div>
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
                                {card.statusName !== "" &&
                                    <p className="absolute text-[8px] top-0 left-0 w-full bg-black bg-opacity-50 text-white text-center">
                                        {`${card.statusName}`}
                                    </p>
                                }
                                <Image
                                    src={card.imageUrl}
                                    alt={'Ảnh bìa chính'}
                                    width={750}
                                    height={1047}
                                    className={`w-full h-auto rounded-md ${card.isDown ? 'rotate-90' : ''} ${card.isFreeze ? 'border-[3px] border-cyan-300' : ''}`}
                                    onClick={() => { handleClickMAINCardPlayer(card, index) }}
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
                        {cardUseLRIGSpacePlayer.map((card, index) => (
                            <Image
                                key={index}
                                src={card.imageUrl}
                                alt={'Ảnh bìa chính'}
                                width={750}
                                height={1047}
                                className={`w-[20%] h-auto cursor-pointer ${index === 1 ? 'mx-12' : ''} ${card.isDown ? 'rotate-90' : ''}`}
                                onClick={() => { handleClickLRIGCardPlayer(card, index) }}
                            />
                        ))}
                    </div>
                    <div className='flex justify-center mt-5 items-center'>
                        <Image
                            src={'/backside/MAIN.jpg'}
                            alt={'Ảnh bìa chính'}
                            width={750}
                            height={1047}
                            className='w-[15%] h-auto cursor-pointer'
                            onClick={() => { setIsPopupLife(true) }}
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
            {isPopupAction && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 mx-5 rounded-lg shadow-lg text-center">
                        {isTypeAction === 1 &&
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="font-bold text-xl mr-4">Hành Động LRIG</p>
                                    <IoMdClose
                                        onClick={() => { setPopupAction(null) }}
                                        className="font-bold text-2xl cursor-pointer"
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => { setSelectedCard(isPopupAction) }}
                                    >
                                        Xem Thẻ
                                    </button>
                                    <button
                                        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => { setPopupChangePositionAction(isPopupAction) }}
                                    >
                                        Di Chuyển
                                    </button>
                                    {isPositionSpace === 1 &&
                                        <button
                                            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            onClick={() => { handleEffectCard(-1) }}
                                        >
                                            Đổi Tư Thế
                                        </button>
                                    }
                                </div>
                            </>
                        }
                        {isTypeAction === 2 &&
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="font-bold text-xl mr-4">Hành Động SIGNI</p>
                                    <IoMdClose
                                        onClick={() => { setPopupAction(null) }}
                                        className="font-bold text-2xl cursor-pointer"
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => { setSelectedCard(isPopupAction) }}
                                    >
                                        Xem Thẻ
                                    </button>
                                    <button
                                        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => { setPopupChangePositionAction(isPopupAction) }}
                                    >
                                        Di Chuyển
                                    </button>
                                    <button
                                        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => { setEffectAction(isPopupAction) }}
                                    >
                                        Trạng Thái
                                    </button>
                                    <button
                                        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => { setTitleAction(isPopupAction) }}
                                    >
                                        Danh Hiệu
                                    </button>
                                </div>
                            </>
                        }
                    </div>
                </div >
            )}
            {isPopupChangePositionAction && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 mx-5 rounded-lg shadow-lg text-center">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-xl mr-4">Di Chuyển</p>
                            <IoMdClose
                                onClick={() => { setPopupChangePositionAction(null) }}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className='flex flex-col'>
                            {(isPositionCard === 1 || isPositionCard === 2) &&
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={() => { handleChangeCard(1) }}
                                >
                                    Bộ Bài LRIG
                                </button>
                            }
                            {(isPositionCard === 3 || isPositionCard === 4) &&
                                <>
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => { handleChangeCard(2) }}
                                    >
                                        Bài Trên Tay
                                    </button>
                                    <button
                                        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => { handleChangeCard(3) }}
                                    >
                                        Vùng Nguyên Liệu
                                    </button>
                                    <button
                                        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => { handleChangeCard(4) }}
                                    >
                                        Thùng Rác
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                </div >
            )}
            {isPopupChangePhase && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 mx-5 rounded-lg shadow-lg text-center">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-xl mr-4">Chuyển Giai Đoạn</p>
                            <IoMdClose
                                onClick={() => { setPopupChangePhase(false) }}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { setMainPhase(0); setPopupChangePhase(false) }}
                            >
                                Giai Đoạn Khởi Đầu
                            </button>
                            <button
                                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { setMainPhase(1); setPopupChangePhase(false) }}
                            >
                                Giai Đoạn Mở Bài
                            </button>
                            <button
                                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { setMainPhase(2); setPopupChangePhase(false) }}
                            >
                                Giai Đoạn Rút Bài
                            </button>
                            <button
                                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { setMainPhase(3); setPopupChangePhase(false) }}
                            >
                                Giai Đoạn Nhập Bài
                            </button>
                            <button
                                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { setMainPhase(4); setPopupChangePhase(false) }}
                            >
                                Giai Đoạn Phát Triển
                            </button>
                            <button
                                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { setMainPhase(5); setPopupChangePhase(false) }}
                            >
                                Giai Đoạn Chính
                            </button>
                            <button
                                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { setMainPhase(6); setPopupChangePhase(false) }}
                            >
                                Giai Đoạn Tấn Công
                            </button>
                            <button
                                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { setMainPhase(7); setPopupChangePhase(false) }}
                            >
                                Giai Đoạn Kết Thúc
                            </button>
                        </div>
                    </div>
                </div >
            )}
            {isEffectAction && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 mx-5 rounded-lg shadow-lg text-center">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-xl mr-4">Trạng Thái SIGNI</p>
                            <IoMdClose
                                onClick={() => { setEffectAction(null) }}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { handleEffectCard(1) }}
                            >
                                Tăng Sức Mạnh
                            </button>
                            <button
                                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { handleEffectCard(2) }}
                            >
                                Giảm Sức Mạnh
                            </button>
                            <button
                                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { handleEffectCard(3) }}
                            >
                                Đổi Tư Thế
                            </button>
                            <button
                                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { handleEffectCard(4) }}
                            >
                                Đóng Băng
                            </button>
                        </div>
                    </div>
                </div >
            )}
            {isTitleAction && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 mx-5 rounded-lg shadow-lg text-center">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-xl mr-4">Danh Hiệu SIGNI</p>
                            <IoMdClose
                                onClick={() => { setTitleAction(null) }}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { handleTitleCard(1) }}
                            >
                                Loại Bỏ
                            </button>
                            <button
                                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { handleTitleCard(2) }}
                            >
                                【Assassin】
                            </button>
                            <button
                                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { handleTitleCard(3) }}
                            >
                                【Double Crush】
                            </button>
                            <button
                                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { handleTitleCard(4) }}
                            >
                                【Lancer】
                            </button>
                        </div>
                    </div>
                </div >
            )}
            <EnerPopup
                isOpen={isPopupEner}
                onClose={() => { setIsPopupEner(false) }}
                numberCard={numberEnerCard}
                setNumberCard={setNumberEnerCard}
                numberMAINCard={numberMAINCard}
                setNumberMAINCard={setNumberMAINCard}
                numberHandCard={numberHandCard}
                setNumberHandCard={setNumberHandCard}
                numberTrashCard={numberTrashCard}
                setNumberTrashCard={setNumberTrashCard}
            />
            <HandPopup
                isOpen={isPopupHand}
                onClose={() => {
                    setIsPopupHand(false);
                    setIsTypePopupHand(0);
                }}
                numberCard={numberHandCard}
                type={isTypePopupHand}
                MAINSpace={cardMAINSpacePlayer}
                MAINUseSpace={cardUseMAINSpacePlayer}
                setNumberCard={setNumberHandCard}
                position={isPositionSpace}
                numberMAINCard={numberMAINCard}
                setNumberMAINCard={setNumberMAINCard}
                numberEnerCard={numberEnerCard}
                setNumberEnerCard={setNumberEnerCard}
                numberTrashCard={numberTrashCard}
                setNumberTrashCard={setNumberTrashCard} />
            <LRIGPopup
                isOpen={isPopupLRIG}
                onClose={() => {
                    setIsPopupLRIG(false);
                    setIsTypePopupLRIG(0);
                }}
                numberCard={numberLRIGCard}
                type={isTypePopupLRIG}
                LRIGSpace={cardLRIGSpacePlayer}
                LRIGUseSpace={cardUseLRIGSpacePlayer}
                setNumberCard={setNumberLRIGCard}
                position={isPositionSpace} />
            <MAINPopup
                isOpen={isPopupMAIN}
                onClose={() => { setIsPopupMAIN(false) }}
                numberCardMAIN={numberMAINCard}
                setNumberCardMAIN={setNumberMAINCard}
                numberCardHand={numberHandCard}
                setNumberCardHand={setNumberHandCard}
                numberEnerCard={numberEnerCard}
                setNumberEnerCard={setNumberEnerCard}
                numberTrashCard={numberTrashCard}
                setNumberTrashCard={setNumberTrashCard}
                numberLifeCard={numberLifeCard}
                setNumberLifeCard={setNumberLifeCard}
            />
            <TrashPopup
                isOpen={isPopupTrash}
                onClose={() => { setIsPopupTrash(false) }}
                numberCard={numberTrashCard}
                setNumberCard={setNumberTrashCard}
                numberMAINCard={numberMAINCard}
                setNumberMAINCard={setNumberMAINCard}
                numberHandCard={numberHandCard}
                setNumberHandCard={setNumberHandCard}
                numberEnerCard={numberEnerCard}
                setNumberEnerCard={setNumberEnerCard}
            />
            <LifePopup
                isOpen={isPopupLife}
                onClose={() => { setIsPopupLife(false) }}
                numberCardLife={numberLifeCard}
                setNumberCardLife={setNumberLifeCard}
                numberEnerCard={numberEnerCard}
                setNumberEnerCard={setNumberEnerCard}
                numberTrashCard={numberTrashCard}
                setNumberTrashCard={setNumberTrashCard}
            />
            <EnerPopupBot
                isOpen={isPopupEnerBot}
                onClose={() => { setIsPopupEnerBot(false) }}
                numberCard={numberEnerCardBot}
                setNumberCard={setNumberEnerCardBot}
                numberMAINCard={numberMAINCardBot}
                setNumberMAINCard={setNumberMAINCardBot}
                numberHandCard={numberHandCardBot}
                setNumberHandCard={setNumberHandCardBot}
                numberTrashCard={numberTrashCardBot}
                setNumberTrashCard={setNumberTrashCardBot}
            />
            <HandPopupBot
                isOpen={isPopupHandBot}
                onClose={() => {
                    setIsPopupHandBot(false);
                    setIsTypePopupHand(0);
                }}
                numberCard={numberHandCardBot}
                type={isTypePopupHand}
                MAINSpace={cardMAINSpaceTarget}
                MAINUseSpace={cardUseMAINSpaceTarget}
                setNumberCard={setNumberHandCardBot}
                position={isPositionSpace}
                numberMAINCard={numberMAINCardBot}
                setNumberMAINCard={setNumberMAINCardBot}
                numberEnerCard={numberEnerCardBot}
                setNumberEnerCard={setNumberEnerCardBot}
                numberTrashCard={numberTrashCardBot}
                setNumberTrashCard={setNumberTrashCardBot} />
            <LRIGPopupBot isOpen={isPopupLRIGBot}
                onClose={() => {
                    setIsPopupLRIGBot(false);
                    setIsTypePopupLRIG(0);
                }}
                numberCard={numberLRIGCardBot}
                type={isTypePopupLRIG}
                LRIGSpace={cardLRIGSpaceTarget}
                LRIGUseSpace={cardUseLRIGSpaceTarget}
                setNumberCard={setNumberLRIGCardBot}
                position={isPositionSpace} />
            <MAINPopupBot
                isOpen={isPopupMAINBot}
                onClose={() => { setIsPopupMAINBot(false) }}
                numberCardMAIN={numberMAINCardBot}
                setNumberCardMAIN={setNumberMAINCardBot}
                numberCardHand={numberHandCardBot}
                setNumberCardHand={setNumberHandCardBot}
                numberEnerCard={numberEnerCardBot}
                setNumberEnerCard={setNumberEnerCardBot}
                numberTrashCard={numberTrashCardBot}
                setNumberTrashCard={setNumberTrashCardBot}
                numberLifeCard={numberLifeCardBot}
                setNumberLifeCard={setNumberLifeCardBot}
            />
            <TrashPopupBot
                isOpen={isPopupTrashBot}
                onClose={() => { setIsPopupTrashBot(false) }}
                numberCard={numberTrashCardBot}
                setNumberCard={setNumberTrashCardBot}
                numberMAINCard={numberMAINCardBot}
                setNumberMAINCard={setNumberMAINCardBot}
                numberHandCard={numberHandCardBot}
                setNumberHandCard={setNumberHandCardBot}
                numberEnerCard={numberEnerCardBot}
                setNumberEnerCard={setNumberEnerCardBot}
            />
            <LifePopupBot
                isOpen={isPopupLifeBot}
                onClose={() => { setIsPopupLifeBot(false) }}
                numberCardLife={numberLifeCardBot}
                setNumberCardLife={setNumberLifeCardBot}
                numberEnerCard={numberEnerCardBot}
                setNumberEnerCard={setNumberEnerCardBot}
                numberTrashCard={numberTrashCardBot}
                setNumberTrashCard={setNumberTrashCardBot}
            />
            {selectedCard && <CardDetail card={selectedCard} onClose={() => { setSelectedCard(null) }} />}
        </>
    );
};

export default PlayGround;