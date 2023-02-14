import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col p-6 m-auto gap-6 text-center">
      <h1 className="font-bold text-3xl">Page Not Found</h1>
      <Link className="font-bold w-[max-content] p-2 m-auto" href="/">
        Return to home page
      </Link>
    </div>
  );
}
