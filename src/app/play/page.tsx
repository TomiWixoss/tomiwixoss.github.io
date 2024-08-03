'use client'
import React from 'react';
import Image from 'next/image';
import { useEffect, useState, useRef, useCallback } from 'react';
import EnerPopup from '../../components/EnerCard';
import HandPopup from '../../components/HandCard';
import LRIGPopup from '../../components/LRIGCard';
import MAINPopup from '../../components/MAINCard';
import TrashPopup from '../../components/TrashCard';
import LifePopup from '../../components/LifeCard';
import RemovePopup from '../../components/RemoveCard';
import { IoMdClose } from "react-icons/io";
import EnerPopupBot from '../../components/EnerCardBot';
import HandPopupBot from '../../components/HandCardBot';
import LRIGPopupBot from '../../components/LRIGCardBot';
import MAINPopupBot from '../../components/MAINCardBot';
import TrashPopupBot from '../../components/TrashCardBot';
import LifePopupBot from '../../components/LifeCardBot';
import RemovePopupBot from '../../components/RemoveCardBot';
import CardDetail from '../../components/CardDetail';
import Card from "../../types/cardList";
import cardList from '../../components/CardDB';
import { IoHandLeft } from "react-icons/io5";
import { TbCardsFilled } from "react-icons/tb";
import { GiCardRandom } from "react-icons/gi";
import { FaTrashRestore } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { GiCardboardBox } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";
import { useRouter } from 'next/navigation';

