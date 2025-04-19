import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-gothic font-bold mb-4">Travel Voyanix</h3>
            <p className="text-gray-600 text-sm font-gothic">
              새로운 여행의 시작,<br />
              당신의 이야기를 만들어보세요.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-gothic font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-600 hover:text-gray-900 text-sm font-gothic">
                  회사 소개
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-gray-900 text-sm font-gothic">
                  이용약관
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm font-gothic">
                  개인정보처리방침
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-gothic font-bold mb-4">Contact Us</h4>
            <p className="text-gray-600 text-sm font-gothic">
              문의사항이 있으신가요?<br />
              support@travelvoyanix.com
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-gray-400 text-sm font-gothic">
            © {new Date().getFullYear()} Travel Voyanix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 