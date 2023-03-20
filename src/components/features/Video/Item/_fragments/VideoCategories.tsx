import { useMemo, useState } from 'react';

import Link from 'next/link';

interface VideoCategoriesProps {
  categories: string[];
  brief?: boolean;
}

export default function VideoCategories({
  categories,
  brief,
}: VideoCategoriesProps) {
  const [showAll, setShowAll] = useState(!brief);
  const displayedItems = useMemo(() => {
    return showAll ? categories : categories.slice(0, 3);
  }, [categories, showAll]);

  return categories.length > 0 ? (
    <div className="flex">
      <ul className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <li className="flex" key={category}>
            <Link
              href={`/browse/?keyword=${category}`}
              className="px-3 py-1.5 rounded-md bg-primary border-[1px] border-secondary transition-colors hover:bg-hover"
            >
              #{category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}
