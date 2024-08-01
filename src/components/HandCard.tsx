import React, { useState } from 'react';
import Image from 'next/image';
import { IoMdClose } from "react-icons/io";
import CardDetail from './CardDetail';
import Card from "../types/cardList";
import cardList from './CardDB';

interface HandPopupProps {
    isOpen: boolean;
    onClose: () => void;
    numberCard: number[];
    phase: number;
}

const HandPopup: React.FC<HandPopupProps> = ({ isOpen, onClose, numberCard, phase }) => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [isSelectedSpell, setIsSelectedSpell] = useState<Card | null>(null);

    const handleCardClick = (card: Card) => {
        if (card.cardType !== "SPELL" || phase !== 6) {
            setSelectedCard(card);
        }
        else {
            setIsSelectedSpell(card);
        }
    };

    const handleCloseDetail = () => {
        setSelectedCard(null);
    };

    // Hàm lọc phần tử dựa trên numberCard
    const filterCardsByNumberCard = (cardList: Card[], numberCard: number[]): Card[] => {
        const result: Card[] = [];

        for (const number of numberCard) {
            // Tìm card trong cardList với id khớp với số trong numberCard
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
                            <IoMdClose
                                onClick={onClose}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                            {filterCardsByNumberCard(cardList, numberCard).map((card, index) => (
                                <div key={`${card.id}-${index}`} className="flex flex-col items-center cursor-pointer">
                                    <Image
                                        src={card.imageUrl}
                                        alt={card.name}
                                        width={750}
                                        height={1047}
                                        className="w-full h-auto mb-2"
                                        onClick={() => handleCardClick(card)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {isSelectedSpell &&
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 m-5 rounded-lg shadow-lg text-center relative">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-lg mr-4">Bài Phép</p>
                            <IoMdClose
                                onClick={() => { setIsSelectedSpell(null) }}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <button
                                className="px-4 py-2 my-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { setSelectedCard(isSelectedSpell) }}
                            >
                                Xem Thẻ
                            </button>
                            <button
                                className="px-4 py-2 my-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Kích Hoạt
                            </button>
                        </div>
                    </div>
                </div>
            }
            {selectedCard && <CardDetail card={selectedCard} onClose={handleCloseDetail} />}
        </>
    );
};

export default HandPopup;
