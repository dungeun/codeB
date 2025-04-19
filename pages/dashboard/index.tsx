import React from 'react';
import { useSession } from 'next-auth/react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { ChartBarIcon, UserGroupIcon, DocumentTextIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

const stats = [
  { name: '총 회원수', value: '2,340', icon: UserGroupIcon, change: '+12%', changeType: 'positive' },
  { name: '총 게시글', value: '5,127', icon: DocumentTextIcon, change: '+18%', changeType: 'positive' },
  { name: '금일 방문자', value: '342', icon: ChartBarIcon, change: '-4%', changeType: 'negative' },
  { name: '신규 문의', value: '23', icon: ChatBubbleLeftIcon, change: '+8%', changeType: 'positive' },
];

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <DashboardLayout>
      {/* 환영 메시지 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          안녕하세요, {session?.user?.name || '관리자'}님 👋
        </h1>
        <p className="text-slate-500">
          오늘도 좋은 하루 되세요! 현재 시스템 현황을 한눈에 확인하실 수 있습니다.
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow-sm p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-8 h-8 text-slate-400" />
              <span
                className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-slate-800">{stat.value}</h3>
            <p className="text-sm text-slate-500">{stat.name}</p>
          </div>
        ))}
      </div>

      {/* 최근 활동 */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">최근 활동</h2>
        <div className="space-y-4">
          {/* 활동 목록은 추후 구현 */}
          <p className="text-slate-500 text-sm">아직 기록된 활동이 없습니다.</p>
        </div>
      </div>
    </DashboardLayout>
  );
} 