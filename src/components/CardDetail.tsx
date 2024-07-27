// components/CardDetail.tsx
import React from 'react';
import Image from 'next/image';

interface CardDetailProps {
    card: {
        id: number;
        name: string;
        imageUrl: string
    } | null;
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
                    className='cursor-pointer'
                    onClick={onClose} />
            </div>
        </div>
    );
};

export default CardDetail;
