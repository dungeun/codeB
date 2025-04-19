import React, { useState, useEffect, Fragment } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { ChevronUpIcon, ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';

type SortField = 'id' | 'name' | 'email' | 'phone' | 'joinDate' | 'lastLogin' | 'status';
type SortOrder = 'asc' | 'desc';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  lastLogin: string;
  status: string;
}

// 임시 데이터 생성 함수
const generateUsers = (): User[] => {
  const totalUsers = 100;
  const phoneNumbers = Array.from({ length: totalUsers }, (_, i) => {
    const mid = String(Math.floor(1000 + i * 80) % 9000 + 1000);
    const end = String(Math.floor(2000 + i * 50) % 9000 + 1000);
    return `010-${mid}-${end}`;
  });

  return Array.from({ length: totalUsers }, (_, index) => {
    const userId = totalUsers - index;
    const lastLoginDate = new Date();
    lastLoginDate.setDate(lastLoginDate.getDate() - (userId % 30));
    
    return {
      id: userId,
      name: `사용자${userId}`,
      email: `user${userId}@example.com`,
      phone: phoneNumbers[index],
      joinDate: new Date(2024, 0, userId).toLocaleDateString(),
      lastLogin: lastLoginDate.toLocaleString(),
      status: userId % 3 === 0 ? '활성' : userId % 3 === 1 ? '대기' : '비활성'
    };
  });
};

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const usersPerPage = 30;

  useEffect(() => {
    setUsers(generateUsers());
  }, []);

  // 검색 필터링
  const filteredUsers = users.filter((user) =>
    user.id.toString().includes(searchTerm) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 정렬 처리
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });

    setUsers(sortedUsers);
  };

  // 정렬 아이콘 표시
  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return null;
    return sortOrder === 'asc' ? (
      <ChevronUpIcon className="w-4 h-4 inline-block ml-1" />
    ) : (
      <ChevronDownIcon className="w-4 h-4 inline-block ml-1" />
    );
  };

  // 현재 페이지의 사용자 계산
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  
  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setEditedUser(user);
    setIsDetailOpen(true);
  };

  const handleEditChange = (field: keyof User, value: string) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [field]: value });
    }
  };

  const handleSave = () => {
    if (editedUser) {
      // 실제 사용자 목록 업데이트
      setUsers(users.map(user => 
        user.id === editedUser.id ? editedUser : user
      ));
      setSelectedUser(editedUser);
      setIsEditing(false);
    }
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
                  <span className="text-gray-900">사용자 관리</span>
                </li>
              </ol>
            </nav>
          </div>

          {/* 헤더와 검색 영역 */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">사용자 관리</h1>
              <p className="mt-2 text-sm text-gray-700">
                전체 사용자 목록입니다. 사용자 정보를 확인하고 관리할 수 있습니다.
              </p>
            </div>

            {/* 검색 필터 */}
            <div className="flex items-center gap-2">
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  placeholder="아이디, 이름, 이메일 검색"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                검색
              </button>
            </div>
          </div>

          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        {[
                          { field: 'id', label: 'ID' },
                          { field: 'name', label: '이름' },
                          { field: 'email', label: '이메일' },
                          { field: 'phone', label: '전화번호' },
                          { field: 'joinDate', label: '가입일' },
                          { field: 'lastLogin', label: '최종로그인' },
                          { field: 'status', label: '상태' }
                        ].map(({ field, label }) => (
                          <th
                            key={field}
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSort(field as SortField)}
                          >
                            <div className="flex items-center">
                              {label}
                              {getSortIcon(field as SortField)}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {currentUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{user.id}</td>
                          <td 
                            className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 cursor-pointer hover:text-blue-600"
                            onClick={() => handleUserClick(user)}
                          >
                            {user.name}
                          </td>
                          <td 
                            className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer hover:text-blue-600"
                            onClick={() => handleUserClick(user)}
                          >
                            {user.email}
                          </td>
                          <td 
                            className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer hover:text-blue-600"
                            onClick={() => handleUserClick(user)}
                          >
                            {user.phone}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.joinDate}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.lastLogin}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <div className="flex space-x-2">
                              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                user.status === '대기' 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-gray-100 text-gray-400'
                              }`}>
                                대기
                              </span>
                              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                user.status === '비활성' 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-gray-100 text-gray-400'
                              }`}>
                                비활성
                              </span>
                              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                user.status === '활성' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-400'
                              }`}>
                                활성
                              </span>
                            </div>
                          </td>
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
              총 <span className="font-medium">{filteredUsers.length}</span> 명의 사용자
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                이전
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음
              </button>
            </div>
          </div>
        </div>

        {/* 사용자 상세 정보 슬라이드 오버 */}
        <Transition.Root show={isDetailOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={setIsDetailOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-lg font-semibold text-gray-900">
                              사용자 상세 정보
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                                onClick={() => setIsDetailOpen(false)}
                              >
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="relative flex-1 px-4 py-6 sm:px-6">
                          {selectedUser && editedUser && (
                            <div className="space-y-6">
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">기본 정보</h3>
                                <div className="mt-2 border-t border-gray-200 pt-4">
                                  <dl className="divide-y divide-gray-200">
                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                      <dt className="text-sm font-medium text-gray-500">이름</dt>
                                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {isEditing ? (
                                          <input
                                            type="text"
                                            value={editedUser.name}
                                            onChange={(e) => handleEditChange('name', e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                          />
                                        ) : (
                                          editedUser.name
                                        )}
                                      </dd>
                                    </div>
                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                      <dt className="text-sm font-medium text-gray-500">이메일</dt>
                                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {isEditing ? (
                                          <input
                                            type="email"
                                            value={editedUser.email}
                                            onChange={(e) => handleEditChange('email', e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                          />
                                        ) : (
                                          editedUser.email
                                        )}
                                      </dd>
                                    </div>
                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                      <dt className="text-sm font-medium text-gray-500">전화번호</dt>
                                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {isEditing ? (
                                          <input
                                            type="tel"
                                            value={editedUser.phone}
                                            onChange={(e) => handleEditChange('phone', e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                          />
                                        ) : (
                                          editedUser.phone
                                        )}
                                      </dd>
                                    </div>
                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                      <dt className="text-sm font-medium text-gray-500">가입일</dt>
                                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {editedUser.joinDate}
                                      </dd>
                                    </div>
                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                      <dt className="text-sm font-medium text-gray-500">최종 로그인</dt>
                                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        {editedUser.lastLogin}
                                      </dd>
                                    </div>
                                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                                      <dt className="text-sm font-medium text-gray-500">상태</dt>
                                      <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                                        {isEditing ? (
                                          <select
                                            value={editedUser.status}
                                            onChange={(e) => handleEditChange('status', e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                          >
                                            <option value="활성">활성</option>
                                            <option value="대기">대기</option>
                                            <option value="비활성">비활성</option>
                                          </select>
                                        ) : (
                                          <div className="flex space-x-2">
                                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                              editedUser.status === '대기' 
                                                ? 'bg-yellow-100 text-yellow-800' 
                                                : 'bg-gray-100 text-gray-400'
                                            }`}>
                                              대기
                                            </span>
                                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                              editedUser.status === '비활성' 
                                                ? 'bg-red-100 text-red-800' 
                                                : 'bg-gray-100 text-gray-400'
                                            }`}>
                                              비활성
                                            </span>
                                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                              editedUser.status === '활성' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-gray-100 text-gray-400'
                                            }`}>
                                              활성
                                            </span>
                                          </div>
                                        )}
                                      </dd>
                                    </div>
                                  </dl>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* 하단 버튼 영역 */}
                        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-4 py-4 sm:px-6">
                          {isEditing ? (
                            <>
                              <button
                                type="button"
                                onClick={handleSave}
                                className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                              >
                                저장
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setIsEditing(false);
                                  setEditedUser(selectedUser);
                                }}
                                className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                취소
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                              >
                                수정
                              </button>
                              <button
                                type="button"
                                onClick={() => setIsDetailOpen(false)}
                                className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                닫기
                              </button>
                            </>
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
    </DashboardLayout>
  );
} 