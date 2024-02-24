import { Monoton } from 'next/font/google';
import Link from 'next/link';

const monoton = Monoton({ weight: '400', subsets: ['latin'] });
export default function Logo() {
  return (
    <Link href="/">
      <div className={`${monoton.className} rounded-3xl border bg-green-500 text-center text-2xl`}>
        Effective Posting
      </div>
    </Link>
  );
}
