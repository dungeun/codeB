'use client';

import React, { useState, useEffect } from 'react';
import BoardLayout from '@/app/components/layout/BoardLayout';
import { MagnifyingGlassIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  views: number;
  comments: number;
  likes: number;
  isLiked: boolean;
  preview: string;
}

export default function BoardPage({ params }: { params: { boardUrl: string } }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const itemsPerPage = 20;

  useEffect(() => {
    setPosts(generatePosts());
  }, []);

  // 임시 데이터 생성
  const generatePosts = () => {
    const totalPosts = 100;
    return Array.from({ length: totalPosts }, (_, index) => ({
      id: totalPosts - index,
      title: `${index + 1}번째 게시글입니다. 이것은 조금 더 긴 제목의 게시글 입니다. 게시글의 내용을 미리 확인할 수 있습니다.`,
      author: `작성자 ${totalPosts - index}`,
      createdAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString(),
      views: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 50),
      likes: Math.floor(Math.random() * 100),
      isLiked: Math.random() > 0.5,
      preview: '이 게시글은 게시판의 새로운 포스트입니다. 여러분들의 많은 관심과 참여 부탁드립니다...'
    }));
  };

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    setCurrentPage(1);
  };

  // boardUrl에 따른 게시판 이름 매핑
  const getBoardName = (url: string) => {
    const boardTypes = {
      'free': '자유게시판',
      'notice': '공지사항',
      'gallery': '갤러리',
      'sns': 'SNS',
      'qna': 'Q&A',
      'data': '자료실'
    };
    return boardTypes[url as keyof typeof boardTypes] || '게시판';
  };

  return (
    <BoardLayout boardName={getBoardName(params.boardUrl)}>
      {/* 검색 영역 */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
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
          <Link
            href={`/boards/${params.boardUrl}/write`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            글쓰기
          </Link>
        </div>
      </div>

      {/* 게시글 목록 */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">번호</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">작성자</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">작성일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">조회</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">좋아요</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPosts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  <div>
                    <Link 
                      href={`/boards/${params.boardUrl}/${post.id}`} 
                      className="hover:text-blue-600 block"
                    >
                      {post.title}
                    </Link>
                    <p className="text-gray-500 text-xs mt-1 truncate">{post.preview}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">댓글 {post.comments}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">조회 {post.views}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.views}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-1 group"
                  >
                    {post.isLiked ? (
                      <HeartSolidIcon className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartIcon className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
                    )}
                    <span className={`${post.isLiked ? 'text-red-500' : 'text-gray-500 group-hover:text-red-500'}`}>
                      {post.likes}
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-700">
          총 <span className="font-medium">{filteredPosts.length}</span> 개의 게시글
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
    </BoardLayout>
  );
} 