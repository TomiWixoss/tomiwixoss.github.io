// components/LRIGPopup.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { IoMdClose } from "react-icons/io";
import CardDetail from './CardDetail';

interface Card {
    id: number;
    name: string;
    imageUrl: string;
}

const cardList: Card[] = [
    {
        id: 1,
        name: 'WXDi-D01-001[EN]',
        imageUrl: '/WXDi-D01/LRIG/WXDi-D01-001[EN].jpg'
    },
    {
        id: 2,
        name: 'WXDi-D01-002[EN]',
        imageUrl: '/WXDi-D01/LRIG/WXDi-D01-002[EN].jpg'
    },
    {
        id: 3,
        name: 'WXDi-D01-003[EN]',
        imageUrl: '/WXDi-D01/LRIG/WXDi-D01-003[EN].jpg',
    },
    {
        id: 4,
        name: 'WXDi-D01-004[EN]',
        imageUrl: '/WXDi-D01/LRIG/WXDi-D01-004[EN].jpg',
    },
    {
        id: 5,
        name: 'WXDi-D01-005[EN]',
        imageUrl: '/WXDi-D01/LRIG/WXDi-D01-005[EN].jpg',
    },
    {
        id: 6,
        name: 'WXDi-D01-006[EN]',
        imageUrl: '/WXDi-D01/LRIG/WXDi-D01-006[EN].jpg',
    },
    {
        id: 7,
        name: 'WXDi-D01-007[EN]',
        imageUrl: '/WXDi-D01/LRIG/WXDi-D01-007[EN].jpg',
    },
    {
        id: 8,
        name: 'WXDi-D01-008[EN]',
        imageUrl: '/WXDi-D01/LRIG/WXDi-D01-008[EN].jpg',
    },
    {
        id: 9,
        name: 'WXDi-D01-009[EN]',
        imageUrl: '/WXDi-D01/LRIG/WXDi-D01-009[EN].jpg',
    },
    {
        id: 10,
        name: 'WXDi-D01-010[EN]',
        imageUrl: '/WXDi-D01/LRIG/WXDi-D01-010[EN].jpg',
    },
    {
        id: 11,
        name: 'WXDi-D01-011[EN]',
        imageUrl: '/WXDi-D01/LRIG/WXDi-D01-011[EN].jpg',
    },
];

interface LRIGPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const LRIGPopup: React.FC<LRIGPopupProps> = ({ isOpen, onClose }) => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    const handleCardClick = (card: Card) => {
        setSelectedCard(card);
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
                    {selectedCard && <CardDetail card={selectedCard} onClose={handleCloseDetail} />}
                </div>
            )}
        </>
    );
};

export default LRIGPopup;
