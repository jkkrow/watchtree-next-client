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
  const [isIntersecting, setIsIntersecting] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  const queryArg = { ...options, token } as RequestType;
  const { data, isLoading, isFetching, ...rest } = endpoint.useQuery(queryArg);

  useEffect(() => {
    if (!listRef.current) return;
    const container = listRef.current;
    const lastChild = container.lastElementChild;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && data) {
        setToken(data.token);
        setIsIntersecting(true);
      }
      if (!entry.isIntersecting) {
        setIsIntersecting(false);
      }
    });

    lastChild && observer.observe(lastChild);

    return () => {
      observer.disconnect();
    };
  }, [data]);

  return {
    listRef,
    data,
    isLoading,
    isFetching,
    isFetchingMore: isIntersecting && isFetching && !isLoading && !!data?.token,
    ...rest,
  };
}
