import { useRouter } from 'next/router';
import { useMemo } from 'react';
import type { QueryDefinition } from '@reduxjs/toolkit/dist/query';
import type { QueryHooks } from '@reduxjs/toolkit/dist/query/react/buildHooks';

import { AppBaseQuery } from '@/store';
import {
  OffsetPaginationRequest,
  OffsetPaginationResponse,
} from '@/store/common/api.type';

export function usePaginationQuery<
  ItemType,
  RequestType extends OffsetPaginationRequest,
  ResponseType extends OffsetPaginationResponse<ItemType>
>(
  endpoint: QueryHooks<
    QueryDefinition<RequestType, AppBaseQuery, any, ResponseType>
  >,
  options: Omit<RequestType, 'page'>
) {
  const router = useRouter();
  const page = useMemo(() => {
    const { page } = router.query;
    return page instanceof Array ? +page[0] : +(page || 1);
  }, [router.query]);

  const queryArg = { ...options, page } as RequestType;
  const result = endpoint.useQuery(queryArg, { skip: !router.isReady });

  return { ...result, page };
}
