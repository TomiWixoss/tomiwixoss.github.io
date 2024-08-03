// components/CardDetail.tsx
import React from 'react';
import Image from 'next/image';
import Card from "../types/cardList";

interface CardDetailProps {
    card: Card | null;
    onClose: () => void;
}

const CardDetail: React.FC<CardDetailProps> = ({ card, onClose }) => {
    if (!card) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-3 m-2 rounded-lg shadow-lg text-center relative max-w-lg">
                <Image
                    src={card.imageUrl}
                    alt={card.name}
                    width={750}
                    height={1047}
                    className='cursor-pointer pb-2'
                    onClick={onClose} />
                <div className='px-2 max-h-[25vh] overflow-auto'>
                    {card.cardText !== "" && (
                        <p className='font-[500] text-center'>Hiệu Ứng Bài: {card.cardText}</p>
                    )}
                    {card.cardBurst !== "" && (
                        <p className='mt-2 font-[500] text-center'>Hiệu Ứng Bùng Nổ: {card.cardBurst}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardDetail;
