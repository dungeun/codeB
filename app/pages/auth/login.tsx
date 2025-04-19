import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-800 to-teal-950">
      <div className="max-w-[1200px] w-full m-4 flex bg-white rounded-[32px] overflow-hidden shadow-2xl">
        {/* 왼쪽 로그인 섹션 */}
        <div className="w-1/2 p-12 flex flex-col">
          {/* 로고 및 타이틀 */}
          <div className="mb-16">
            <h1 className="text-3xl font-serif mb-2">Travel Voyanix</h1>
            <p className="text-gray-600 text-sm">Explore More. Experience Life.</p>
          </div>

          {/* 로그인/회원가입 버튼 */}
          <div className="flex gap-4 mb-12">
            <button 
              onClick={handleLogin}
              className="px-8 py-3 bg-black text-white rounded-full text-sm font-medium"
            >
              Sign Up
            </button>
            <button 
              onClick={handleLogin}
              className="px-8 py-3 border border-gray-300 rounded-full text-sm font-medium"
            >
              Log In
            </button>
          </div>

          {/* Begin Your Adventure 섹션 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Begin Your Adventure</h2>
            <p className="text-gray-600 text-sm mb-6">Sign Up with Open account</p>
          </div>

          {/* 소셜 로그인 버튼 */}
          <div className="space-y-4">
            <button
              onClick={handleLogin}
              className="w-full flex items-center justify-center px-6 py-3 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
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
              onClick={handleLogin}
              className="w-full flex items-center justify-center px-6 py-3 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
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
          <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg max-w-xs">
            <div className="flex items-start gap-2 mb-2">
              <h3 className="text-lg font-semibold">Travel the World, Your Way!</h3>
              <span className="text-red-500">❤️</span>
            </div>
            <p className="text-sm text-gray-600">
              Explore destinations at your pace, with personalized journeys & unforgettable experiences.
            </p>
            <div className="mt-2">
              <span className="text-sm text-gray-400">→</span>
            </div>
          </div>
          
          <Image
            src="/images/travel-beach.jpg"
            alt="Tropical beach with seaplane"
            layout="fill"
            objectFit="cover"
            className="rounded-l-[32px]"
          />
          
          <div className="absolute bottom-8 right-8 text-right text-white">
            <h3 className="text-2xl font-semibold mb-2">
              Explore the World,<br />
              Beyond Boundaries!
            </h3>
            <button 
              onClick={handleLogin}
              className="mt-4 px-6 py-2 bg-white text-black rounded-full text-sm font-medium"
            >
              Start your adventure today!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 