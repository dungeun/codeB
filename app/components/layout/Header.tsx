import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { 
  UserCircleIcon, 
  BellIcon, 
  ChevronDownIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

interface HeaderProps {
  onSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ onSidebarOpen }: HeaderProps) {
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* 로고 */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <span className="text-2xl font-gothic font-thin">Travel Voyanix</span>
            </Link>
          </div>

          {/* 메인 네비게이션 */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/community" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-gothic">
              커뮤니티
            </Link>
            <Link href="/notice" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-gothic">
              공지사항
            </Link>
            <Link href="/qna" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-gothic">
              Q&A
            </Link>
          </nav>

          {/* 우측 유틸리티 네비게이션 */}
          <div className="flex items-center justify-end space-x-4 ml-auto">
            {/* 알림 버튼 */}
            <button className="p-1 rounded-full text-gray-500 hover:text-gray-700">
              <BellIcon className="h-6 w-6" />
            </button>

            {/* 모바일 메뉴 버튼 */}
            <button
              type="button"
              className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => onSidebarOpen(true)}
            >
              <span className="sr-only">메뉴 열기</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* 프로필 드롭다운 */}
            {session ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                  <UserCircleIcon className="h-8 w-8" />
                  <ChevronDownIcon className="h-4 w-4" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm text-gray-700`}
                          >
                            프로필
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/settings"
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } block px-4 py-2 text-sm text-gray-700`}
                          >
                            설정
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => signOut()}
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                          >
                            로그아웃
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 