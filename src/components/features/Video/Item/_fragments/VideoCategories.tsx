import Link from 'next/link';

interface VideoCategoriesProps {
  categories: string[];
}

export default function VideoCategories({ categories }: VideoCategoriesProps) {
  return (
    categories.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/search/?keyword=${category}`}
            className="px-1, py-2"
          >
            {category}
          </Link>
        ))}
      </div>
    )
  );
}
