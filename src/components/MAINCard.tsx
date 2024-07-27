import React from 'react';
import Image from 'next/image';
import { IoMdClose } from "react-icons/io";

interface Card {
    id: number;
    name: string;
    imageUrl: string;
    count: number;
}

const cardList: Card[] = [
    { id: 12, name: 'WXDi-D01-001[EN]', imageUrl: '/WXDi-D01/MAIN/WXDi-D01-012[EN].jpg', count: 4 },
    { id: 13, name: 'WXDi-D01-002[EN]', imageUrl: '/WXDi-D01/MAIN/WXDi-D01-013[EN].jpg', count: 4 },
    { id: 14, name: 'WXDi-D01-003[EN]', imageUrl: '/WXDi-D01/MAIN/WXDi-D01-014[EN].jpg', count: 4 },
    { id: 15, name: 'WXDi-D01-004[EN]', imageUrl: '/WXDi-D01/MAIN/WXDi-D01-015[EN].jpg', count: 4 },
    { id: 16, name: 'WXDi-D01-005[EN]', imageUrl: '/WXDi-D01/MAIN/WXDi-D01-016[EN].jpg', count: 4 },
    { id: 17, name: 'WXDi-D01-006[EN]', imageUrl: '/WXDi-D01/MAIN/WXDi-D01-017[EN].jpg', count: 4 },
    { id: 18, name: 'WXDi-D01-007[EN]', imageUrl: '/WXDi-D01/MAIN/WXDi-D01-018[EN].jpg', count: 4 },
    { id: 19, name: 'WXDi-D01-008[EN]', imageUrl: '/WXDi-D01/MAIN/WXDi-D01-019[EN].jpg', count: 4 },
    { id: 20, name: 'WXDi-D01-009[EN]', imageUrl: '/WXDi-D01/MAIN/WXDi-D01-020[EN].jpg', count: 4 },
    { id: 21, name: 'WXDi-D01-010[EN]', imageUrl: '/WXDi-D01/MAIN/WXDi-D01-021[EN].jpg', count: 4 },
];


interface MAINPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const MAINPopup: React.FC<MAINPopupProps> = ({ isOpen, onClose }) => {
    return (
        <>
            {isOpen && (
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
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MAINPopup;
