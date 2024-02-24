import Link from 'next/link';

export default function NavMenu() {
  return (
    <div className="grid grid-cols-1 font-bold text-lg">
      <Link className="hover:bg-gray-200 py-4 pl-6" href="/">
        Home
      </Link>
      <Link className="hover:bg-gray-200 py-4 pl-6" href="/">
        View
      </Link>
      <Link className="hover:bg-gray-200 py-4 pl-6" href="">
        Like
      </Link>
      <Link className="hover:bg-gray-200 py-4 pl-6" href="">
        Tag
      </Link>
      <Link className="hover:bg-gray-200 py-4 pl-6" href="">
        Article Type
      </Link>
    </div>
  );
}
