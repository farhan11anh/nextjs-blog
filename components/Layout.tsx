// components/Layout.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head'; //

interface LayoutProps {
    children: React.ReactNode;
    title?: string; // Step 2: Add a title prop
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Blog - Farhan' }: React.PropsWithChildren<LayoutProps>) => {
  const router = useRouter();
  const { pathname } = router;

const isActive = (path: string) => {
  return pathname === path || (path === '/' && pathname.startsWith('/posts')) ? 'text-blue-500' : '';
  // return router.pathname === path ? 'active text-red-500' : '';
};

return (
    <>
    <Head> {}
        <title>{title || 'Default Title'}</title>
      </Head>
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