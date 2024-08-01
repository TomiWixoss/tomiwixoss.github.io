import React, { useState } from 'react';
import Image from 'next/image';
import { IoMdClose } from "react-icons/io";
import CardDetail from './CardDetail';
import Card from "../types/cardList";

interface HandPopupProps {
    isOpen: boolean;
    onClose: () => void;
    numberCard: number[];
}

const HandPopup: React.FC<HandPopupProps> = ({ isOpen, onClose, numberCard }) => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    const handleCloseDetail = () => {
        setSelectedCard(null);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 m-5 rounded-lg shadow-lg text-center relative overflow-auto max-h-[80vh]">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-lg">Bài Trên Tay Đối Thủ</p>
                            <IoMdClose
                                onClick={onClose}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                            {numberCard.map(index =>
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

export default HandPopup;
