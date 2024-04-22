"use client"
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Snake from '@/components/Snake';
import { usePathname } from 'next/navigation';

export default function Home() {

  return (
    <>
      <Navbar>
        <Link href="/" className='mr-4'>
          Home
        </Link>
        <Link href="/game" className='mr-4'>
          Game
        </Link>
        <Link href="/leaderboard" passHref>
          Leaderboard
        </Link>
        <button className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md">Connect Wallet</button>
      </Navbar>

      <Snake />
    </>
  );
}
