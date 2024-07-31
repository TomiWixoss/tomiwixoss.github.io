import React, { useState } from 'react';
import Image from 'next/image';
import { IoMdClose } from "react-icons/io";
import CardDetail from './CardDetail';
import Card from "../types/cardList";
import cardList from './CardDB';

interface MAINPopupProps {
    isOpen: boolean;
    onClose: () => void;
    view: boolean;
    numberCard: number;
}

const MAINPopup: React.FC<MAINPopupProps> = ({ isOpen, onClose, view, numberCard }) => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [numberMAIN, setNumberMAIN] = useState(Array.from({ length: numberCard }, (_, index) => index));

    const handleCardClick = (card: Card) => {
        setSelectedCard(card);
    };

    const handleCloseDetail = () => {
        setSelectedCard(null);
    };

    return (
        <>
            {/* {isOpen && view && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 m-5 rounded-lg shadow-lg text-center relative overflow-auto max-h-[80vh]">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-lg">Bộ Bài Chính</p>
                            <IoMdClose
                                onClick={onClose}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                            {cardList.flatMap(card =>
                                Array.from({ length: card.count }).map((_, index) => (
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
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )} */}
            {isOpen && !view && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 m-5 rounded-lg shadow-lg text-center relative overflow-auto max-h-[80vh]">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-lg">Bộ Bài Chính ({numberCard})</p>
                            <IoMdClose
                                onClick={onClose}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                            {numberMAIN.map(index =>
                                <div key={`${index}`} className="flex flex-col items-center cursor-pointer">
                                    <Image
                                        src={'/backside/MAIN.jpg'}
                                        alt={'backside'}
                                        width={750}
                                        height={1047}
                                        className="w-full h-auto mb-2"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {selectedCard && <CardDetail card={selectedCard} onClose={handleCloseDetail} />}
        </>
    );
};

export default MAINPopup;
