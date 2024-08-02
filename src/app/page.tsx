'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const TomiWixoss: React.FC = () => {
  const router = useRouter();

  return (
    <div className='bg-black min-h-screen flex items-center justify-center'>
      <div className="text-center p-4">
        <h1 className="text-4xl font-bold text-white mb-4">TomiWixoss</h1>
        <p className="text-lg text-gray-400 mb-6">Phiên bản PreView0.1</p>
        <button
          onClick={() => { router.push('/wixoss') }}
          className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Chế Độ Tự Động(Đang Phát Triển...)
        </button>
        <button
          onClick={() => { router.push('/play') }}
          className="px-6 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Chế Độ Tự Chơi
        </button>
      </div>
    </div>
  );
};

export default TomiWixoss;