const PlayGround: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [isPopupAction, setPopupAction] = useState<Card | null>(null);
    const [isPopupChangePhase, setPopupChangePhase] = useState(false);
    const [isPopupChangePositionAction, setPopupChangePositionAction] = useState<Card | null>(null);
    const [isEffectAction, setEffectAction] = useState<Card | null>(null);
    const [isTitleAction, setTitleAction] = useState<Card | null>(null);
    const [isPopupSetting, setPopupSetting] = useState(false);
    const [isTypeAction, setIsTypeAction] = useState(0);
    const [MainPhase, setMainPhase] = useState<number>(0);
    const [isPopupLRIG, setIsPopupLRIG] = useState(false);
    const [isPopupEner, setIsPopupEner] = useState(false);
    const [isPopupMAIN, setIsPopupMAIN] = useState(false);
    const [isPopupTrash, setIsPopupTrash] = useState(false);
    const [isPopupHand, setIsPopupHand] = useState(false);
    const [isPopupLife, setIsPopupLife] = useState(false);
    const [isPopupRemove, setIsPopupRemove] = useState(false);
    const [isPopupLRIGBot, setIsPopupLRIGBot] = useState(false);
    const [isPopupEnerBot, setIsPopupEnerBot] = useState(false);
    const [isPopupMAINBot, setIsPopupMAINBot] = useState(false);
    const [isPopupHandBot, setIsPopupHandBot] = useState(false);
    const [isPopupTrashBot, setIsPopupTrashBot] = useState(false);
    const [isPopupLifeBot, setIsPopupLifeBot] = useState(false);
    const [isPopupRemoveBot, setIsPopupRemoveBot] = useState(false);
    // Khởi tạo state với giá trị mặc định
    const [numberMAINCard, setNumberMAINCard] = useState<number[]>([]);
    const [numberLRIGCard, setNumberLRIGCard] = useState<number[]>([]);
    const [numberLifeCard, setNumberLifeCard] = useState<number[]>([]);
    const [numberHandCard, setNumberHandCard] = useState<number[]>([]);
    const [numberEnerCard, setNumberEnerCard] = useState<number[]>([]);
    const [numberTrashCard, setNumberTrashCard] = useState<number[]>([]);
    const [numberRemoveCard, setNumberRemoveCard] = useState<number[]>([]);
    // Khởi tạo state với giá trị mặc định
    const [numberMAINCardBot, setNumberMAINCardBot] = useState<number[]>([]);
    const [numberLRIGCardBot, setNumberLRIGCardBot] = useState<number[]>([]);
    const [numberLifeCardBot, setNumberLifeCardBot] = useState<number[]>([]);
    const [numberHandCardBot, setNumberHandCardBot] = useState<number[]>([]);
    const [numberEnerCardBot, setNumberEnerCardBot] = useState<number[]>([]);
    const [numberTrashCardBot, setNumberTrashCardBot] = useState<number[]>([]);
    const [numberRemoveCardBot, setNumberRemoveCardBot] = useState<number[]>([]);
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
    const [turnGame, setTurnGame] = useState(0);
    const [isPopupTurn, setPopupTurn] = useState(false);
    // Lấy dữ liệu từ localStorage và chuyển thành mảng boolean
    const getSavedSlots = () => {
        if (typeof window !== "undefined") {
            const saved = window.localStorage.getItem('save');
            return saved ? JSON.parse(saved) : [false, false, false];
        }
    };

    const [saveSlot, setSaveSlot] = useState<boolean[]>(getSavedSlots());
    const [isPopupSaveGame, setPopupSaveGame] = useState(false);
    const [isPopupLoadGame, setPopupLoadGame] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Lấy dữ liệu từ localStorage khi component được render lần đầu tiên
        const savedMAINCardPlayer = window.localStorage.getItem('MAINDeckPlayer');
        const savedLRIGCardPlayer = window.localStorage.getItem('LRIGDeckPlayer');

        if (savedMAINCardPlayer) {
            setNumberMAINCard(JSON.parse(savedMAINCardPlayer));
        } else {
            // Nếu không có dữ liệu, khởi tạo với giá trị mặc định
            setNumberMAINCard([
                12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14,
                15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17,
                18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20,
                21, 21, 21, 21
            ]);
        }

        if (savedLRIGCardPlayer) {
            setNumberLRIGCard(JSON.parse(savedLRIGCardPlayer));
        } else {
            // Nếu không có dữ liệu, khởi tạo với giá trị mặc định
            setNumberLRIGCard([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
        }

        const savedMAINCardTarget = window.localStorage.getItem('MAINDeckTarget');
        const savedLRIGCardTarget = window.localStorage.getItem('LRIGDeckTarget');

        if (savedMAINCardTarget) {
            setNumberMAINCardBot(JSON.parse(savedMAINCardTarget));
        } else {
            // Nếu không có dữ liệu, khởi tạo với giá trị mặc định
            setNumberMAINCardBot([
                12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14,
                15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17,
                18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20,
                21, 21, 21, 21
            ]);
        }

        if (savedLRIGCardTarget) {
            setNumberLRIGCardBot(JSON.parse(savedLRIGCardTarget));
        } else {
            // Nếu không có dữ liệu, khởi tạo với giá trị mặc định
            setNumberLRIGCardBot([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
        }
    }, []);

    const saveData = (slot: number) => {
        const data = {
            selectedCard,
            isPopupAction,
            isPopupChangePhase,
            isPopupChangePositionAction,
            isEffectAction,
            isTitleAction,
            isPopupSetting,
            isTypeAction,
            MainPhase,
            isPopupLRIG,
            isPopupEner,
            isPopupMAIN,
            isPopupTrash,
            isPopupHand,
            isPopupLife,
            isPopupRemove,
            isPopupLRIGBot,
            isPopupEnerBot,
            isPopupMAINBot,
            isPopupHandBot,
            isPopupTrashBot,
            isPopupLifeBot,
            isPopupRemoveBot,
            numberMAINCard,
            numberLRIGCard,
            numberLifeCard,
            numberHandCard,
            numberEnerCard,
            numberTrashCard,
            numberRemoveCard,
            numberMAINCardBot,
            numberLRIGCardBot,
            numberLifeCardBot,
            numberHandCardBot,
            numberEnerCardBot,
            numberTrashCardBot,
            numberRemoveCardBot,
            cardLRIGSpacePlayer,
            cardLRIGSpaceTarget,
            cardMAINSpacePlayer,
            cardMAINSpaceTarget,
            cardUseMAINSpacePlayer,
            cardUseMAINSpaceTarget,
            cardUseLRIGSpacePlayer,
            cardUseLRIGSpaceTarget,
            isTypePopupLRIG,
            isTypePopupHand,
            isPositionSpace,
            isPositionCard,
            cardData0,
            cardData1,
            turnGame
        };
        if (typeof window !== "undefined") {
            window.localStorage.setItem(`gameDataSlot${slot}`, JSON.stringify(data));
        }
    };

    const loadData = (slot: number) => {
        if (typeof window !== "undefined") {
            const savedData = window.localStorage.getItem(`gameDataSlot${slot}`);
            if (savedData) {
                const data = JSON.parse(savedData);

                setSelectedCard(data.selectedCard);
                setPopupAction(data.isPopupAction);
                setPopupChangePhase(data.isPopupChangePhase);
                setPopupChangePositionAction(data.isPopupChangePositionAction);
                setEffectAction(data.isEffectAction);
                setTitleAction(data.isTitleAction);
                setPopupSetting(data.isPopupSetting);
                setIsTypeAction(data.isTypeAction);
                setMainPhase(data.MainPhase);
                setIsPopupLRIG(data.isPopupLRIG);
                setIsPopupEner(data.isPopupEner);
                setIsPopupMAIN(data.isPopupMAIN);
                setIsPopupTrash(data.isPopupTrash);
                setIsPopupHand(data.isPopupHand);
                setIsPopupLife(data.isPopupLife);
                setIsPopupRemove(data.isPopupRemove);
                setIsPopupLRIGBot(data.isPopupLRIGBot);
                setIsPopupEnerBot(data.isPopupEnerBot);
                setIsPopupMAINBot(data.isPopupMAINBot);
                setIsPopupHandBot(data.isPopupHandBot);
                setIsPopupTrashBot(data.isPopupTrashBot);
                setIsPopupLifeBot(data.isPopupLifeBot);
                setIsPopupRemoveBot(data.isPopupRemoveBot);
                setNumberMAINCard(data.numberMAINCard);
                setNumberLRIGCard(data.numberLRIGCard);
                setNumberLifeCard(data.numberLifeCard);
                setNumberHandCard(data.numberHandCard);
                setNumberEnerCard(data.numberEnerCard);
                setNumberTrashCard(data.numberTrashCard);
                setNumberRemoveCard(data.numberRemoveCard);
                setNumberMAINCardBot(data.numberMAINCardBot);
                setNumberLRIGCardBot(data.numberLRIGCardBot);
                setNumberLifeCardBot(data.numberLifeCardBot);
                setNumberHandCardBot(data.numberHandCardBot);
                setNumberEnerCardBot(data.numberEnerCardBot);
                setNumberTrashCardBot(data.numberTrashCardBot);
                setNumberRemoveCardBot(data.numberRemoveCardBot);
                setCardLRIGSpacePlayer(data.cardLRIGSpacePlayer);
                setCardLRIGSpaceTarget(data.cardLRIGSpaceTarget);
                setCardMAINSpacePlayer(data.cardMAINSpacePlayer);
                setCardMAINSpaceTarget(data.cardMAINSpaceTarget);
                setCardUseMAINSpacePlayer(data.cardUseMAINSpacePlayer);
                setCardUseMAINSpaceTarget(data.cardUseMAINSpaceTarget);
                setCardUseLRIGSpacePlayer(data.cardUseLRIGSpacePlayer);
                setCardUseLRIGSpaceTarget(data.cardUseLRIGSpaceTarget);
                setIsTypePopupLRIG(data.isTypePopupLRIG);
                setIsTypePopupHand(data.isTypePopupHand);
                setIsPositionSpace(data.isPositionSpace);
                setIsPositionCard(data.isPositionCard);
                setCardData0(data.cardData0);
                setCardData1(data.cardData1);
                setTurnGame(data.turnGame);
            }
        }
    };

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

    const requestRef = useRef<number>();

    const updateCardPower = (
        cardSpace: number[],
        numberEnerCard: number[],
        cardUseSpace: Card[],
        setCardUseSpace: React.Dispatch<React.SetStateAction<Card[]>>,
        powerChanges: { [key: number]: number } // Đối tượng ánh xạ id với sức mạnh
    ) => {
        const cardUse = JSON.parse(JSON.stringify(cardUseSpace));
        let hasChanges = false; // Biến cờ để theo dõi sự thay đổi

        Object.entries(powerChanges).forEach(([id, powerChange]) => {
            const cardId = parseInt(id, 10);
            if (cardSpace.includes(cardId)) {
                const position = cardSpace.indexOf(cardId);
                if (numberEnerCard.length >= 3) {
                    const checkEnerCard = numberEnerCard
                        .map(value => cardList.find(card => card.id === value))
                        .filter((card): card is Card => card !== undefined);

                    const cardClassSet = new Set(checkEnerCard.map(card => card.cardClass));

                    if (cardClassSet.size >= 3) {
                        if (cardUse[position]?.cardEffect.includes("Const")) {
                            cardUse[position].cardPower += powerChange;
                            cardUse[position].cardEffect = cardUse[position].cardEffect.filter((effect: string) => effect !== "Const");
                            setSelectedCard(cardUse[position]);
                            hasChanges = true; // Đánh dấu là có thay đổi
                        }
                    } else {
                        if (!cardUse[position]?.cardEffect.includes("Const")) {
                            cardUse[position].cardPower -= powerChange;
                            cardUse[position].cardEffect.push("Const");
                            hasChanges = true; // Đánh dấu là có thay đổi
                        }
                    }
                } else {
                    if (!cardUse[position]?.cardEffect.includes("Const")) {
                        cardUse[position].cardPower -= powerChange;
                        cardUse[position].cardEffect.push("Const");
                        hasChanges = true; // Đánh dấu là có thay đổi
                    }
                }
            }
        });

        // Chỉ cập nhật trạng thái nếu có thay đổi
        if (hasChanges) {
            setCardUseSpace(cardUse);
        }
    };

    useEffect(() => {
        const effect = () => {
            const powerChangesPlayer = {
                12: 4000,
                14: 5000,
            };

            const powerChangesTarget = {
                12: 4000,
                14: 5000,
            };

            if (cardMAINSpacePlayer.some(id => id in powerChangesPlayer)) {
                updateCardPower(cardMAINSpacePlayer, numberEnerCard, cardUseMAINSpacePlayer, setCardUseMAINSpacePlayer, powerChangesPlayer);
            }

            if (cardMAINSpaceTarget.some(id => id in powerChangesTarget)) {
                updateCardPower(cardMAINSpaceTarget, numberEnerCardBot, cardUseMAINSpaceTarget, setCardUseMAINSpaceTarget, powerChangesTarget);
            }

            requestRef.current = requestAnimationFrame(effect);
        };

        requestRef.current = requestAnimationFrame(effect);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [numberEnerCard, cardMAINSpacePlayer, cardUseMAINSpacePlayer, cardMAINSpaceTarget, cardUseMAINSpaceTarget, numberEnerCardBot]);

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
                    <div className='flex justify-end'>
                        <IoSettings
                            className='text-white text-xl cursor-pointer'
                            onClick={() => { setPopupSetting(true) }}
                        />
                    </div>
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
                        <div className='flex flex-col ml-6 justify-center items-center'>
                            <IoHandLeft
                                className='text-white my-2 text-xl cursor-pointer'
                                onClick={() => { setIsPopupHandBot(true) }}
                            />
                            <GiCardRandom
                                className='text-white my-2 text-xl cursor-pointer'
                                onClick={() => { setIsPopupMAINBot(true) }}
                            />
                        </div>
                        <div className='flex flex-col ml-6 justify-center items-center'>
                            <GiCardboardBox
                                className='text-white my-2 text-xl cursor-pointer'
                                onClick={() => { setIsPopupEnerBot(true) }}
                            />
                            <TbCardsFilled
                                className='text-white my-2 text-xl cursor-pointer'
                                onClick={() => { setIsPopupLRIGBot(true) }}
                            />
                        </div>
                        <div className='flex flex-col ml-6 justify-center items-center'>
                            <FaTrashRestore
                                className='text-white my-2 text-xl cursor-pointer'
                                onClick={() => { setIsPopupTrashBot(true) }}
                            />
                            <FaTrash
                                className='text-white my-2 text-xl cursor-pointer'
                                onClick={() => { setIsPopupRemoveBot(true) }}
                            />
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
                        <p className='text-white font-bold text-xs my-5 text-center cursor-pointer'
                            onClick={() => { setPopupTurn(true) }}
                        >Lượt {turnGame}</p>
                        <p className='text-white font-bold text-xs my-5 text-center mx-2'> - </p>
                        <div className='cursor-pointer' onClick={() => { setPopupChangePhase(true) }}>
                            {MainPhase === 0 &&
                                <p className='text-white font-bold text-xs my-5 text-center'>Giai Đoạn Khởi Đầu</p>
                            }
                            {MainPhase === 1 &&
                                <p className='text-white font-bold text-xs my-5 text-center'>Giai Đoạn Mở Bài</p>
                            }
                            {MainPhase === 2 &&
                                <p className='text-white font-bold text-xs my-5 text-center'>Giai Đoạn Rút Bài</p>
                            }
                            {MainPhase === 3 &&
                                <p className='text-white font-bold text-xs my-5 text-center'>Giai Đoạn Nhập Bài</p>
                            }
                            {MainPhase === 4 &&
                                <p className='text-white font-bold text-xs my-5 text-center'>Giai Đoạn Phát Triển</p>
                            }
                            {MainPhase === 5 &&
                                <p className='text-white font-bold text-xs my-5 text-center'>Giai Đoạn Chính</p>
                            }
                            {MainPhase === 6 &&
                                <p className='text-white cursor-pointer font-bold text-xs my-5 text-center'
                                >Giai Đoạn Tấn Công
                                </p>
                            }
                            {MainPhase === 7 &&
                                <p className='text-white cursor-pointer font-bold text-xs my-5 text-center'
                                >Giai Đoạn Kết Thúc
                                </p>
                            }
                        </div>
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
                        <div className='flex flex-col ml-6 justify-center items-center'>
                            <IoHandLeft
                                className='text-white my-2 text-xl cursor-pointer'
                                onClick={() => { setIsPopupHand(true) }}
                            />
                            <GiCardRandom
                                className='text-white my-2 text-xl cursor-pointer'
                                onClick={() => { setIsPopupMAIN(true) }}
                            />
                        </div>
                        <div className='flex flex-col ml-6 justify-center items-center'>
                            <GiCardboardBox
                                className='text-white my-2 text-xl cursor-pointer'
                                onClick={() => { setIsPopupEner(true) }}
                            />
                            <TbCardsFilled
                                className='text-white my-2 text-xl cursor-pointer'
                                onClick={() => { setIsPopupLRIG(true) }}
                            />
                        </div>
                        <div className='flex flex-col ml-6 justify-center items-center'>
                            <FaTrashRestore
                                className='text-white my-2 text-xl cursor-pointer'
                                onClick={() => { setIsPopupTrash(true) }}
                            />
                            <FaTrash
                                className='text-white my-2 text-xl cursor-pointer'
                                onClick={() => { setIsPopupRemove(true) }}
                            />
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
            {isPopupSetting && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 mx-5 rounded-lg shadow-lg text-center">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-xl mr-4">Cài Đặt</p>
                            <IoMdClose
                                onClick={() => { setPopupSetting(false) }}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { router.push('/deck') }}
                            >
                                Đổi Deck
                            </button>
                            <button
                                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { setPopupSaveGame(true) }}
                            >
                                Lưu Dữ Liệu
                            </button>
                            <button
                                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { setPopupLoadGame(true) }}
                            >
                                Tải Dữ Liệu
                            </button>
                        </div>
                    </div>
                </div >
            )}
            {isPopupSaveGame && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 mx-5 rounded-lg shadow-lg text-center">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-xl mr-4">Lưu Dữ Liệu</p>
                            <IoMdClose
                                onClick={() => { setPopupSaveGame(false) }}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className='flex flex-col'>
                            {[0, 1, 2].map((slot) => (
                                <button
                                    key={slot}
                                    className={`px-4 py-2 mt-4 bg-blue-500 text-white hover:bg-blue-600 rounded`}
                                    onClick={() => {
                                        const slots = [...saveSlot];
                                        slots[slot] = true;
                                        setSaveSlot(slots);
                                        saveData(slot);
                                        if (typeof window !== "undefined") {
                                            window.localStorage.setItem('save', JSON.stringify(slots));
                                        }
                                        setPopupSaveGame(false);
                                    }}
                                >
                                    Ô Lưu {slot + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div >
            )}
            {isPopupLoadGame && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 mx-5 rounded-lg shadow-lg text-center">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-xl mr-4">Tải Dữ Liệu</p>
                            <IoMdClose
                                onClick={() => { setPopupLoadGame(false); }}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className='flex flex-col'>
                            {[0, 1, 2].map((slot) => (
                                <button
                                    key={slot}
                                    className={`px-4 py-2 mt-4 ${!saveSlot[slot] ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'} rounded`}
                                    onClick={() => {
                                        loadData(slot);
                                        setPopupLoadGame(false);
                                    }}
                                    disabled={!saveSlot[slot]}
                                >
                                    Ô Tải {slot + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {isPopupTurn && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 mx-5 rounded-lg shadow-lg text-center">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-xl mr-4">Chuyển Lượt</p>
                            <IoMdClose
                                onClick={() => { setPopupTurn(false) }}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <button
                                className={`px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded`}
                                onClick={() => {
                                    const turn = turnGame + 1;
                                    setTurnGame(turn);
                                    setPopupTurn(false);
                                }}
                            >
                                Chuyển Lượt Kế
                            </button>
                            <button
                                className={`px-4 py-2 mt-4 bg-blue-500 text-white hover:bg-blue-600 rounded`}
                                onClick={() => {
                                    const turn = turnGame - 1;
                                    setTurnGame(turn);
                                    setPopupTurn(false);
                                }}
                            >
                                Chuyển Lượt Trước
                            </button>
                        </div>
                    </div>
                </div>
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
                position={isPositionSpace}
                numberRemoveCard={numberRemoveCard}
                setNumberRemoveCard={setNumberRemoveCard}
            />
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
            <RemovePopup
                isOpen={isPopupRemove}
                onClose={() => { setIsPopupRemove(false) }}
                numberCard={numberRemoveCard}
                setNumberCard={setNumberRemoveCard}
                numberLRIGCard={numberLRIGCard}
                setNumberLRIGCard={setNumberLRIGCard}
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
                position={isPositionSpace}
                numberRemoveCard={numberRemoveCardBot}
                setNumberRemoveCard={setNumberRemoveCardBot}
            />
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
            <RemovePopupBot
                isOpen={isPopupRemoveBot}
                onClose={() => { setIsPopupRemoveBot(false) }}
                numberCard={numberRemoveCardBot}
                setNumberCard={setNumberRemoveCardBot}
                numberLRIGCard={numberLRIGCardBot}
                setNumberLRIGCard={setNumberLRIGCardBot}
            />
            {selectedCard && <CardDetail card={selectedCard} onClose={() => { setSelectedCard(null) }} />}
        </>
    );
};

export default PlayGround;