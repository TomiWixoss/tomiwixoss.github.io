import React, { useState } from 'react';
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
    setNumberMAINCard: React.Dispatch<React.SetStateAction<number[]>>;
    setNumberHandCard: React.Dispatch<React.SetStateAction<number[]>>;
}

const HandPopup: React.FC<HandPopupProps> = ({ isOpen, setIsComplete, onClose, numberHandCard, numberMAINCard, setNumberMAINCard, setNumberHandCard }) => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [resetCard, setResetCard] = useState<number[]>([]);
    const [numberChooseCard, setNumberChooseCard] = useState<number[]>([0, 0, 0, 0, 0]);

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

    const handleChooseCard = (index: number) => {
        // Tạo một bản sao mới của mảng numberChooseCard
        const updatedChooseCard = [...numberChooseCard];
        // Cập nhật giá trị tại index tương ứng
        updatedChooseCard[index] = 1;
        // Sử dụng hàm setter để cập nhật state
        setNumberChooseCard(updatedChooseCard);
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
            {isOpen && (
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
                                        onClick={onClose}
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
            {selectedCard && <CardDetail card={selectedCard} onClose={handleCloseDetail} />}
        </>
    );
};

export default HandPopup;
