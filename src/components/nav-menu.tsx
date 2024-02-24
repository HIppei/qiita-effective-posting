import Link from 'next/link';

export default function NavMenu() {
  return (
    <div className="grid grid-cols-1 text-lg font-bold">
      <Link className="py-4 pl-6 hover:bg-gray-200" href="/">
        Home
      </Link>
      <Link className="py-4 pl-6 hover:bg-gray-200" href="">
        Like
      </Link>
      <Link className="py-4 pl-6 hover:bg-gray-200" href="">
        Tag
      </Link>
      <Link className="py-4 pl-6 hover:bg-gray-200" href="">
        Article Type
      </Link>
    </div>
  );
}
