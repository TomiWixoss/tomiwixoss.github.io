// components/CardDetail.tsx
import React from 'react';
import Image from 'next/image';
import { IoMdClose } from "react-icons/io";

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
                <div className="flex justify-between items-center mb-4">
                    <p className="font-bold text-lg">Thông Tin Thẻ</p>
                    <IoMdClose
                        onClick={onClose}
                        className="font-bold text-2xl cursor-pointer"
                    />
                </div>
                <Image src={card.imageUrl} alt={card.name} width={750} height={1047} />
                <div className="mt-4 overflow-y-auto max-h-[20vh]">
                    <div className="text-left">
                        <p>Tên: {card.name}</p>
                        <p>Loại: LRIG</p>
                        <p>Màu: LRIG</p>
                        <p>Cấp: LRIG</p>
                        <p>Phí Tăng Cấp: LRIG</p>
                        <p>Giới Hạn: LRIG</p>
                        <p>Loại LRIG: LRIG</p>
                        <p>Tên Nhóm: LRIG</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDetail;
