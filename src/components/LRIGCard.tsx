// components/LRIGPopup.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { IoMdClose } from "react-icons/io";
import CardDetail from './CardDetail';
import Card from "../types/cardList";
import cardList from './CardDB';

interface LRIGPopupProps {
    isOpen: boolean;
    onClose: () => void;
    numberCard: number[];
}

const LRIGPopup: React.FC<LRIGPopupProps> = ({ isOpen, onClose, numberCard }) => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [isSelectedPIECE, setIsSelectedPIECE] = useState<Card | null>(null);

    const handleCardClick = (card: Card) => {
        if (card.cardType !== "PIECE") {
            setSelectedCard(card);
        }
        else {
            setIsSelectedPIECE(card);
        }
    };

    const handleCloseDetail = () => {
        setSelectedCard(null);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 m-5 rounded-lg shadow-lg text-center relative overflow-auto max-h-[80vh]">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-lg">Bộ Bài LRIG ({numberCard.length})</p>
                            <IoMdClose
                                onClick={onClose}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                            {cardList
                                .filter(card => numberCard.includes(card.id)) // Lọc các card có id trùng với giá trị trong numberMain
                                .map(card => (
                                    <div
                                        key={card.id}
                                        className="flex flex-col items-center cursor-pointer"
                                        onClick={() => handleCardClick(card)}
                                    >
                                        <Image
                                            src={card.imageUrl}
                                            alt={card.name}
                                            width={750}
                                            height={1047}
                                            className="w-full h-auto mb-2"
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div >
            )}
            {isSelectedPIECE &&
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 m-5 rounded-lg shadow-lg text-center relative">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-lg mr-4">Bài PIECE</p>
                            <IoMdClose
                                onClick={() => { setIsSelectedPIECE(null) }}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <button
                                className="px-4 py-2 my-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => { setSelectedCard(isSelectedPIECE) }}
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

export default LRIGPopup;
