import { QueryClient } from '@tanstack/react-query';

/**
 * staleTime: stale 상태를 10분 유지
 * gcTime: 가비지컬렉터를 통해 캐시를 없애는 간격을 15분으로 설정
 * refetchOnWindowFocus: 화면 탭 활성화시 자동 네트워크 요청 false
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000,
      gcTime: 900000,
      refetchOnWindowFocus: false,
    },
  },
});
