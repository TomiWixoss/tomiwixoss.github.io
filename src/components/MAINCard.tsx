import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoMdClose } from "react-icons/io";
import CardDetail from './CardDetail';
import Card from "../types/cardList";
import cardList from './CardDB';

interface MAINPopupProps {
    isOpen: boolean;
    onClose: () => void;
    numberCardMAIN: number[];
    setNumberCardMAIN: React.Dispatch<React.SetStateAction<number[]>>;
    numberCardHand: number[];
    setNumberCardHand: React.Dispatch<React.SetStateAction<number[]>>;
    numberEnerCard: number[];
    setNumberEnerCard: React.Dispatch<React.SetStateAction<number[]>>;
    numberTrashCard: number[];
    setNumberTrashCard: React.Dispatch<React.SetStateAction<number[]>>;
    numberLifeCard: number[];
    setNumberLifeCard: React.Dispatch<React.SetStateAction<number[]>>;
}

const MAINPopup: React.FC<MAINPopupProps> = ({ isOpen, onClose, numberCardMAIN, setNumberCardMAIN, numberCardHand, setNumberCardHand, numberEnerCard, setNumberEnerCard, numberTrashCard, setNumberTrashCard, numberLifeCard, setNumberLifeCard }) => {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [isPopupAction, setPopupAction] = useState(false);
    const [isPopupRefresh, setPopupRefresh] = useState(false);

    useEffect(() => {
        if (isOpen === true) {
            if (numberCardMAIN.length === 0) {
                setPopupRefresh(true);
            }
        }
    }, [numberCardMAIN, isOpen]);

    // Hàm xáo trộn mảng
    const shuffleArray = (array: number[]) => {
        let shuffledArray = array.slice(); // Tạo bản sao của mảng
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Hoán đổi các phần tử
        }
        return shuffledArray;
    };

    const handleCardClick = () => {
        setPopupAction(true);
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
                            <p className="font-bold text-lg">Bộ Bài Chính ({numberCardMAIN.length})</p>
                            <IoMdClose
                                onClick={onClose}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                            {numberCardMAIN.map((index) => {
                                // Sinh ra giá trị ngẫu nhiên, ví dụ từ 1 đến ...
                                const randomValue = Math.floor(Math.random() * 999999999) + 1;
                                return (
                                    <div key={`${index}-${randomValue}`} className="flex flex-col items-center cursor-pointer">
                                        <Image
                                            src={'/backside/MAIN.jpg'}
                                            alt={'backside'}
                                            width={750}
                                            height={1047}
                                            className="w-full h-auto mb-2"
                                            onClick={handleCardClick}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
            {isPopupAction && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 mx-5 rounded-lg shadow-lg text-center">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-xl mr-4">Hành Động</p>
                            <IoMdClose
                                onClick={() => { setPopupAction(false) }}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => {
                                    const cardMAIN = [...numberCardMAIN];
                                    const cardHand = [...numberCardHand];
                                    const cardPut = cardMAIN.shift();
                                    if (cardPut) cardHand.push(cardPut);
                                    setNumberCardHand(cardHand);
                                    setNumberCardMAIN(cardMAIN);
                                    setPopupAction(false);
                                }}
                            >
                                Rút Bài
                            </button>
                            <button
                                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => {
                                    const cardMAIN = [...numberCardMAIN];
                                    const shuffleArrayMAIN = shuffleArray(cardMAIN);
                                    setNumberCardMAIN(shuffleArrayMAIN);
                                    setPopupAction(false);
                                }}
                            >
                                Xáo Bài
                            </button>
                            <button
                                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => {
                                    const cardMAIN = [...numberCardMAIN];
                                    const cardEner = [...numberEnerCard];
                                    const cardPut = cardMAIN.shift();
                                    if (cardPut) cardEner.push(cardPut);
                                    setNumberEnerCard(cardEner);
                                    setNumberCardMAIN(cardMAIN);
                                    setPopupAction(false);
                                }}
                            >
                                Nhập Bài
                            </button>
                            <button
                                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => {
                                    const cardMAIN = [...numberCardMAIN];
                                    const cardTrash = [...numberTrashCard];
                                    const cardPut = cardMAIN.shift();
                                    if (cardPut) cardTrash.push(cardPut);
                                    setNumberTrashCard(cardTrash);
                                    setNumberCardMAIN(cardMAIN);
                                    setPopupAction(false);
                                }}
                            >
                                Bỏ Bài
                            </button>
                            <button
                                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => {
                                    const cardMAIN = [...numberCardMAIN];
                                    const cardLife = [...numberLifeCard];
                                    const cardPut = cardMAIN.shift();
                                    if (cardPut) cardLife.push(cardPut);
                                    setNumberLifeCard(cardLife);
                                    setNumberCardMAIN(cardMAIN);
                                    setPopupAction(false);
                                }}
                            >
                                Life Cloth
                            </button>
                        </div>
                    </div>
                </div >
            )}
            {isPopupRefresh && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 mx-5 rounded-lg shadow-lg text-center">
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-xl mr-4">Làm Mới</p>
                            <IoMdClose
                                onClick={() => { setPopupRefresh(false) }}
                                className="font-bold text-2xl cursor-pointer"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => {
                                    let cardMAIN = [...numberCardMAIN];
                                    let cardTrash = [...numberTrashCard];

                                    cardTrash.forEach(value => {
                                        const card = cardList.find(card => card.id === value);
                                        if (card) {
                                            cardMAIN.push(card.id);
                                        }
                                    });

                                    setNumberTrashCard([]);
                                    setNumberCardMAIN(cardMAIN);
                                    setPopupRefresh(false);
                                }}
                            >
                                Làm Mới Bộ Bài Chính
                            </button>
                        </div>
                    </div>
                </div >
            )}
            {selectedCard && <CardDetail card={selectedCard} onClose={handleCloseDetail} />}
        </>
    );
};

export default MAINPopup;
