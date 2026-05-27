import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import ScrollToTop from './ScrollToTop';

function Layout() {
  return (
    <div className="site-shell min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="container-shell">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
