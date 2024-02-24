import { Monoton } from 'next/font/google';
import Link from 'next/link';

const monoton = Monoton({ weight: '400', subsets: ['latin'] });
export default function Logo() {
  return (
    <Link href="/">
      <div className={`${monoton.className} text-2xl text-center border rounded-3xl bg-green-500`}>
        Effective Posting
      </div>
    </Link>
  );
}
