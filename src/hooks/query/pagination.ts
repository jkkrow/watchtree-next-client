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
  params: Omit<RequestType, 'page'>,
  options?: { skip?: boolean }
) {
  const router = useRouter();
  const page = useMemo(() => {
    const { page } = router.query;
    return page instanceof Array ? +page[0] : +(page || 1);
  }, [router.query]);

  const queryArg = { ...params, page } as RequestType;
  const queryOptions = {
    ...options,
    skip:
      options?.skip !== undefined
        ? options.skip || !router.isReady
        : !router.isReady,
  };

  const result = endpoint.useQuery(queryArg, queryOptions);

  return { ...result, page };
}
