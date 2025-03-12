"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathName = usePathname() 

  return (
    <nav className="bg-slate-700">
      <ul className="flex flex-col sm:flex-row sm:gap-4">
        <li className={pathName === "/" ? "text-white underline": "text-white"}><Link href="/">Home</Link></li>
        <li className={pathName === "/current" ? "text-white underline": "text-white"}><Link href="/current">Current Round</Link></li>
        <li className={pathName === "/previous" ? "text-white underline": "text-white"}><Link href="/previous">Previous Rounds</Link></li>
        <li className={pathName === "/stats" ? "text-white underline": "text-white"}><Link href="/stats">Stats</Link></li>
      </ul>
    </nav>
  );
}
