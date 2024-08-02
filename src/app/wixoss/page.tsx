'use client'
import React from 'react';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import LRIGPopup from '../../components/LRIGCard';
import ChooseLRIGPopup from '../../components/ChooseCardLRIG';
import ChooseHandPopup from '../../components/ChooseCardHand';
import MAINPopup from '../../components/MAINCard';
import HandCardPopup from '../../components/HandCard';
import EnerCardPopup from '../../components/EnerCard';
import TrashCardPopup from '../../components/TrashCard';
import cardList from '../../components/CardDB';
import CardDetail from '../../components/CardDetail';
import Card from "../../types/cardList";
import { IoMdClose } from "react-icons/io";
import LRIGPopupBot from '../../components/LRIGCardBot';
import MAINPopupBot from '../../components/MAINCardBot';
import HandCardPopupBot from '../../components/HandCardBot';
import EnerCardPopupBot from '../../components/EnerCardBot';
import TrashCardPopupBot from '../../components/TrashCardBot';
import ChooseMAINSpacePopup from '../../components/ChooseMAINSpace';

const PlayGround: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [isPopupAction, setPopupAction] = useState(true);
    const [startPhase, setStartPhase] = useState<number>(0);
    const [MainPhase, setMainPhase] = useState<number>(0);
    const [botMainPhase, setBotMainPhase] = useState<number>(0);
    const [isPopupEffectAction, setPopupEffectAction] = useState(false);
    const [actionType, setActionType] = useState<number>(0);
    const [drawCardNumber, setDrawCardNumber] = useState<number>(0);
    const [discardCardNumber, setDiscardCardNumber] = useState<number>(0);
    const [idCardActiveEffect, setIdCardActiveEffect] = useState<number>(0);
    const [isPopupLRIG, setIsPopupLRIG] = useState(false);
    const [isPopupEner, setIsPopupEner] = useState(false);
    const [isPopupMAIN, setIsPopupMAIN] = useState(false);
    const [isPopupTrash, setIsPopupTrash] = useState(false);
    const [isChoosePopupLRIG, setIsChoosePopupLRIG] = useState(false);
    const [isPopupHand, setIsPopupHand] = useState(false);
    const [isChoosePopupHand, setIsChoosePopupHand] = useState(false);
    const [isPopupLRIGBot, setIsPopupLRIGBot] = useState(false);
    const [isPopupEnerBot, setIsPopupEnerBot] = useState(false);
    const [isPopupMAINBot, setIsPopupMAINBot] = useState(false);
    const [isPopupHandBot, setIsPopupHandBot] = useState(false);
    const [isPopupTrashBot, setIsPopupTrashBot] = useState(false);
    const [isCompleteChoosePopupHand, setIsCompleteChoosePopupHand] = useState<number[]>([]);
    const [isTypePopupLRIG, setIsTypePopupLRIG] = useState(1);
    const [isTypePopupChooseHand, setIsTypePopupChooseHand] = useState(0);
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
    const [targetSpaceMAINPlayer, setTargetSpaceMAINPlayer] = useState(0);
    const [checkLRIGCardLevelUp, setCheckLRIGCardLevelUp] = useState<Card | null>(null);
    const [checkLRIGCardLevelUpPosition, setCheckLRIGCardLevelUpPosition] = useState(0);
    const [isSelectedLRIGCard, setIsSelectedLRIGCard] = useState<Card | null>(null);
    const [checkEnterCardEffectLRIG, setCheckEnterCardEffectLRIG] = useState<Card[]>([]);
    const [isPopupEnter, setIsPopupEnter] = useState<Card | null>(null);
    const [isPopupChooseMAINSpace, setIsPopupChooseMAINSpace] = useState(false);
    const [isTypePopupChooseMAINSpace, setIsTypePopupChooseMAINSpace] = useState(0);
    const [isPowerCheckPopupChooseMAINSpace, setIsPowerCheckPopupChooseMAINSpace] = useState(0);
    const [turnGame, setTurnGame] = useState<number>(0);
    const [isFirstTurn, setIsFirstTurn] = useState<boolean>(false);
    const [checkLimitCardMAINBot, setCheckLimitCardMAINBot] = useState<number>(0);
    const requestRef = useRef<number>();

    const constEffect = (time: number) => {
        if (cardMAINSpacePlayer.includes(12)) {
            const position = cardMAINSpacePlayer.indexOf(12);
            if (numberEnerCard.length >= 3) {
                const checkEnerCard: Card[] = [];
                numberEnerCard.forEach((value, index) => {
                    const card = cardList.find(card => card.id === value);
                    if (card) checkEnerCard.push(card);
                })
                // Sử dụng Set để lưu các giá trị cardClass duy nhất
                const cardClassSet = new Set<string>();
                checkEnerCard.forEach(card => cardClassSet.add(card.cardClass));
                if (cardClassSet.size >= 3) {
                    const cardUseMAIN = [...cardUseMAINSpacePlayer];
                    cardUseMAIN[position].cardPower += 4000;
                    setCardUseMAINSpacePlayer(cardUseMAIN);
                }
            }
        }
        requestRef.current = requestAnimationFrame(constEffect);
    };

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

    useEffect(() => {
        requestRef.current = requestAnimationFrame(constEffect);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const LRIGCard = [...cardLRIGSpacePlayer];
        const MAINCard = [...cardMAINSpacePlayer];

        const checkLRIGCard: Card[] = [];
        const checkMAINCard: Card[] = [];

        LRIGCard.forEach((value, index) => {
            const matchingCard = cardList.find(card => card.id === value);
            if (matchingCard) {
                checkLRIGCard.push(matchingCard); // Thêm card vào mảng kết quả
            }
        });

        MAINCard.forEach((value, index) => {
            const matchingCard = cardList.find(card => card.id === value);
            if (matchingCard) {
                checkMAINCard.push(matchingCard); // Thêm card vào mảng kết quả
            }
        });

        // Tìm tất cả thẻ LRIG có hiệu ứng "Enter"
        const foundCardsLRIG = checkLRIGCard.filter(card => card.cardEffect.includes("Enter"));

        foundCardsLRIG.forEach(foundCardLRIG => {
            if (!checkEnterCardEffectLRIG.some(card => card.id === foundCardLRIG.id)) {
                checkEnterCardEffectLRIG.push(foundCardLRIG);
                setIsPopupEnter(foundCardLRIG);
            }
        });

    }, [cardLRIGSpacePlayer, cardMAINSpacePlayer, checkEnterCardEffectLRIG]);

    const handleActiveEnterEffect = (card: Card) => {
        setIsPopupEnter(null);
        setIdCardActiveEffect(0);
        switch (card.id) {
            case 6:
                setActionType(1);
                setDrawCardNumber(1);
                setPopupEffectAction(true);
                setIdCardActiveEffect(6);
                setIsTypePopupChooseMAINSpace(1);
                setIsPopupChooseMAINSpace(true);
                break;
            case 9:
                setActionType(1);
                setDrawCardNumber(2);
                setPopupEffectAction(true);
                break;
        }
    };

    const handleEffectDrawCard = () => {
        const cardDrawHand: number[] = [...numberHandCard];
        const cardDrawMAIN: number[] = [...numberMAINCard];

        const draw = cardDrawMAIN.splice(0, drawCardNumber);

        draw.forEach((value, index) => {
            cardDrawHand.push(value);
        });

        setNumberHandCard(cardDrawHand);
        setNumberMAINCard(cardDrawMAIN);
        setPopupEffectAction(false);
        switch (idCardActiveEffect) {
            case 6:
                setDiscardCardNumber(1);
                break;
        }
    };

    useEffect(() => {
        if (discardCardNumber > 0) {
            setIsTypePopupChooseHand(3);
            setIsChoosePopupHand(true);
        }
    }, [discardCardNumber])

    const handleLRIGCardClick = (card: Card) => {
        setIsSelectedLRIGCard(card);
    };
    // Hàm xáo trộn mảng
    const shuffleArray = (array: number[]) => {
        let shuffledArray = array.slice(); // Tạo bản sao của mảng
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Hoán đổi các phần tử
        }
        return shuffledArray;
    };

    const handleArrayUpdate = () => {
        // Xáo trộn mảng numberMAINCard
        const shuffledArray = shuffleArray(numberMAINCard);

        // Lấy 5 phần tử đầu tiên của mảng đã xáo trộn
        const itemsToMove = shuffledArray.slice(0, 5);
        // Cập nhật mảng numberMAINCard và newArray
        setNumberMAINCard(shuffledArray.slice(5));
        setNumberHandCard(itemsToMove);
    };

    const handleOpenPopupChoosePhase = (id: number) => {
        setPopupAction(true);
        switch (id) {
            case 1:
                setMainPhase(7);
                break;
        }
    };

    const handleCheckCardHand = () => {
        if (numberHandCard.length >= 7) {
            setDiscardCardNumber(numberHandCard.length - 6);
        }
        setPopupEffectAction(true);
        setActionType(0);
        setMainPhase(10);
    }

    const handleRemoveEffect = () => {
        if (numberHandCard.length >= 7) {
            setMainPhase(9);
        }
        else {
            setPopupEffectAction(true);
            setActionType(0);
            setMainPhase(10);
        }

    }

    const drawCardBot = (numberDraw: number) => {
        const cardDrawHandBot: number[] = [...numberHandCardBot];
        const cardDrawMAINBot: number[] = [...numberMAINCardBot];

        const drawBot = cardDrawMAINBot.splice(0, numberDraw);

        drawBot.forEach((value, index) => {
            cardDrawHandBot.push(value);
        });
        setNumberHandCardBot(cardDrawHandBot);
        setNumberMAINCardBot(cardDrawMAINBot);
    }

    // Hàm delay trả về một Promise hoàn thành sau một khoảng thời gian nhất định
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const botTurn = async () => {
        setBotMainPhase(1);
        await delay(1000);

        setBotMainPhase(2);
        let numberDraw: number = 1;
        if (turnGame >= 2) {
            numberDraw = 2;
        }
        const cardDrawHandBot: number[] = [...numberHandCardBot];
        const cardDrawMAINBot: number[] = [...numberMAINCardBot];

        const drawBot = cardDrawMAINBot.splice(0, numberDraw);

        drawBot.forEach((value, index) => {
            cardDrawHandBot.push(value);
        });
        setNumberHandCardBot(cardDrawHandBot);
        setNumberMAINCardBot(cardDrawMAINBot);
        await delay(3000);

        setBotMainPhase(3);
        let cardInHandBot = cardDrawHandBot;
        const cardInEnerBot = [...numberEnerCardBot];
        const cardUse: Card[] = [];
        cardInHandBot.forEach((value, index) => {
            const card = cardList.find(card => card.id === value);
            if (card) cardUse.push(card);
        });

        let cardPut: Card | undefined = cardUse.find(card => card.cardLevel > 1);

        const randomIndex = Math.floor(Math.random() * cardUse.length);
        const cardPutIndex = cardUse.findIndex(card => card.id === cardPut?.id);
        if (cardPut === undefined) {
            cardPut = cardUse[randomIndex];
            cardInEnerBot.push(cardPut.id);
            cardInHandBot = removeCardByIndex(cardInHandBot, randomIndex);
            setNumberHandCardBot(cardInHandBot);
        }
        else {
            cardInEnerBot.push(cardPut.id);
            // Tìm vị trí của cardPut trong cardUse
            cardInHandBot = removeCardByIndex(cardInHandBot, cardPutIndex);
            setNumberHandCardBot(cardInHandBot);;
        }
        setNumberEnerCardBot(cardInEnerBot);
        await delay(3000);

        setBotMainPhase(4);
        const cardLRIGSpace = [...cardLRIGSpaceTarget];
        const cardInLRIGBot = [...numberLRIGCardBot];

        // Tìm thẻ ở trung tâm, có thể là undefined
        const cardCheckCenter: Card | undefined = cardList.find(card => card.id === cardLRIGSpace[1]);

        // Kiểm tra cardCheckCenter trước khi tiếp tục
        if (cardCheckCenter) {
            // Tìm thẻ có cardLevel lớn hơn cardCheckCenter.cardLevel
            const cardLevelUp = cardList.find(card => card.cardLevel === cardCheckCenter.cardLevel + 1 && card.isLRIGCenter === true);

            // Xử lý cardLevelUp, có thể là undefined
            if (cardLevelUp) {
                cardLRIGSpace[1] = cardLevelUp.id;
                setCardLRIGSpaceTarget(cardLRIGSpace);
                setNumberLRIGCardBot(removeCardById(cardInLRIGBot, cardLevelUp.id));
            }
        }
        await delay(3000);

        setBotMainPhase(5);
        let cardMAINSpaceBot = [...cardMAINSpaceTarget];
        let cardUseMAINSpaceBot = [...cardUseMAINSpaceTarget];
        let cardUseForMAINTurn: Card[] = [];
        cardInHandBot.forEach((value, index) => {
            const card = cardList.find(card => card.id === value);
            if (card) cardUseForMAINTurn.push(card);
        });

        let checkLimitBot = checkLimitCardMAINBot;

        let checkLimitMAINBot: Card[] = [];
        cardLRIGSpace.forEach((value, index) => {
            const card = cardList.find(card => card.id === value);
            if (card) checkLimitMAINBot.push(card);
        });

        if (cardMAINSpaceBot[1] === -1) {
            if (cardCheckCenter) {
                // Tìm thẻ có cardLevel lớn hơn cardCheckCenter.cardLevel
                const cardLevelUp = cardList.find(card => card.cardLevel === cardCheckCenter.cardLevel + 1 && card.isLRIGCenter === true);
                // Xử lý cardLevelUp, có thể là undefined
                if (cardLevelUp) {
                    // Tìm thẻ trong cardUseForMAINTurn có cardLevel nhỏ hơn hoặc bằng cardLevelUp.cardLevel
                    const cardToUse = cardUseForMAINTurn.find(card => card.cardLevel <= cardLevelUp.cardLevel && card.cardType === "SIGNI");

                    if (cardToUse) {
                        if (cardToUse.cardLevel + checkLimitBot <= checkLimitMAINBot[0].cardLimit + checkLimitMAINBot[1].cardLimit + checkLimitMAINBot[2].cardLimit) {
                            cardMAINSpaceBot[1] = cardToUse.id;
                            cardUseMAINSpaceBot[1] = cardToUse;
                            setCardMAINSpaceTarget(cardMAINSpaceBot);
                            setCardUseMAINSpaceTarget(cardUseMAINSpaceBot);
                            // Tìm index của cardToUse trong cardUseForMAINTurn
                            const cardIndex = cardUseForMAINTurn.findIndex(card => card.id === cardToUse.id);
                            cardInHandBot = removeCardByIndex(cardInHandBot, cardIndex);
                            setNumberHandCardBot(cardInHandBot);
                            checkLimitBot = checkLimitBot + cardToUse.cardLevel;
                            setCheckLimitCardMAINBot(checkLimitBot);
                        }
                    }
                }
            }
        }

        cardUseForMAINTurn = [];
        cardInHandBot.forEach((value, index) => {
            const card = cardList.find(card => card.id === value);
            if (card) cardUseForMAINTurn.push(card);
        });

        if (cardMAINSpaceBot[0] === -1) {
            if (cardCheckCenter) {
                // Tìm thẻ có cardLevel lớn hơn cardCheckCenter.cardLevel
                const cardLevelUp = cardList.find(card => card.cardLevel === cardCheckCenter.cardLevel + 1 && card.isLRIGCenter === true);
                // Xử lý cardLevelUp, có thể là undefined
                if (cardLevelUp) {
                    // Tìm thẻ trong cardUseForMAINTurn có cardLevel nhỏ hơn hoặc bằng cardLevelUp.cardLevel
                    const cardToUse = cardUseForMAINTurn.find(card => card.cardLevel <= cardLevelUp.cardLevel && card.cardType === "SIGNI");

                    if (cardToUse) {
                        if (cardToUse.cardLevel + checkLimitBot <= checkLimitMAINBot[0].cardLimit + checkLimitMAINBot[1].cardLimit + checkLimitMAINBot[2].cardLimit) {
                            cardMAINSpaceBot[0] = cardToUse.id;
                            cardUseMAINSpaceBot[0] = cardToUse;
                            setCardMAINSpaceTarget(cardMAINSpaceBot);
                            setCardUseMAINSpaceTarget(cardUseMAINSpaceBot);
                            // Tìm index của cardToUse trong cardUseForMAINTurn
                            const cardIndex = cardUseForMAINTurn.findIndex(card => card.id === cardToUse.id);
                            cardInHandBot = removeCardByIndex(cardInHandBot, cardIndex);
                            setNumberHandCardBot(cardInHandBot);
                            checkLimitBot = checkLimitBot + cardToUse.cardLevel;
                            setCheckLimitCardMAINBot(checkLimitBot);
                        }
                    }
                }
            }
        }

        cardUseForMAINTurn = [];
        cardInHandBot.forEach((value, index) => {
            const card = cardList.find(card => card.id === value);
            if (card) cardUseForMAINTurn.push(card);
        });

        if (cardMAINSpaceBot[2] === -1) {
            if (cardCheckCenter) {
                // Tìm thẻ có cardLevel lớn hơn cardCheckCenter.cardLevel
                const cardLevelUp = cardList.find(card => card.cardLevel === cardCheckCenter.cardLevel + 1 && card.isLRIGCenter === true);
                // Xử lý cardLevelUp, có thể là undefined
                if (cardLevelUp) {
                    // Tìm thẻ trong cardUseForMAINTurn có cardLevel nhỏ hơn hoặc bằng cardLevelUp.cardLevel
                    const cardToUse = cardUseForMAINTurn.find(card => card.cardLevel <= cardLevelUp.cardLevel && card.cardType === "SIGNI");

                    if (cardToUse) {
                        if (cardToUse.cardLevel + checkLimitBot <= checkLimitMAINBot[0].cardLimit + checkLimitMAINBot[1].cardLimit + checkLimitMAINBot[2].cardLimit) {
                            cardMAINSpaceBot[2] = cardToUse.id;
                            cardUseMAINSpaceBot[2] = cardToUse;
                            setCardMAINSpaceTarget(cardMAINSpaceBot);
                            setCardUseMAINSpaceTarget(cardUseMAINSpaceBot);
                            // Tìm index của cardToUse trong cardUseForMAINTurn
                            const cardIndex = cardUseForMAINTurn.findIndex(card => card.id === cardToUse.id);
                            cardInHandBot = removeCardByIndex(cardInHandBot, cardIndex);
                            setNumberHandCardBot(cardInHandBot);
                            checkLimitBot = checkLimitBot + cardToUse.cardLevel;
                            setCheckLimitCardMAINBot(checkLimitBot);
                        }
                    }
                }
            }
        }
        await delay(3000);

        setBotMainPhase(6);

        await delay(3000);
        setBotMainPhase(7);
        if (cardInHandBot.length >= 7) {
            cardUseForMAINTurn = [];
            cardInHandBot.forEach((value, index) => {
                const card = cardList.find(card => card.id === value);
                if (card) cardUseForMAINTurn.push(card);
            });
            const trashCardBot: number[] = [...numberTrashCardBot];
            const cardPut = cardInHandBot.splice(0, 1);
            trashCardBot.push(cardPut[0]);
            setNumberTrashCardBot(trashCardBot);
            setNumberHandCardBot(cardInHandBot);
        }
        await delay(3000);
        const turnPlay = turnGame + 1;
        setTurnGame(turnPlay);
        setMainPhase(1);
        setBotMainPhase(-1);
        setPopupAction(true);
        setStartPhase(12);
    }

    useEffect(() => {
        if (turnGame >= 1) {
            if (isFirstTurn) { // Kiểm tra nếu là lượt đầu tiên
                if (turnGame % 2 === 0) { // Kiểm tra nếu turnGame là số chẵn
                    botTurn();
                }
            }
            else {
                if (turnGame % 2 !== 0) { // Kiểm tra nếu turnGame là số lẻ
                    botTurn();
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFirstTurn, turnGame])

    const handleOpenPopupLRIGBot = () => {
        setIsPopupLRIGBot(true);
    };

    const handleClosePopupLRIGBot = () => {
        setIsPopupLRIGBot(false);
    };

    const handleOpenPopupMAINBot = () => {
        setIsPopupMAINBot(true);
    };

    const handleClosePopupMAINBot = () => {
        setIsPopupMAINBot(false);
    };

    const handleOpenPopupHandBot = () => {
        setIsPopupHandBot(true);
    };

    const handleClosePopupHandBot = () => {
        setIsPopupHandBot(false);
    };

    const handleOpenPopupEnerBot = () => {
        setIsPopupEnerBot(true);
    };

    const handleClosePopupEnerBot = () => {
        setIsPopupEnerBot(false);
    };

    const handleOpenPopupLRIG = () => {
        setIsPopupLRIG(true);
    };

    const handleClosePopupHand = () => {
        setIsPopupHand(false);
    };

    const handleClosePopupEner = () => {
        setIsPopupEner(false);
    };

    const handleOpenPopupEner = () => {
        setIsPopupEner(true);
    };

    const handleOpenPopupHand = () => {
        setIsPopupHand(true);
    };

    const handleCloseChoosePopupHand = () => {
        if (discardCardNumber > 0) {
            const discardNumber = discardCardNumber - 1;
            setDiscardCardNumber(discardNumber);
        }
        setIsChoosePopupHand(false);
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

    const handleOpenPopupTrash = () => {
        setIsPopupTrash(true);
    };

    const handleClosePopupTrash = () => {
        setIsPopupTrash(false);
    };

    const handleOpenPopupTrashBot = () => {
        setIsPopupTrashBot(true);
    };

    const handleClosePopupTrashBot = () => {
        setIsPopupTrashBot(false);
    };

    const handleOpenPopupChooseMAINSpace = () => {
        setIsPopupChooseMAINSpace(true);
    };

    const handleClosePopupChooseMAINSpace = () => {
        setIsPopupChooseMAINSpace(false);
    };

    const handleChooseSIGNICard = (index: number, id: number, card: Card) => {
        if (id === -1 && (MainPhase === 5 || MainPhase === 6 || MainPhase === 7)) {
            setTargetSpaceMAINPlayer(index);
            setIsTypePopupChooseHand(2);
            setIsChoosePopupHand(true);
        } else {
            if (card.cardEffect.includes("Action") === false) {
                setSelectedCard(card);
            }
        }
    };

    const handleChooseLRIGCard = (index: number, card: Card) => {
        const cardSpaceLRIG: Card[] = [];

        cardLRIGSpacePlayer.forEach((value, index) => {
            const card = cardList.find(card => card.id === value);
            if (card) {
                cardSpaceLRIG.push(card);
            }
        });
        if (card.cardLevel < cardSpaceLRIG[1].cardLevel || card.cardEffect.includes("Action") === true) {
            handleLRIGCardClick(card);
            setCheckLRIGCardLevelUp(card);
            setCheckLRIGCardLevelUpPosition(index);
        }
        else {
            setSelectedCard(card);
        }
    };

    const removeCardById = (cardList: number[], idToRemove: number) => {
        return cardList.map(card => ({ id: card } as { id: number }))
            .filter(card => card.id !== idToRemove)
            .map(card => card.id);
    };

    const removeCardByIndex = (cardList: number[], indexToRemove: number): number[] => {
        return cardList.filter((_, index) => index !== indexToRemove);
    };

    const setUpBot = (id: number) => {
        let cardIsChoose: number[] = [...cardLRIGSpaceTarget];
        let drawBotCardHand: number[] = [...numberHandCardBot];
        let drawBotCardMAIN: number[] = [...numberMAINCardBot];
        let cardBotHand: number[] = [...numberHandCardBot];
        let cardBotMAIN: number[] = [...numberMAINCardBot];
        switch (id) {
            case 1:
                const cardChoose1 = cardList.filter(card => numberLRIGCardBot.includes(card.id) && card.cardLevel === 0 && card.isLRIGCenter === true);
                cardIsChoose[1] = cardChoose1[0].id;
                setCardLRIGSpaceTarget(cardIsChoose);
                setNumberLRIGCardBot(removeCardById(numberLRIGCardBot, cardChoose1[0].id));
                break;
            case 2:
                const cardChoose2 = cardList.filter(card => numberLRIGCardBot.includes(card.id) && card.cardLevel === 0 && card.isLRIGSupport === true);
                cardIsChoose[0] = cardChoose2[0].id;
                setCardLRIGSpaceTarget(cardIsChoose);
                setNumberLRIGCardBot(removeCardById(numberLRIGCardBot, cardChoose2[0].id));
                break;
            case 3:
                const cardChoose3 = cardList.filter(card => numberLRIGCardBot.includes(card.id) && card.cardLevel === 0 && card.isLRIGSupport === true);
                cardIsChoose[2] = cardChoose3[0].id;
                setCardLRIGSpaceTarget(cardIsChoose);
                setNumberLRIGCardBot(removeCardById(numberLRIGCardBot, cardChoose3[0].id));
                break;
            case 4:
                const shuffledArray1 = shuffleArray(drawBotCardMAIN);
                drawBotCardHand = shuffledArray1.splice(0, 5);
                setNumberHandCardBot(drawBotCardHand);
                setNumberMAINCardBot(shuffledArray1);
                break;
            case 5:
                const result: Card[] = [];
                for (const number of cardBotHand) {
                    // Tìm card trong cardList với id khớp với số trong cardBotHand
                    const matchingCard = cardList.find(card => card.id === number && card.cardLevel > 1);
                    if (matchingCard) {
                        result.push(matchingCard); // Thêm card vào mảng kết quả
                    }
                }
                let handCardUse: number[] = [];
                let handCard: number[] = [];
                let handCardBot: Card[] = result;
                handCardBot.forEach((value, index) => {
                    handCard.push(value.id);
                });

                handCard.forEach((value, index) => {
                    cardBotMAIN.push(value);
                });

                handCardUse = cardBotHand.filter(valueCard => !handCard.includes(valueCard));

                const shuffledArray2 = shuffleArray(cardBotMAIN);
                const numberBotCardHand = shuffledArray2.splice(0, handCard.length);

                numberBotCardHand.forEach((value, index) => {
                    handCardUse.push(value);
                });

                setNumberHandCardBot(handCardUse);
                setNumberMAINCardBot(shuffledArray2);
                break;
            case 6:
                setNumberLifeCardBot(numberMAINCardBot.splice(0, 7));
                break;
        }
    }

    const handleChooseTurn = (id: number) => {
        switch (id) {
            case 1:
                setMainPhase(1);
                setIsFirstTurn(true);
                setStartPhase(9);
                break;
            case 2:
                setMainPhase(-1);
                setStartPhase(11);
                setIsFirstTurn(false);
                break;
        }
        setTurnGame(1);
    }

    const handlePopup = () => {
        setStartPhase(prev => prev + 1);
        switch (startPhase) {
            case 1:
                setIsChoosePopupLRIG(true);
                setIsTypePopupLRIG(2);
                setUpBot(1);
                break;
            case 2:
                setIsChoosePopupLRIG(true);
                setIsTypePopupLRIG(1);
                setUpBot(2);
                break;
            case 3:
                setIsChoosePopupLRIG(true);
                setIsTypePopupLRIG(3);
                setUpBot(3);
                break;
            case 4:
                setIsPopupHand(true);
                handleArrayUpdate();
                setUpBot(4);
                break;
            case 5:
                setIsChoosePopupHand(true);
                setUpBot(5);
                break;
            case 6:
                setIsPopupHand(true);
                break;
            case 7:
                setNumberLifeCard(numberMAINCard.splice(0, 7));
                setUpBot(6);
                break;
        }
    };

    const handleMainPopup = () => {
        setMainPhase(prev => prev + 1);
        switch (MainPhase) {
            case 1:

                break;
            case 2:
                if (turnGame === 1) {
                    const pushCard: number[] = numberMAINCard.splice(0, 1);
                    numberHandCard.push(pushCard[0]);
                }
                else {
                    const pushCard: number[] = numberMAINCard.splice(0, 2);
                    pushCard.forEach((value, index) => {
                        numberHandCard.push(value);
                    });
                }
                setIsPopupHand(true);
                break;
            case 3:
                setIsTypePopupChooseHand(1);
                setIsChoosePopupHand(true);
                break;
            case 4:
                setIsTypePopupLRIG(4);
                setIsChoosePopupLRIG(true);
                break;
            case 5:
                setStartPhase(11);
                setPopupAction(false);
                break;
        }
    };

    const handleLevelUpLRIG = () => {
        if (checkLRIGCardLevelUpPosition === 0) {
            setIsTypePopupLRIG(5);
        }
        else {
            setIsTypePopupLRIG(6);
        }
        setIsChoosePopupLRIG(true);
    }

    useEffect(() => {
        if (startPhase === 6 && isCompleteChoosePopupHand[0] === 0) {
            setStartPhase(7);
        }
    }, [startPhase, isCompleteChoosePopupHand]);

    useEffect(() => {
        if (isCompleteChoosePopupHand[0] === 1) {
            // Xáo trộn mảng numberMAINCard
            const shuffledArray = shuffleArray(numberMAINCard);

            // Lấy các phần tử đầu tiên của mảng đã xáo trộn
            const itemsToMove = shuffledArray.slice(0, isCompleteChoosePopupHand[1]);
            // Cập nhật mảng numberMAINCard và newArray
            setNumberMAINCard(shuffledArray.slice(isCompleteChoosePopupHand[1]));

            const handCard = [...numberHandCard];
            itemsToMove.forEach((value, index) => {
                handCard.push(value);
            });

            setNumberHandCard(handCard);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCompleteChoosePopupHand]);

    useEffect(() => {
        if (isChoosePopupLRIG === true || isPopupHand === true || isChoosePopupHand === true) {
            setPopupAction(false);
        }
        else {
            setPopupAction(true);
        }
        if (startPhase === 9) {
            setStartPhase(10);
        }
        if (startPhase === 11) {
            setPopupAction(false);
        }
    }, [isChoosePopupHand, isChoosePopupLRIG, isPopupHand, startPhase]);

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
                                onClick={handleOpenPopupMAINBot}
                            >
                                Bộ Bài Chính
                            </button>
                            <button
                                className="px-2 py-1 text-xs mt-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                                onClick={handleOpenPopupLRIGBot}
                            >
                                Bộ Bài LRIG
                            </button>
                        </div>
                        <div className='flex flex-col ml-2 justify-center items-center'>
                            <button
                                className="px-2 py-1 text-xs text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                                onClick={handleOpenPopupEnerBot}
                            >
                                Nguyên Liệu
                            </button>
                            <button
                                className="px-2 py-1 text-xs mt-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                                onClick={handleOpenPopupTrashBot}
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
                            onClick={handleOpenPopupHandBot}
                        >
                            Tay Đối Thủ
                        </button>
                        {MainPhase === 0 &&
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
                        {botMainPhase === 5 &&
                            <p className='text-white font-bold text-xs my-5 text-center mx-5'>Giai Đoạn Chính</p>
                        }
                        {(MainPhase === 5 || MainPhase === 6 || MainPhase === 7) &&
                            <p className='text-white cursor-pointer font-bold text-xs my-5 text-center mx-5'
                                onClick={() => { handleOpenPopupChoosePhase(1) }}
                            >Giai Đoạn Chính
                            </p>
                        }
                        {(MainPhase === 8 || botMainPhase === 6) &&
                            <p className='text-white cursor-pointer font-bold text-xs my-5 text-center mx-5'
                                onClick={() => { handleOpenPopupChoosePhase(2) }}
                            >Giai Đoạn Tấn Công
                            </p>
                        }
                        {(MainPhase === 9 || MainPhase === 10 || botMainPhase === 7) &&
                            <p className='text-white cursor-pointer font-bold text-xs my-5 text-center mx-5'
                            >Giai Đoạn Kết Thúc
                            </p>
                        }
                        <button
                            className="px-2 py-1 text-xs text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                            onClick={handleOpenPopupHand}
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
                                    onClick={() => { handleChooseSIGNICard(index, card.id, card) }}
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
                                        onClick={() => { handleChooseLRIGCard(index, card) }}
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
                                onClick={handleOpenPopupEner}
                            >
                                Nguyên Liệu
                            </button>
                            <button
                                className="px-2 py-1 text-xs mt-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                                onClick={handleOpenPopupTrash}
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
                                <p className="text-xl mb-4 font-bold">Giai đoạn khởi đầu</p>
                                <p className="text-md mb-4 font-bold">Hãy lựa chọn LRIG trung tâm từ bộ bài LRIG.</p>
                                <button
                                    onClick={handlePopup}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Lựa Chọn
                                </button>
                            </>
                        }
                        {startPhase === 2 &&
                            <>
                                <p className="text-xl mb-4 font-bold">Giai đoạn khởi đầu</p>
                                <p className="text-md mb-4 font-bold">Hãy lựa chọn LRIG hỗ trợ trái từ bộ bài LRIG.</p>
                                <button
                                    onClick={handlePopup}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Lựa Chọn
                                </button>
                            </>
                        }
                        {startPhase === 3 &&
                            <>
                                <p className="text-xl mb-4 font-bold">Giai đoạn khởi đầu</p>
                                <p className="text-md mb-4 font-bold">Hãy lựa chọn LRIG hỗ trợ phải từ bộ bài LRIG.</p>
                                <button
                                    onClick={handlePopup}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Lựa Chọn
                                </button>
                            </>
                        }
                        {startPhase === 4 &&
                            <>
                                <p className="text-xl mb-4 font-bold">Giai đoạn khởi đầu</p>
                                <p className="text-md mb-4 font-bold">Tiếp theo rút 5 lá bài từ bộ bài chính.</p>
                                <button
                                    onClick={handlePopup}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Rút Bài
                                </button>
                            </>
                        }
                        {startPhase === 5 &&
                            <>
                                <p className="text-xl mb-4 font-bold">Giai đoạn khởi đầu</p>
                                <p className="text-md mb-4 font-bold">Bạn có quyền loại bỏ bất kỳ số lượng lá bài trên tay và rút lại tương ứng!</p>
                                <button
                                    onClick={handlePopup}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Bỏ Bài
                                </button>
                            </>
                        }
                        {startPhase === 6 && isCompleteChoosePopupHand[0] === 1 &&
                            <>
                                <p className="text-xl mb-4 font-bold">Giai đoạn khởi đầu</p>
                                <p className="text-md mb-4 font-bold">Bạn đã bỏ {isCompleteChoosePopupHand[1]} lá bài nên bây giờ bạn sẽ rút lại số lá bài tương ứng!</p>
                                <button
                                    onClick={handlePopup}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Rút Lại
                                </button>
                            </>
                        }
                        {startPhase === 7 &&
                            <>
                                <p className="text-xl mb-4 font-bold">Giai đoạn khởi đầu</p>
                                <p className="text-md mb-4 font-bold">Tiếp theo hãy lấy 7 lá bài trên cùng của bộ bài chính để làm &quot;Life Cloth&quot;.</p>
                                <button
                                    onClick={handlePopup}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Lấy Bài
                                </button>
                            </>
                        }
                        {startPhase === 8 &&
                            <>
                                <p className="text-xl mb-4 font-bold">Giai đoạn khởi đầu</p>
                                <p className="text-md mb-4 font-bold">Giai đoạn thiết lập sân khởi đầu đã hoàn tất!</p>
                                <div className='flex flex-col'>
                                    <button
                                        onClick={() => { handleChooseTurn(1) }}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Đi Lượt Đầu
                                    </button>
                                    <button
                                        onClick={() => { handleChooseTurn(2) }}
                                        className="px-4 mt-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Đi Lượt Sau
                                    </button>
                                </div>
                            </>
                        }
                        {MainPhase === 1 &&
                            <>
                                <p className="text-xl mb-4 font-bold">Giai đoạn mở</p>
                                <p className="text-md mb-4 font-bold">Giai đoạn chuyển các lá bài từ thế hạ sang thế mở!</p>
                                <button
                                    onClick={handleMainPopup}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Chuyển Bài
                                </button>
                            </>
                        }
                        {MainPhase === 2 && turnGame === 1 &&
                            <>
                                <p className="text-xl mb-4 font-bold">Giai đoạn rút bài</p>
                                <p className="text-md mb-4 font-bold">Giai đoạn rút 2 lá bài từ bộ bài chính, nhưng do đây là lượt đầu nên chỉ rút được 1 lá!</p>
                                <button
                                    onClick={handleMainPopup}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Rút Bài
                                </button>
                            </>
                        }
                        {MainPhase === 2 && turnGame >= 2 &&
                            <>
                                <p className="text-xl mb-4 font-bold">Giai đoạn rút bài</p>
                                <p className="text-md mb-4 font-bold">Giai đoạn rút 2 lá bài từ bộ bài chính!</p>
                                <button
                                    onClick={handleMainPopup}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Rút Bài
                                </button>
                            </>
                        }
                        {MainPhase === 3 &&
                            <>
                                <p className="text-xl mb-4 font-bold">Giai đoạn nhập bài</p>
                                <p className="text-md mb-4 font-bold">Giai đoạn này sẽ cần chọn 1 lá bài từ tay để đưa vào vùng nguyên liệu.</p>
                                <button
                                    onClick={handleMainPopup}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Nhập Bài
                                </button>
                            </>
                        }
                        {MainPhase === 4 &&
                            <>
                                <p className="text-xl mb-4 font-bold">Giai đoạn phát triển</p>
                                <p className="text-md mb-4 font-bold">Đây là giai đoạn duy nhất mà bạn được phép phát triển thẻ LRIG chính lên cấp cao hơn!</p>
                                <button
                                    onClick={handleMainPopup}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Phát Triển
                                </button>
                            </>
                        }
                        {MainPhase === 5 &&
                            <>
                                <p className="text-xl mb-4 font-bold">Giai đoạn Chính</p>
                                <p className="text-md mb-4 font-bold">Đây là giai đoạn chính nơi bạn triệu hồi các thẻ SIGNI, sử dụng bài phép, PIECE, nâng cấp LRIG hỗ trợ, sử dụng hiệu ứng bài hoặc loại bỏ từ 1 đến 3 các thẻ SIGNI trên sân vào thùng rác.</p>
                                <button
                                    onClick={handleMainPopup}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Bắt Đầu
                                </button>
                            </>
                        }
                        {MainPhase === 7 &&
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="font-bold text-lg">Chuyển Đổi Giai Đoạn</p>
                                    <IoMdClose
                                        onClick={() => {
                                            setPopupAction(false);
                                        }}
                                        className="font-bold text-2xl cursor-pointer"
                                    />
                                </div>
                                <p className="text-md mb-4 font-bold">Bạn có muốn chuyển sang giai đoạn tấn công?</p>
                                <button
                                    onClick={handleMainPopup}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Tấn Công
                                </button>
                            </>
                        }
                        {MainPhase === 8 && turnGame === 1 &&
                            <>
                                <p className="font-bold text-xl mb-4">Giai Đoạn Tấn Công</p>
                                <p className="text-md mb-4 font-bold">Vì đây là lượt đầu nên bạn không thể tấn công đối thủ!</p>
                                <button
                                    onClick={handleRemoveEffect}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Kết Thúc
                                </button>
                            </>
                        }
                        {MainPhase === 9 && numberHandCard.length >= 7 &&
                            <>
                                <p className="font-bold text-xl mb-4">Giai Đoạn Kết Thúc</p>
                                <p className="text-md mb-4 font-bold">Giai đoạn này sẽ kết thúc các hiệu ứng đang diễn ra trên sân nếu có. Nếu bạn có trên tay từ 7 lá bài trở lên hãy loại bỏ cho đến khi còn 6 lá!</p>
                                <button
                                    onClick={handleCheckCardHand}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Loại Bỏ
                                </button>
                            </>
                        }
                    </div>
                </div>
            )}
            {isPopupEffectAction && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 mx-5 rounded-lg shadow-lg text-center">
                        {MainPhase === 10 &&
                            <>
                                <p className="font-bold text-xl mb-4">Giai Đoạn Chuyển Lượt</p>
                                <p className="text-md mb-4 font-bold">Lượt của bạn đã kết thúc!</p>
                                <button
                                    onClick={() => {
                                        const turnPlay = turnGame + 1;
                                        setTurnGame(turnPlay);
                                        setPopupEffectAction(false);
                                        setPopupAction(false);
                                        setMainPhase(-1);
                                    }}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Chuyển Lượt
                                </button>
                            </>
                        }
                        {actionType === 1 &&
                            <>
                                <p className="text-xl mb-4 font-bold">Rút Bài</p>
                                <p className="text-md mb-4 font-bold">Hãy rút {drawCardNumber} lá bài!</p>
                                <button
                                    onClick={handleEffectDrawCard}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Rút Bài
                                </button>
                            </>
                        }
                    </div>
                </div>
            )}
            {isSelectedLRIGCard &&
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 m-5 rounded-lg shadow-lg text-center relative">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-lg mr-4">Bài LRIG</p>
                            <IoMdClose
                                onClick={() => { setIsSelectedLRIGCard(null) }}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <button
                                className="px-4 py-2 my-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { setSelectedCard(isSelectedLRIGCard) }}
                            >
                                Xem Thẻ
                            </button>
                            <button
                                className="px-4 py-2 my-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={handleLevelUpLRIG}
                            >
                                Phát Triển
                            </button>
                        </div>
                    </div>
                </div>
            }
            {isPopupEnter &&
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 m-5 rounded-lg shadow-lg text-center relative">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-lg mr-4">Hiệu Ứng</p>
                            <IoMdClose
                                onClick={() => { setIsPopupEnter(null) }}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <p className='text-center mx-2 my-2 font-[500]'>Phát hiện hiệu ứng vào sân!</p>
                            <button
                                className="px-4 py-2 my-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { setSelectedCard(isPopupEnter) }}
                            >
                                Xem Thẻ
                            </button>
                            <button
                                className="px-4 py-2 my-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { handleActiveEnterEffect(isPopupEnter) }}
                            >
                                Kích Hoạt
                            </button>
                        </div>
                    </div>
                </div>
            }
            <LRIGPopup isOpen={isPopupLRIG}
                onClose={handleClosePopupLRIG}
                numberCard={numberLRIGCard} />
            <MAINPopup isOpen={isPopupMAIN}
                onClose={handleClosePopupMAIN}
                view={false}
                numberCard={numberMAINCard} />
            <ChooseLRIGPopup isOpen={isChoosePopupLRIG}
                onClose={handleCloseChoosePopupLRIG}
                numberCardLRIG={numberLRIGCard}
                type={isTypePopupLRIG}
                numberCardSpace={cardLRIGSpacePlayer}
                setCardSpace={setCardLRIGSpacePlayer}
                setNumberLRIGCard={setNumberLRIGCard}
                cardLevelUp={checkLRIGCardLevelUp}
                setIsSelectedLRIGCard={setIsSelectedLRIGCard} />
            <HandCardPopup isOpen={isPopupHand}
                onClose={handleClosePopupHand}
                numberCard={numberHandCard}
                phase={MainPhase} />
            <ChooseHandPopup isOpen={isChoosePopupHand}
                setIsComplete={setIsCompleteChoosePopupHand}
                onClose={handleCloseChoosePopupHand}
                numberHandCard={numberHandCard}
                numberMAINCard={numberMAINCard}
                numberEnerCard={numberEnerCard}
                numberTrashCard={numberTrashCard}
                setNumberEnerCard={setNumberEnerCard}
                setNumberMAINCard={setNumberMAINCard}
                setNumberHandCard={setNumberHandCard}
                type={isTypePopupChooseHand}
                numberCardSpaceLRIG={cardLRIGSpacePlayer}
                numberCardSpaceMAIN={cardMAINSpacePlayer}
                targetCardSpace={targetSpaceMAINPlayer}
                numberCardUseMAIN={cardUseMAINSpacePlayer}
                setNumberCardUseMAIN={setCardUseMAINSpacePlayer} />
            <EnerCardPopup isOpen={isPopupEner}
                onClose={handleClosePopupEner}
                numberCard={numberEnerCard} />
            <TrashCardPopup isOpen={isPopupTrash}
                onClose={handleClosePopupTrash}
                numberCard={numberTrashCard} />
            <LRIGPopupBot isOpen={isPopupLRIGBot}
                onClose={handleClosePopupLRIGBot}
                numberCard={numberLRIGCardBot} />
            <MAINPopupBot isOpen={isPopupMAINBot}
                onClose={handleClosePopupMAINBot}
                view={false}
                numberCard={numberMAINCardBot} />
            <HandCardPopupBot isOpen={isPopupHandBot}
                onClose={handleClosePopupHandBot}
                numberCard={numberHandCardBot} />
            <EnerCardPopupBot isOpen={isPopupEnerBot}
                onClose={handleClosePopupEnerBot}
                numberCard={numberEnerCardBot} />
            <TrashCardPopupBot isOpen={isPopupTrashBot}
                onClose={handleClosePopupTrashBot}
                numberCard={numberTrashCardBot} />
            <ChooseMAINSpacePopup
                isOpen={isPopupChooseMAINSpace}
                onClose={handleClosePopupChooseMAINSpace}
                numberCardSpaceMAIN={cardMAINSpaceTarget}
                setNumberCardSpaceMAIN={setCardMAINSpaceTarget}
                type={isTypePopupChooseMAINSpace}
                powerCheck={isPowerCheckPopupChooseMAINSpace}
            />
            {selectedCard && <CardDetail card={selectedCard} onClose={() => { setSelectedCard(null) }} />}
        </>
    );
};

export default PlayGround;
