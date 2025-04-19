import React from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const handleSocialLogin = async (provider: 'google' | 'kakao') => {
    try {
      await signIn(provider, { callbackUrl: '/' });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-800 to-teal-950">
      <div className="max-w-[1200px] w-full m-4 flex bg-white rounded-[32px] overflow-hidden shadow-2xl">
        {/* 왼쪽 로그인 섹션 */}
        <div className="w-1/2 p-12 flex flex-col">
          {/* 로고 및 타이틀 */}
          <div className="mb-16">
            <h1 className="text-3xl font-gothic font-thin mb-2">codeBCMS</h1>
            <p className="text-gray-600 text-sm font-gothic">codeB 관리자 시스템</p>
          </div>

          {/* 로그인/회원가입 버튼 */}
          <div className="flex gap-4 mb-12">
            <button className="px-8 py-3 bg-black text-white rounded-full text-sm font-gothic">
              회원가입
            </button>
            <button className="px-8 py-3 border border-gray-300 rounded-full text-sm font-gothic">
              로그인
            </button>
          </div>

          {/* Begin Your Adventure 섹션 */}
          <div className="mb-8">
            <h2 className="text-2xl font-gothic font-bold mb-4">관리자 시스템 시작하기</h2>
            <p className="text-gray-600 text-sm mb-6 font-gothic">소셜 계정으로 간편하게 시작하세요</p>
          </div>

          {/* 소셜 로그인 버튼 */}
          <div className="space-y-4">
            <button
              onClick={() => handleSocialLogin('google')}
              className="w-full flex items-center justify-center px-6 py-3 border border-gray-200 rounded-full text-sm font-gothic hover:bg-gray-50 transition-colors"
            >
              <Image
                src="/icons/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="mr-3"
              />
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialLogin('kakao')}
              className="w-full flex items-center justify-center px-6 py-3 border border-gray-200 rounded-full text-sm font-gothic hover:bg-gray-50 transition-colors"
            >
              <Image
                src="/icons/kakao.svg"
                alt="Kakao"
                width={20}
                height={20}
                className="mr-3"
              />
              Continue with Kakao
            </button>
          </div>
        </div>

        {/* 오른쪽 이미지 섹션 */}
        <div className="w-1/2 relative">
          <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg max-w-xs z-10">
            <div className="flex items-start gap-2 mb-2">
              <h3 className="text-lg font-gothic font-bold">효율적인 관리 시스템!</h3>
              <span className="text-red-500">❤️</span>
            </div>
            <p className="text-sm text-gray-600 font-gothic">
              편리하고 직관적인 인터페이스로 데이터를 쉽게 관리하세요.
            </p>
            <div className="mt-2">
              <span className="text-sm text-gray-400">→</span>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-blue-600">
            {/* 임시로 이미지 대신 그라데이션 배경 사용 */}
          </div>
          
          <div className="absolute bottom-8 right-8 text-right text-white z-10">
            <h3 className="text-2xl font-gothic font-bold mb-2">
              스마트한 관리,<br />
              더 나은 비즈니스!
            </h3>
            <button className="mt-4 px-6 py-2 bg-white text-black rounded-full text-sm font-gothic">
              지금 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 