import { useRouter } from 'next/router';
import { useMemo } from 'react';

import Button from '../../Element/Button';
import AngleLeftDoubleIcon from '@/assets/icons/angle-left-double.svg';
import AngleLeftIcon from '@/assets/icons/angle-left.svg';
import AngleRightDoubleIcon from '@/assets/icons/angle-right-double.svg';
import AngleRightIcon from '@/assets/icons/angle-right.svg';

interface PaginationProps {
  count: number;
  page: number;
  size: number;
  keyword?: string;
}

export default function Pagination({
  count,
  page = 1,
  size,
  keyword,
}: PaginationProps) {
  const router = useRouter();
  const totalPage = useMemo(() => Math.ceil(count / size), [count, size]);

  const pageHandler = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPage || page === pageNumber) {
      return;
    }

    const destinationUrl = `${location.pathname}${
      keyword ? `?keyword=${keyword}&page=${pageNumber}` : `?page=${pageNumber}`
    }`;

    router.push(destinationUrl);
  };

  return (
    <div
      className="flex justify-center w-fit mx-auto mt-10 gap-2 [&_button]:p-2 [&_button]:min-w-[36px] [&_svg]:w-4 [&_svg]:h-4 data-[disabled=true]:invisible data-[disabled=true]:pointer-events-none"
      data-disabled={totalPage <= 1}
    >
      <div onClick={() => pageHandler(1)}>
        <Button>
          <AngleLeftDoubleIcon />
        </Button>
      </div>
      <div onClick={() => pageHandler(page - 1)}>
        <Button>
          <AngleLeftIcon />
        </Button>
      </div>
      {page >= 3 && (
        <div onClick={() => pageHandler(page - 2)}>
          <Button>{page - 2}</Button>
        </div>
      )}
      {page >= 2 && (
        <div onClick={() => pageHandler(page - 1)}>
          <Button>{page - 1}</Button>
        </div>
      )}
      <Button inversed>{page}</Button>
      {totalPage - page >= 1 && (
        <div onClick={() => pageHandler(page + 1)}>
          <Button>{page + 1}</Button>
        </div>
      )}
      {totalPage - page >= 2 && (
        <div onClick={() => pageHandler(page + 2)}>
          <Button>{page + 2}</Button>
        </div>
      )}
      <div onClick={() => pageHandler(page + 1)}>
        <Button>
          <AngleRightIcon />
        </Button>
      </div>
      <div onClick={() => pageHandler(totalPage)}>
        <Button>
          <AngleRightDoubleIcon />
        </Button>
      </div>
    </div>
  );
}
