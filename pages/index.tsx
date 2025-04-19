import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 클라이언트 사이드에서만 실행되도록
    if (typeof window !== 'undefined') {
      router.replace('/auth/login');
    }
  }, [router]);

  // 리다이렉트 되는 동안 빈 화면 표시
  return null;
} 