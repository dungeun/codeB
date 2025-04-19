import React from 'react';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-gothic font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl font-gothic text-gray-600 mb-8">
          페이지를 찾을 수 없습니다
        </p>
        <Link 
          href="/"
          className="inline-block px-6 py-3 bg-teal-600 text-white rounded-full font-gothic hover:bg-teal-700 transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
} 