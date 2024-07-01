// components/Layout.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  const router = useRouter();

const isActive = (path: string) => {
  return router.pathname === path ? 'active text-red-500' : '';
};

return (
    <>
        <nav className="navbar flex items-center justify-center gap-3 p-4 bg-gray-800 text-white sticky top-0 z-10">
            <Link href="/">
                <span className={`text-lg font-bold ${isActive('/')}`}>Posts</span>
            </Link>
            <Link href="/users">
                <span className={`text-lg font-bold ${isActive('/users')}`}>Users</span>
            </Link>
        </nav>
        <main>{children}</main>
    </>
);
};

export default Layout;