import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';

function Layout() {
  return (
    <div className="bg-gradient-to-r from-zinc-300 to-zinc-50 min-h-dvh h-auto">
      <main className="flex flex-col gap-6 w-[1200px] max-w-full m-auto p-5">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
