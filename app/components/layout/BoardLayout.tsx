import React from 'react';
import Link from 'next/link';

interface BoardLayoutProps {
  children: React.ReactNode;
  boardName: string;
}

export default function BoardLayout({ children, boardName }: BoardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 배너 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">BOARD</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-500 hover:text-gray-700">
                로그인
              </Link>
              <Link href="/register" className="text-gray-500 hover:text-gray-700">
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 게시판 헤더 */}
      <div className="bg-white shadow-md mt-1">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">{boardName}</h1>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* 푸터 */}
      <footer className="bg-white mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 pt-6">
            <p className="text-center text-sm text-gray-500">
              © 2024 Board Service. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 