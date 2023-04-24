import Link from 'next/link';

interface VideoCategoriesProps {
  categories: string[];
}

export default function VideoCategories({ categories }: VideoCategoriesProps) {
  return categories.length > 0 ? (
    <ul className="flex flex-wrap gap-2 font-medium">
      {categories.map((category) => (
        <li className="flex" key={category}>
          <Link
            href={`/browse/search/?keyword=${category}`}
            className="px-3 py-1.5 rounded-md bg-primary text-primary border-[1px] border-secondary transition-colors hover:bg-hover"
          >
            {category}
          </Link>
        </li>
      ))}
    </ul>
  ) : null;
}
