import { useEffect, useRef, useState } from 'react';
import type { QueryDefinition } from '@reduxjs/toolkit/dist/query';
import type { QueryHooks } from '@reduxjs/toolkit/dist/query/react/buildHooks';

import { AppBaseQuery } from '@/store';
import {
  KeysetPaginationRequest,
  KeysetPaginationResponse,
} from '@/store/common/api.type';

export function useInfiniteQuery<
  ItemType,
  RequestType extends KeysetPaginationRequest,
  ResponseType extends KeysetPaginationResponse<ItemType>
>(
  endpoint: QueryHooks<
    QueryDefinition<RequestType, AppBaseQuery, any, ResponseType>
  >,
  options: Omit<RequestType, 'token'>
) {
  const [token, setToken] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const queryOptions = { ...options, token } as RequestType;
  const { data, ...rest } = endpoint.useQuery(queryOptions);

  useEffect(() => {
    if (!listRef.current) return;
    const container = listRef.current;
    const lastChild = container.lastElementChild;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && data) {
        setToken(data.token);
      }
    });

    lastChild && observer.observe(lastChild);

    return () => {
      observer.disconnect();
    };
  }, [data]);

  return { listRef, data, ...rest };
}
