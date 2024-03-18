import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import CartPage from './pages/CartPage/CartPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Header from './layout/Header/Header';
import Footer from './layout/Footer/Footer';
import AllProductsPage from './pages/AllProductsPage/AllProductsPage';
import AllSalesPage from './pages/AllSalesPage/AllSalesPage';
import SingleProductPage from './pages/SingleProductPage/SingleProductPage';
import { FaAnglesUp } from 'react-icons/fa6';
import { useEffect, useRef } from 'react';
import { ROUTES } from './utils/routes';
import { Toaster } from 'react-hot-toast';

function App() {
  const scrollButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        scrollButtonRef.current.classList.remove('d-none');
      } else {
        scrollButtonRef.current.classList.add('d-none');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.CATEGORIES} element={<CategoriesPage />} />
        <Route path={ROUTES.ALLPRODUCTS} element={<AllProductsPage />} />
        <Route path={ROUTES.PRODUCT} element={<SingleProductPage />} />
        <Route path={ROUTES.ALLSALES} element={<AllSalesPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.NOTFOUNDPAGE} element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster position="bottom-center" reverseOrder={false} />
      <button
        ref={scrollButtonRef}
        className="scroll-to-top"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <FaAnglesUp />
      </button>
    </div>
  );
}

export default App;
