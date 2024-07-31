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
}

const LRIGPopup: React.FC<LRIGPopupProps> = ({ isOpen, onClose }) => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    const handleCardClick = (card: Card) => {
        setSelectedCard(card);
    };

    const handleChooseCard = (card: Card) => {

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
                            <p className="font-bold text-lg">Bộ Bài LRIG</p>
                            <IoMdClose
                                onClick={onClose}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                            {cardList.map(card => (
                                <div
                                    key={card.id}
                                    className="flex flex-col items-center"
                                >
                                    <Image
                                        src={card.imageUrl}
                                        alt={card.name}
                                        width={750}
                                        height={1047}
                                        className="w-full h-auto mb-2 cursor-pointer"
                                        onClick={() => handleCardClick(card)}
                                    />
                                    <button className='px-3 text-xs py-1 text-white bg-blue-500 rounded-lg cursor-pointer'
                                        onClick={() => handleChooseCard(card)}
                                    >
                                        Chọn
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    {selectedCard && <CardDetail card={selectedCard} onClose={handleCloseDetail} />}
                </div>
            )}
        </>
    );
};

export default LRIGPopup;
