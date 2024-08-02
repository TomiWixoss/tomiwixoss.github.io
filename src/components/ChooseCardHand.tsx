import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoMdClose } from "react-icons/io";
import CardDetail from './CardDetail';
import Card from "../types/cardList";
import cardList from './CardDB';

interface HandPopupProps {
    isOpen: boolean;
    setIsComplete: React.Dispatch<React.SetStateAction<number[]>>;
    onClose: () => void;
    numberHandCard: number[];
    numberMAINCard: number[];
    numberEnerCard: number[];
    numberTrashCard: number[];
    numberCardSpaceLRIG: number[];
    targetCardSpace: number;
    numberCardSpaceMAIN: number[];
    numberCardUseMAIN: Card[];
    setNumberCardUseMAIN: React.Dispatch<React.SetStateAction<Card[]>>;
    setNumberEnerCard: React.Dispatch<React.SetStateAction<number[]>>;
    setNumberMAINCard: React.Dispatch<React.SetStateAction<number[]>>;
    setNumberHandCard: React.Dispatch<React.SetStateAction<number[]>>;
    type: number;
}

const HandPopup: React.FC<HandPopupProps> = ({ isOpen, setIsComplete, onClose, numberHandCard, numberMAINCard, numberEnerCard, numberTrashCard, setNumberEnerCard, setNumberMAINCard, setNumberHandCard, type, numberCardSpaceLRIG, targetCardSpace, numberCardSpaceMAIN, numberCardUseMAIN, setNumberCardUseMAIN }) => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [numberChooseCard, setNumberChooseCard] = useState<number[]>([0, 0, 0, 0, 0]);
    const [checkCardSpaceLRIG, setCheckCardSpaceLRIG] = useState<Card[]>([]);
    const [checkLimitCardMAIN, setCheckLimitCardMAIN] = useState<number>(0);

    useEffect(() => {
        const cardSpaceLRIG: Card[] = [];

        numberCardSpaceLRIG.forEach((value, index) => {
            const card = cardList.find(card => card.id === value);
            if (card) {
                cardSpaceLRIG.push(card);
            }
        });

        setCheckCardSpaceLRIG(cardSpaceLRIG);
    }, [numberCardSpaceLRIG, type]);

    const handleCardClick = (card: Card) => {
        setSelectedCard(card);
    };

    const handleResetCard = () => {
        const MAINCard = [...numberMAINCard];
        const HandCard = [...numberHandCard];
        let countCard: number = 0;
        let handCard: number[] = [];
        numberChooseCard.forEach((value, index) => {
            if (value === 1) {
                MAINCard.push(numberHandCard[index]);
                countCard++;
            }
        });

        HandCard.forEach((value, index) => {
            if (numberChooseCard[index] === 0) {
                handCard.push(HandCard[index]);
            }
        });

        setNumberMAINCard(MAINCard);
        setNumberHandCard(handCard);
        setIsComplete([1, countCard]);
        onClose();
    };

    const handleCloseDetail = () => {
        setSelectedCard(null);
    };

    const removeCardByIndex = (cardList: number[], indexToRemove: number): number[] => {
        return cardList.filter((_, index) => index !== indexToRemove);
    };

    const handleDiscardCard = (card: Card, index: number) => {
        numberTrashCard.push(card.id);
        setNumberHandCard(removeCardByIndex(numberHandCard, index))
        onClose();
    };

    const handleChooseCard = (index: number) => {
        // Tạo một bản sao mới của mảng numberChooseCard
        const updatedChooseCard = [...numberChooseCard];
        // Cập nhật giá trị tại index tương ứng
        updatedChooseCard[index] = 1;
        // Sử dụng hàm setter để cập nhật state
        setNumberChooseCard(updatedChooseCard);
    };

    const handleChooseHandCard = (card: number, type: number, id: number) => {
        if (type === 1) {
            const HandCard = [...numberHandCard];
            const EnerCard = [...numberEnerCard]
            let handCard: number[] = [];

            HandCard.forEach((value, index) => {
                if (index !== card) {
                    handCard.push(HandCard[index]);
                }
                else {
                    EnerCard.push(HandCard[index]);
                }
            });

            setNumberHandCard(handCard);
            setNumberEnerCard(EnerCard);
        }
        if (type === 2) {
            const HandCard = [...numberHandCard];
            const SpaceCard: number[] = [];
            let handCard: number[] = [];

            let found = false; // Biến cờ để kiểm tra xem phần tử có id khớp đã được thêm vào SpaceCard chưa

            HandCard.forEach((value, index) => {
                if (value !== id || found) {
                    // Nếu id không khớp hoặc phần tử đã được tìm thấy, thêm vào handCard
                    handCard.push(value);
                } else {
                    // Nếu id khớp và phần tử chưa được thêm vào SpaceCard
                    SpaceCard.push(value);
                    found = true; // Đánh dấu đã tìm thấy phần tử
                }
            });

            const cardUseMAIN = [...numberCardUseMAIN];
            const foundCard: Card | undefined = cardList.find(card => card.id === SpaceCard[0]);
            if (foundCard !== undefined) {
                cardUseMAIN[targetCardSpace] = foundCard;
            }
            setNumberCardUseMAIN(cardUseMAIN);
            numberCardSpaceMAIN[targetCardSpace] = SpaceCard[0];
            setNumberHandCard(handCard);

            let count: number = 0;
            numberCardSpaceMAIN.forEach((value, index) => {
                count += cardList
                    .filter(card => card.id === value)
                    .reduce((sum, card) => sum + card.cardLevel, 0);
            });
            setCheckLimitCardMAIN(count);
        }
        onClose();
    };

    const handleNoChooseCard = (index: number) => {
        // Tạo một bản sao mới của mảng numberChooseCard
        const updatedChooseCard = [...numberChooseCard];
        // Cập nhật giá trị tại index tương ứng
        updatedChooseCard[index] = 0;
        // Sử dụng hàm setter để cập nhật state
        setNumberChooseCard(updatedChooseCard);
    };

    // Hàm lọc phần tử dựa trên numberHandCard
    const filterCardsBynumberHandCard = (cardList: Card[], numberHandCard: number[]): Card[] => {
        const result: Card[] = [];

        for (const number of numberHandCard) {
            // Tìm card trong cardList với id khớp với số trong numberHandCard
            const matchingCard = cardList.find(card => card.id === number);
            if (matchingCard) {
                result.push(matchingCard); // Thêm card vào mảng kết quả
            }
        }

        return result;
    };

    return (
        <>
            {isOpen && type === 0 && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 m-5 rounded-lg shadow-lg text-center relative overflow-auto max-h-[80vh]">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-lg">Bài Trên Tay</p>
                            {
                                numberChooseCard.some(value => value === 1) ? (
                                    <button className='text-white px-4 text-sm py-1 bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer'
                                        onClick={handleResetCard}
                                    >
                                        Xáo lại
                                    </button>
                                ) : (
                                    <IoMdClose
                                        onClick={() => {
                                            setIsComplete([0, 0]);
                                            onClose();
                                        }}
                                        className="font-bold text-2xl cursor-pointer"
                                    />
                                )
                            }
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                            {filterCardsBynumberHandCard(cardList, numberHandCard).map((card, index) => (
                                <div key={`${card.id}-${index}`} className="flex flex-col items-center cursor-pointer">
                                    <Image
                                        src={card.imageUrl}
                                        alt={card.name}
                                        width={750}
                                        height={1047}
                                        className={`w-full h-auto mb-2 ${numberChooseCard[index] === 1 ? 'border-[3px] rounded-lg border-red-500' : ''}`}
                                        onClick={() => handleCardClick(card)}
                                    />
                                    {numberChooseCard[index] === 0 ? (
                                        <button className={`text-white px-3 text-xs py-1 bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer`}
                                            onClick={() => { handleChooseCard(index) }}
                                        >
                                            Chọn
                                        </button>
                                    ) : (
                                        <button className={`text-white px-3 text-xs py-1 bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer`}
                                            onClick={() => { handleNoChooseCard(index) }}
                                        >
                                            Bỏ Chọn
                                        </button>
                                    )
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {isOpen && (type === 1 || type === 2) && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 m-5 rounded-lg shadow-lg text-center relative overflow-auto max-h-[80vh]">
                        <div className="flex justify-between items-center mb-4">
                            {type === 1 &&
                                <p className="font-bold text-lg">Chọn Bài Cần Nhập</p>
                            }
                            {type === 2 &&
                                <>
                                    <p className="font-bold text-lg">Chọn SIGNI để vào sân</p>
                                    <IoMdClose
                                        onClick={() => {
                                            setIsComplete([0, 0]);
                                            onClose();
                                        }}
                                        className="font-bold text-2xl cursor-pointer"
                                    />
                                </>
                            }
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                            {filterCardsBynumberHandCard(cardList, numberHandCard)
                                .filter(card => (
                                    type === 2 ?
                                        (card.cardType === "SIGNI" || card.cardType === "Guard")
                                        && card.cardLevel <= checkCardSpaceLRIG[1].cardLevel
                                        && checkLimitCardMAIN < checkCardSpaceLRIG[1].cardLimit + checkCardSpaceLRIG[0].cardLimit + checkCardSpaceLRIG[2].cardLimit : true
                                )).map((card, index) => (
                                    <div key={`${card.id}-${index}`} className="flex flex-col items-center cursor-pointer">
                                        <Image
                                            src={card.imageUrl}
                                            alt={card.name}
                                            width={750}
                                            height={1047}
                                            className={`w-full h-auto mb-2`}
                                            onClick={() => handleCardClick(card)}
                                        />
                                        <button className={`text-white px-3 text-xs py-1 bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer`}
                                            onClick={() => { handleChooseHandCard(index, type, card.id) }}
                                        >
                                            Chọn
                                        </button>
                                    </div>
                                ))}
                        </div>
                        {filterCardsBynumberHandCard(cardList, numberHandCard)
                            .filter(card => (
                                type === 2 ?
                                    (card.cardType === "SIGNI" || card.cardType === "Guard")
                                    && card.cardLevel <= checkCardSpaceLRIG[1].cardLevel
                                    && checkLimitCardMAIN < checkCardSpaceLRIG[1].cardLimit + checkCardSpaceLRIG[0].cardLimit + checkCardSpaceLRIG[2].cardLimit : true
                            )).length === 0 && (
                                <div className="text-center font-[500] text-black my-5 mx-5">
                                    Không có thẻ nào phù hợp.
                                </div>
                            )}
                    </div>
                </div>
            )}
            {isOpen && type === 3 && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 m-5 rounded-lg shadow-lg text-center relative overflow-auto max-h-[80vh]">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-lg">Loại Bỏ Bài Trên Tay</p>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                            {filterCardsBynumberHandCard(cardList, numberHandCard).map((card, index) => (
                                <div key={`${card.id}-${index}`} className="flex flex-col items-center cursor-pointer">
                                    <Image
                                        src={card.imageUrl}
                                        alt={card.name}
                                        width={750}
                                        height={1047}
                                        className={`w-full h-auto mb-2`}
                                        onClick={() => handleCardClick(card)}
                                    />
                                    <button className={`text-white px-3 text-xs py-1 bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer`}
                                        onClick={() => {
                                            handleDiscardCard(card, index);
                                        }}
                                    >
                                        Loại
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {selectedCard && <CardDetail card={selectedCard} onClose={handleCloseDetail} />}
        </>
    );
};

export default HandPopup;
