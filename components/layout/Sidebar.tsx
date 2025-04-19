'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  XMarkIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NavigationItem {
  name: string;
  href?: string;
  icon?: any;
  children?: NavigationItem[];
}

const navigation: NavigationItem[] = [
  { name: '대시보드', href: '/dashboard', icon: HomeIcon },
  { name: '사용자 관리', href: '/dashboard/users', icon: UsersIcon },
  {
    name: '게시판 관리',
    icon: FolderIcon,
    children: [
      { name: '전체 게시판', href: '/dashboard/posts' },
      { name: '댓글 관리', href: '/dashboard/posts/comments' },
      { name: '게시물 관리', href: '/dashboard/posts/articles' },
    ],
  },
  { name: '일정 관리', href: '/dashboard/calendar', icon: CalendarIcon },
  { name: '통계', href: '/dashboard/analytics', icon: ChartPieIcon },
  { name: '설정', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['게시판 관리']);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuName)
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  };

  const renderNavigationItem = (item: NavigationItem) => {
    const isActive = item.href ? pathname === item.href : false;
    const isExpanded = item.children && expandedMenus.includes(item.name);

    if (item.children) {
      return (
        <li key={item.name}>
          <button
            onClick={() => toggleMenu(item.name)}
            className={`
              w-full group flex items-center justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
              ${isExpanded ? 'bg-gray-50 text-blue-600' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}
            `}
          >
            <div className="flex items-center gap-x-3">
              {item.icon && (
                <item.icon
                  className={`h-6 w-6 shrink-0 ${
                    isExpanded ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                  }`}
                  aria-hidden="true"
                />
              )}
              {isSidebarExpanded && item.name}
            </div>
            {isSidebarExpanded && (
              <ChevronDownIcon
                className={`h-5 w-5 shrink-0 transition-transform ${
                  isExpanded ? 'transform rotate-180 text-blue-600' : 'text-gray-400'
                }`}
              />
            )}
          </button>
          {isExpanded && isSidebarExpanded && (
            <ul className="mt-1 px-2">
              {item.children.map(child => (
                <li key={child.name}>
                  <Link
                    href={child.href || '#'}
                    className={`
                      group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium pl-11
                      ${pathname === child.href
                        ? 'bg-gray-50 text-blue-600'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    {child.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    }

    return (
      <li key={item.name}>
        <Link
          href={item.href || '#'}
          className={`
            group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
            ${isActive
              ? 'bg-gray-50 text-blue-600'
              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
            }
          `}
        >
          {item.icon && (
            <item.icon
              className={`h-6 w-6 shrink-0 ${
                isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
              } ${!isSidebarExpanded ? 'w-8 h-8' : ''}`}
              aria-hidden="true"
            />
          )}
          {isSidebarExpanded && item.name}
        </Link>
      </li>
    );
  };

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setIsOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center justify-center">
                    <span className="text-xl font-bold">CodeB 관리자</span>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map(renderNavigationItem)}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* 데스크톱 사이드바 */}
      <div className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col ${isSidebarExpanded ? 'lg:w-72' : 'lg:w-20'}`}>
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center justify-center">
            {isSidebarExpanded ? (
              <span className="text-xl font-bold">CodeB 관리자</span>
            ) : (
              <span className="text-xl font-bold">CB</span>
            )}
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map(renderNavigationItem)}
                </ul>
              </li>
              <li className="mt-auto">
                <button
                  onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                  className="group flex w-full items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                >
                  {isSidebarExpanded ? (
                    <ChevronDoubleLeftIcon className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-blue-600" />
                  ) : (
                    <ChevronDoubleRightIcon className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-blue-600" />
                  )}
                  {isSidebarExpanded && '메뉴 접기'}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
} 