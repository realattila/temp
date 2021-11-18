import { useRef, useCallback, useEffect } from 'react';

const useMounted = () => {
  let mountedRef = useRef(false);
  let get = useCallback(() => mountedRef.current, []);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return get;
};

export default useMounted;
