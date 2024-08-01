import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoMdClose } from "react-icons/io";
import CardDetail from './CardDetail';
import Card from "../types/cardList";
import cardList from './CardDB';

interface MAINSpacePopupProps {
    isOpen: boolean;
    onClose: () => void;
    numberCardSpaceMAIN: number[];
    setNumberCardSpaceMAIN: React.Dispatch<React.SetStateAction<number[]>>;
    type: number;
    powerCheck: number;
}

const MAINSpacePopup: React.FC<MAINSpacePopupProps> = ({ isOpen, onClose, numberCardSpaceMAIN, setNumberCardSpaceMAIN, type, powerCheck }) => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    const handleCardClick = (card: Card) => {
        setSelectedCard(card);
    };

    const handleCloseDetail = () => {
        setSelectedCard(null);
    };

    const handleChooseHandCard = () => {

    }

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
                            <p className="font-bold text-lg">Chọn Thẻ</p>
                            <IoMdClose
                                onClick={() => {
                                    onClose();
                                }}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                            {filterCardsBynumberHandCard(cardList, numberCardSpaceMAIN)
                                .filter(card => (
                                    type === 1 ? card.id !== -1 && card.cardPower <= powerCheck : true
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
                                            onClick={() => { handleChooseHandCard() }}
                                        >
                                            Chọn
                                        </button>
                                    </div>
                                ))}
                        </div>
                        {filterCardsBynumberHandCard(cardList, numberCardSpaceMAIN)
                            .filter(card => (
                                type === 1 ? card.id !== -1 && card.cardPower <= powerCheck : true
                            )).length === 0 && (
                                <div className="text-center font-[500] text-black my-5 mx-5">
                                    Không có thẻ nào phù hợp.
                                </div>
                            )}
                    </div>
                </div>
            )}
            {selectedCard && <CardDetail card={selectedCard} onClose={handleCloseDetail} />}
        </>
    );
};

export default MAINSpacePopup;
