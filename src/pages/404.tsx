import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col p-12 gap-4 text-center">
      <h1 className="font-bold text-3xl">Page Not Found</h1>
      <Link
        className="font-medium w-fit m-auto hover:text-hover transition-colors"
        href="/"
      >
        Return to home page
      </Link>
    </div>
  );
}
