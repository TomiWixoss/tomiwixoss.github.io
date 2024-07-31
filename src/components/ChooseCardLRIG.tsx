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
    type: number;
    setCardSpace: React.Dispatch<React.SetStateAction<number[]>>;
    setNumberLRIGCard: React.Dispatch<React.SetStateAction<number[]>>;
}

const LRIGPopup: React.FC<LRIGPopupProps> = ({ isOpen, onClose, numberCard, type, setCardSpace, setNumberLRIGCard }) => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [cardIsChoose, setCardIsChoose] = useState<number[]>([0, 0, 0]);

    const handleCardClick = (card: Card) => {
        setSelectedCard(card);
    };

    const removeCardById = (cardList: number[], idToRemove: number) => {
        return cardList.map(card => ({ id: card } as { id: number }))
            .filter(card => card.id !== idToRemove)
            .map(card => card.id);
    };

    const handleChooseCard = (card: Card) => {
        cardIsChoose[type - 1] = card.id;
        setCardSpace(cardIsChoose);
        setNumberLRIGCard(removeCardById(numberCard, card.id));
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
                            {type === 0 &&
                                <div>
                                    <p className="font-bold text-lg">
                                        Bộ Bài LRIG ({numberCard.length})
                                    </p>
                                    <IoMdClose
                                        onClick={onClose}
                                        className="font-bold text-2xl cursor-pointer"
                                    />
                                </div>
                            }
                            {type === 2 &&
                                <p className="font-bold text-lg">
                                    Chọn LRIG Chính
                                </p>
                            }
                            {type === 1 &&
                                <p className="font-bold text-lg">
                                    Chọn LRIG hỗ trợ trái
                                </p>
                            }
                            {type === 3 &&
                                <p className="font-bold text-lg">
                                    Chọn LRIG hỗ trợ phải
                                </p>
                            }
                        </div>
                        <div className={`mt-4 max-h-[60vh] overflow-y-auto ${type <= 3 ? 'flex justify-center items-center' : 'grid gap-4 grid-cols-3'}`}>
                            {cardList
                                .filter(card => numberCard.includes(card.id) && // Lọc các card có id trùng với giá trị trong numberCard
                                    (type === 2 ? card.cardLevel === 0 && card.isLRIGCenter === true
                                        : type === 1 ? card.cardLevel === 0 && card.isLRIGSupport === true
                                            : type === 3 ? card.cardLevel === 0 && card.isLRIGSupport === true : true
                                    )) // Thêm điều kiện phụ thuộc vào giá trị type
                                .map(card => (
                                    <div
                                        key={card.id}
                                        className="flex flex-col items-center"
                                    >
                                        <Image
                                            src={card.imageUrl}
                                            alt={card.name}
                                            width={750}
                                            height={1047}
                                            className={`h-auto mb-2 cursor-pointer ${type <= 3 ? 'w-[75%]' : 'w-full'}`}
                                            onClick={() => handleCardClick(card)}
                                        />
                                        <button className={`text-white bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer ${type <= 3 ? 'px-4 text-md py-2' : 'px-3 text-xs py-1'}`}
                                            onClick={() => { handleChooseCard(card); onClose(); }}
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
