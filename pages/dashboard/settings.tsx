import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">설정</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">설정 페이지입니다.</p>
        </div>
      </div>
    </DashboardLayout>
  );
} 