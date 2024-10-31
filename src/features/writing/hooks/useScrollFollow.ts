import { RefObject, useEffect } from 'react';

interface useScrollFollowPropTypes {
  contentRef: RefObject<HTMLDivElement>;
  dependencies: boolean[];
}

const useScrollFollow = ({
  contentRef,
  dependencies,
}: useScrollFollowPropTypes) => {
  useEffect(() => {
    if (contentRef.current) {
      const isContentOverflow =
        contentRef.current.scrollHeight > window.innerHeight;

      if (isContentOverflow) {
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }, [dependencies, contentRef]);
};

export default useScrollFollow;
