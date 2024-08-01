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
import cardList from '../../components/CardDB';
import CardDetail from '../../components/CardDetail';
import Card from "../../types/cardList";
import { IoMdClose } from "react-icons/io";

const PlayGround: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [isPopupAction, setPopupAction] = useState(true);
    const [startPhase, setStartPhase] = useState<number>(0);
    const [MainPhase, setMainPhase] = useState<number>(0);
    const [isPopupLRIG, setIsPopupLRIG] = useState(false);
    const [isPopupEner, setIsPopupEner] = useState(false);
    const [isPopupMAIN, setIsPopupMAIN] = useState(false);
    const [isChoosePopupLRIG, setIsChoosePopupLRIG] = useState(false);
    const [isPopupHand, setIsPopupHand] = useState(false);
    const [isChoosePopupHand, setIsChoosePopupHand] = useState(false);
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
    const [cardLRIGSpacePlayer, setCardLRIGSpacePlayer] = useState([0, 0, 0]);
    const [cardLRIGSpaceTarget, setCardLRIGSpaceTarget] = useState([0, 0, 0]);
    const [cardMAINSpacePlayer, setCardMAINSpacePlayer] = useState([-1, -1, -1]);
    const [cardMAINSpaceTarget, setCardMAINSpaceTarget] = useState([-1, -1, -1]);
    const [targetSpaceMAINPlayer, setTargetSpaceMAINPlayer] = useState(0);
    const [isSelectedLRIGCard, setIsSelectedLRIGCard] = useState<Card | null>(null);

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

    const handleChooseSIGNICard = (index: number, id: number, card: Card) => {
        if (id === -1) {
            setTargetSpaceMAINPlayer(index);
            setIsTypePopupChooseHand(2);
            setIsChoosePopupHand(true);
        } else {
            if (card.cardEffect.includes("Action") === false) {
                setSelectedCard(card);
            }
        }
    };

    const handleChooseLRIGCard = (card: Card) => {
        const cardSpaceLRIG: Card[] = [];

        cardLRIGSpacePlayer.forEach((value, index) => {
            const card = cardList.find(card => card.id === value);
            if (card) {
                cardSpaceLRIG.push(card);
            }
        });
        if (card.cardLevel < cardSpaceLRIG[1].cardLevel || card.cardEffect.includes("Action") === true) {
            handleLRIGCardClick(card);
        }
        else {
            setSelectedCard(card);
        }
    };

    const handlePopup = () => {
        setStartPhase(prev => prev + 1);
        switch (startPhase) {
            case 1:
                setIsChoosePopupLRIG(true);
                setIsTypePopupLRIG(2);
                break;
            case 2:
                setIsChoosePopupLRIG(true);
                setIsTypePopupLRIG(1);
                break;
            case 3:
                setIsChoosePopupLRIG(true);
                setIsTypePopupLRIG(3);
                break;
            case 4:
                setIsPopupHand(true);
                handleArrayUpdate();
                break;
            case 5:
                setIsChoosePopupHand(true);
                break;
            case 6:
                setIsPopupHand(true);
                break;
            case 7:
                setNumberLifeCard(numberMAINCard.splice(0, 7));
                break;
        }
    };

    const handleMainPopup = () => {
        setMainPhase(prev => prev + 1);
        switch (MainPhase) {
            case 1:

                break;
            case 2:
                const pushCard: number[] = numberMAINCard.splice(0, 1);
                numberHandCard.push(pushCard[0]);
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
            setMainPhase(1);
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
                            <p className='text-white font-bold text-xs my-5 text-center mx-5'>Giai Đoạn Phát Triển</p>
                        }
                        {MainPhase === 5 &&
                            <p className='text-white font-bold text-xs my-5 text-center mx-5'>Giai Đoạn Chính</p>
                        }
                        {MainPhase === 6 &&
                            <p className='text-white font-bold text-xs my-5 text-center mx-5'>Giai Đoạn Chính</p>
                        }
                        <button
                            className="px-2 py-1 text-xs text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                            onClick={handleOpenPopupHand}
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
                                        className={`w-[20%] h-auto cursor-pointer ${index === 1 ? 'mx-12' : ''}`}
                                        onClick={() => { handleChooseSIGNICard(index, card.id, card) }}
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
                                        className={`w-[20%] h-auto cursor-pointer ${index === 1 ? 'mx-12' : ''}`}
                                        onClick={() => { handleChooseLRIGCard(card) }}
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
                                <button
                                    onClick={handlePopup}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Đi Lượt Đầu
                                </button>
                            </>
                        }
                        {MainPhase === 1 &&
                            <>
                                <p className="text-xl mb-4 font-bold">Giai đoạn mở</p>
                                <p className="text-md mb-4 font-bold">Giai đoạn chuyển các lá bài từ thế ngang sang dọc, do đi lượt đầu nên chưa có lá bài nào cần chuyển.</p>
                                <button
                                    onClick={handleMainPopup}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Tiếp Tục
                                </button>
                            </>
                        }
                        {MainPhase === 2 &&
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
                            >
                                Phát Triển
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
                setNumberLRIGCard={setNumberLRIGCard} />
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
                setNumberEnerCard={setNumberEnerCard}
                setNumberMAINCard={setNumberMAINCard}
                setNumberHandCard={setNumberHandCard}
                type={isTypePopupChooseHand}
                numberCardSpaceLRIG={cardLRIGSpacePlayer}
                numberCardSpaceMAIN={cardMAINSpacePlayer}
                targetCardSpace={targetSpaceMAINPlayer} />
            <EnerCardPopup isOpen={isPopupEner}
                onClose={handleClosePopupEner}
                numberCard={numberEnerCard} />
            {selectedCard && <CardDetail card={selectedCard} onClose={() => { setSelectedCard(null) }} />}
        </>
    );
};

export default PlayGround;
