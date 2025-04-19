'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { 
  MagnifyingGlassIcon,
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface Board {
  id: number;
  title: string;
  type: {
    name: string;
    color: string;
  };
  author: string;
  createdAt: string;
  views: number;
  comments: number;
}

const boardTypes = [
  { name: '일반', color: 'bg-gray-100 text-gray-800' },
  { name: '공지사항', color: 'bg-red-100 text-red-800' },
  { name: '갤러리', color: 'bg-green-100 text-green-800' },
  { name: 'SNS', color: 'bg-blue-100 text-blue-800' },
  { name: 'Q&A', color: 'bg-purple-100 text-purple-800' },
  { name: '자료실', color: 'bg-yellow-100 text-yellow-800' },
];

export default function BoardsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newBoard, setNewBoard] = useState({
    title: '',
    type: boardTypes[0].name,
    url: '',
    urlError: ''
  });
  const itemsPerPage = 30;

  useEffect(() => {
    const generateBoards = () => {
      const totalBoards = 100;
      return Array.from({ length: totalBoards }, (_, index) => ({
        id: totalBoards - index,
        title: `게시판 ${totalBoards - index}`,
        type: boardTypes[Math.floor(Math.random() * boardTypes.length)],
        author: `작성자 ${totalBoards - index}`,
        createdAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString(),
        views: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 50),
      }));
    };

    setBoards(generateBoards());
  }, []);

  const filteredBoards = boards.filter((board) =>
    board.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    board.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    board.type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    board.id.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredBoards.length / itemsPerPage);
  const currentBoards = filteredBoards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const openSlideOver = (board: Board) => {
    setSelectedBoard(board);
    setIsSlideOverOpen(true);
  };

  const validateUrl = (url: string) => {
    // URL 형식 검증
    if (!url.trim()) {
      return '게시판 URL을 입력해주세요.';
    }
    // URL에 특수문자나 공백이 있는지 확인
    if (!/^[a-zA-Z0-9-_]+$/.test(url)) {
      return 'URL은 영문자, 숫자, 하이픈(-), 언더스코어(_)만 사용 가능합니다.';
    }
    return '';
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    const error = validateUrl(url);
    setNewBoard({ ...newBoard, url, urlError: error });
  };

  const handleCreateBoard = () => {
    const urlError = validateUrl(newBoard.url);
    if (urlError) {
      setNewBoard({ ...newBoard, urlError });
      return;
    }
    // 여기에 게시판 생성 로직 구현
    setIsCreateModalOpen(false);
    setNewBoard({ 
      title: '', 
      type: boardTypes[0].name, 
      url: '',
      urlError: ''
    });
  };

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* 브레드크럼 네비게이션 */}
          <div className="mb-4">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
                    관리자
                  </Link>
                </li>
                <li>
                  <span className="text-gray-400 mx-2">/</span>
                  <span className="text-gray-900">게시판 관리</span>
                </li>
              </ol>
            </nav>
          </div>

          {/* 헤더와 검색 영역 */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">게시판 관리</h1>
              <p className="mt-2 text-sm text-gray-700">
                전체 게시판 목록입니다. 게시판 정보를 확인하고 관리할 수 있습니다.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* 게시판 생성 버튼 */}
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <PlusIcon className="h-5 w-5" />
                <span>게시판 생성</span>
              </button>

              {/* 검색 필터 */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  검색
                </button>
              </div>
            </div>
          </div>

          {/* 테이블 */}
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">타입</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성자</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성일</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">조회수</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">댓글</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentBoards.map((board) => (
                        <tr key={board.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{board.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openSlideOver(board)}
                                className="hover:text-blue-600"
                              >
                                {board.title}
                              </button>
                              <a
                                href={`/dashboard/posts/${board.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-600"
                              >
                                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                              </a>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${board.type.color}`}>
                              {board.type.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{board.author}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{board.createdAt}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{board.views}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{board.comments}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* 페이지네이션 */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              총 <span className="font-medium">{filteredBoards.length}</span> 개의 게시판
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                이전
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = currentPage - 2 + i;
                if (pageNum > 0 && pageNum <= totalPages) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                return null;
              })}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음
              </button>
            </div>
          </div>

          {/* 게시판 생성 슬라이드 오버 */}
          <Transition.Root show={isCreateModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setIsCreateModalOpen}>
              <div className="fixed inset-0" />

              <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <Transition.Child
                      as={Fragment}
                      enter="transform transition ease-in-out duration-500 sm:duration-700"
                      enterFrom="translate-x-full"
                      enterTo="translate-x-0"
                      leave="transform transition ease-in-out duration-500 sm:duration-700"
                      leaveFrom="translate-x-0"
                      leaveTo="translate-x-full"
                    >
                      <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                          <div className="px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between">
                              <h2 className="text-lg font-semibold leading-6 text-gray-900">
                                새 게시판 생성
                              </h2>
                              <div className="ml-3 flex h-7 items-center">
                                <button
                                  type="button"
                                  className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                                  onClick={() => setIsCreateModalOpen(false)}
                                >
                                  <span className="sr-only">Close panel</span>
                                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* 게시판 생성 폼 */}
                          <div className="relative flex-1 px-4 sm:px-6">
                            <div className="space-y-6">
                              <div>
                                <label htmlFor="board-title" className="block text-sm font-medium text-gray-700">
                                  게시판 제목
                                </label>
                                <input
                                  type="text"
                                  id="board-title"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                  value={newBoard.title}
                                  onChange={(e) => setNewBoard({ ...newBoard, title: e.target.value })}
                                  placeholder="게시판 제목을 입력하세요"
                                />
                              </div>

                              <div>
                                <label htmlFor="board-url" className="block text-sm font-medium text-gray-700">
                                  게시판 URL
                                </label>
                                <div className="mt-1">
                                  <div className="flex rounded-md shadow-sm">
                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                      /boards/
                                    </span>
                                    <input
                                      type="text"
                                      id="board-url"
                                      className={`flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 ${
                                        newBoard.urlError ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'
                                      }`}
                                      value={newBoard.url}
                                      onChange={handleUrlChange}
                                      placeholder="board-url"
                                    />
                                  </div>
                                  {newBoard.urlError && (
                                    <p className="mt-1 text-sm text-red-600">
                                      {newBoard.urlError}
                                    </p>
                                  )}
                                  <p className="mt-1 text-xs text-gray-500">
                                    영문자, 숫자, 하이픈(-), 언더스코어(_)만 사용 가능합니다.
                                  </p>
                                </div>
                              </div>

                              <div>
                                <label htmlFor="board-type" className="block text-sm font-medium text-gray-700">
                                  게시판 타입
                                </label>
                                <select
                                  id="board-type"
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                  value={newBoard.type}
                                  onChange={(e) => setNewBoard({ ...newBoard, type: e.target.value })}
                                >
                                  {boardTypes.map((type) => (
                                    <option key={type.name} value={type.name}>
                                      {type.name}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="flex gap-3">
                                <button
                                  type="button"
                                  onClick={handleCreateBoard}
                                  className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                  생성하기
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setIsCreateModalOpen(false)}
                                  className="flex-1 rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                >
                                  취소
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </div>
            </Dialog>
          </Transition.Root>

          {/* 슬라이드 오버 패널 */}
          <Transition.Root show={isSlideOverOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setIsSlideOverOpen}>
              <div className="fixed inset-0" />

              <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <Transition.Child
                      as={Fragment}
                      enter="transform transition ease-in-out duration-500 sm:duration-700"
                      enterFrom="translate-x-full"
                      enterTo="translate-x-0"
                      leave="transform transition ease-in-out duration-500 sm:duration-700"
                      leaveFrom="translate-x-0"
                      leaveTo="translate-x-full"
                    >
                      <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                          <div className="px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between">
                              <h2 className="text-lg font-semibold leading-6 text-gray-900">
                                게시판 상세 정보
                              </h2>
                              <div className="ml-3 flex h-7 items-center">
                                <button
                                  type="button"
                                  className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                                  onClick={() => setIsSlideOverOpen(false)}
                                >
                                  <span className="sr-only">Close panel</span>
                                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                          </div>
                          {/* 게시판 상세 정보 */}
                          <div className="relative flex-1 px-4 sm:px-6">
                            {selectedBoard && (
                              <div className="space-y-6">
                                <div>
                                  <h3 className="text-sm font-medium text-gray-500">게시판 ID</h3>
                                  <p className="mt-1 text-sm text-gray-900">{selectedBoard.id}</p>
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium text-gray-500">게시판 제목</h3>
                                  <p className="mt-1 text-sm text-gray-900">{selectedBoard.title}</p>
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium text-gray-500">게시판 타입</h3>
                                  <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedBoard.type.color}`}>
                                    {selectedBoard.type.name}
                                  </span>
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium text-gray-500">작성자</h3>
                                  <p className="mt-1 text-sm text-gray-900">{selectedBoard.author}</p>
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium text-gray-500">작성일</h3>
                                  <p className="mt-1 text-sm text-gray-900">{selectedBoard.createdAt}</p>
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium text-gray-500">통계</h3>
                                  <div className="mt-1 grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                      <p className="text-xs text-gray-500">조회수</p>
                                      <p className="text-sm font-medium text-gray-900">{selectedBoard.views}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                      <p className="text-xs text-gray-500">댓글</p>
                                      <p className="text-sm font-medium text-gray-900">{selectedBoard.comments}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <button
                                    type="button"
                                    className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                  >
                                    <PencilSquareIcon className="h-5 w-5 inline-block mr-1" />
                                    수정
                                  </button>
                                  <button
                                    type="button"
                                    className="flex-1 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                  >
                                    <TrashIcon className="h-5 w-5 inline-block mr-1" />
                                    삭제
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </div>
    </DashboardLayout>
  );
} 