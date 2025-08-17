import Link from 'next/link';

function Header() {
  return (
    <div>
      <Link href={'/public'}>Home</Link>
      <Link href={'/about'}>About</Link>
    </div>
  );
}

export default Header;
