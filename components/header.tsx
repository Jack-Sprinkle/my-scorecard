import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <ul className="flex flex-col sm:flex-row">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/current">Current Round</Link></li>
        <li><Link href="/previous">Previous Rounds</Link></li>
        <li><Link href="/stats">Stats</Link></li>
      </ul>
    </nav>
  );
}
