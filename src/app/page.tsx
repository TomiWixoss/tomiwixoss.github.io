import React from 'react';

const TomiWixoss: React.FC = () => {
  return (
    <div className='bg-black'>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-4xl font-bold text-white mb-4">TomiWixoss</h1>
        <p className="text-lg text-gray-400 mb-6">Phiên bản PreView0.1</p>
        <button className="px-6 py-2 text-white rounded-lg bg-blue-500 rounded hover:bg-blue-600 focus:outline-none">
          Chơi Thử!
        </button>
      </div>
    </div>
  );
};

export default TomiWixoss;
