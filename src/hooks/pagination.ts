import { useEffect, useRef, useState } from 'react';

import { KeysetPaginationResponse } from '@/store/common/common.type';

export function useKeysetPagination(
  getData: () => KeysetPaginationResponse | undefined
) {
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const container = ref.current;
    const lastChild = container.lastElementChild;

    const observer = new IntersectionObserver(([entry]) => {
      const data = getData();
      if (entry.isIntersecting && data) {
        setToken(data.token);
      }
    });

    lastChild && observer.observe(lastChild);

    return () => {
      observer.disconnect();
    };
  }, [getData]);

  return { token, ref };
}
