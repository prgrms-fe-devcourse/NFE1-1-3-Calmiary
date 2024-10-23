import { useCallback, useRef } from 'react';

/**
 * 사용자의 이벤트로부터 특정 시간동안 해당 이벤트를 제한하기 위해 사용하는 커스텀 훅입니다.
 *
 * 사용 예시 (클릭, 무한스크롤 등등)
 * 예시 코드
 * const onClickBtn = () => {어떤 로직의 클릭 이벤트 함수}
 * const throttleBtn = useThrottle(onClickBtn, 5000 - 원하는 delay 시간)
 * <Button onClick={throttleBtn}>클릭</Button> || <Button onClick={() => useThrottle(onClickBtn, 1000 - 원하는 delay 시간)}>클릭</Button>
 */
export const useThrottle = (
  callback: (...args: any[]) => void,
  delay: number
) => {
  const isThrottle = useRef(false);

  return useCallback((...arg: any) => {
    if (!isThrottle.current) {
      callback(...arg);
      isThrottle.current = true;
      setTimeout(() => {
        isThrottle.current = false;
      }, delay);
    }
  }, []);
};
