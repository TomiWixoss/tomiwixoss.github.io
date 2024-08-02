// components/LRIGPopup.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { IoMdClose } from "react-icons/io";
import CardDetail from '../../components/CardDetail';
import Card from "../../types/cardList";
import cardList from '../../components/CardDB';

interface LRIGPopupProps {
    isOpen: boolean;
    onClose: () => void;
    numberCard: number[];
    type: number;
    LRIGSpace: number[];
    setNumberCard: React.Dispatch<React.SetStateAction<number[]>>;
    position: number;
}

const LRIGPopup: React.FC<LRIGPopupProps> = ({ isOpen, onClose, numberCard, type, LRIGSpace, setNumberCard, position }) => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    const removeCardById = (cardList: number[], idToRemove: number) => {
        return cardList.map(card => ({ id: card } as { id: number }))
            .filter(card => card.id !== idToRemove)
            .map(card => card.id);
    };

    const handleCardClick = (card: Card) => {
        if (type === 1) {
            LRIGSpace[position] = card.id;
            setNumberCard(removeCardById(numberCard, card.id));
            onClose();
        }
        else {
            setSelectedCard(card);
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
            {selectedCard && <CardDetail card={selectedCard} onClose={handleCloseDetail} />}
        </>
    );
};

export default LRIGPopup;
