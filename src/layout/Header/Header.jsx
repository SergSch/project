import classes from './Header.module.css';
import logo from '../../assets/images/header/logo.svg';
import day from '../../assets/images/header/day.svg';
import night from '../../assets/images/header/night.svg';

import like from '../../assets/images/header/like.svg';
import cart from '../../assets/images/header/cart.svg';
import menu from '../../assets/images/header/menu.svg';
import Navigation from '../../components/Navigation/Navigation';
import close from '../../assets/images/header/close.svg';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/reducers/themeSlice';
import { useClickOutsaide } from '../../customHooks/useClickOutSide';
import whiteCross from '../../assets/images/icons/whiteCross.svg';
import ProductModal from './../../components/ProductModal/ProductModal';
import SingleProductCard from './../../components/SingleProductCard/SingleProductCard';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import { addProduct, countTotalSum } from '../../store/reducers/cartSlice';
import toast from 'react-hot-toast';
import { useGetAllGoodsQuery } from '../../store/reducers/apiGoodsSlice';

const Header = () => {
  // Set mobile menu
  const [isOpen, setIsOpen] = useState(false);

  // close mobile menu
  const menuRef = useRef(null);
  useClickOutsaide(menuRef, () => {
    setIsOpen(false);
  });

  const [modalActive, setModalActive] = useState(false);

  const { data } = useGetAllGoodsQuery();

  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { productsInCart } = useSelector((store) => store.cart);
  const { favouritesProducts } = useSelector((store) => store.favourites);

  const handleAddToCart = (product) => {
    dispatch(addProduct(product));
    dispatch(countTotalSum());
    toast.success('Added to Cart successfully');
  };

  return (
    <div className={`${classes.wrap} ${theme === 'dark' ? classes.dark : ''}`}>
      <ProductModal
        active={modalActive}
        setActive={setModalActive}
        discountModal
      >
        <div className={classes.modalWrap}>
          <div className={classes.titleBlock}>
            <h3 className={classes.titleH3}>
              50% discount on product of the day!
            </h3>
            <img
              src={whiteCross}
              alt="Close"
              className={classes.closeModal}
              onClick={() => setModalActive(false)}
            />
          </div>
          {data && <SingleProductCard product={data[13]} none />}
          <button
            className={classes.btn}
            onClick={() => handleAddToCart(data[13])}
          >
            Add to cart
          </button>
        </div>
      </ProductModal>
      <div className="container">
        <div className={classes.wrapper}>
          <div className={classes.logoBlock}>
            <img src={logo} alt="Logo" className={classes.logo} />
            <img
              src={theme === 'light' ? day : night}
              alt="changeThemeImage"
              className={classes.theme}
              onClick={() => dispatch(toggleTheme())}
            />
          </div>
          <div
            className={`${classes.nav_wrap}  ${isOpen ? classes.active : ''} ${
              theme === 'dark' ? classes.dark : ''
            }`}
            ref={menuRef}
          >
            <img
              src={close}
              alt="Close"
              className={`${classes.close} ${
                theme === 'dark' ? classes.menuDark : ''
              }`}
              onClick={() => setIsOpen(!isOpen)}
            />
            <Navigation setModalActive={setModalActive} />
          </div>
          <div className={classes.imgBlock}>
            <Link to={`${ROUTES.ALLPRODUCTS}?category=3`}>
              <div className={classes.cartWrapper}>
                <img
                  src={like}
                  alt="Heart"
                  className={theme === 'dark' ? classes.menuDark : ''}
                />
                <span
                  className={classes.spanQuantity}
                  style={{
                    display:
                      favouritesProducts && favouritesProducts?.length
                        ? 'flex'
                        : 'none',
                  }}
                >
                  {favouritesProducts.length}
                </span>
              </div>
            </Link>
            <Link to={ROUTES.CART}>
              <div className={classes.cartWrapper}>
                <img
                  src={cart}
                  alt="Cart"
                  className={theme === 'dark' ? classes.menuDark : ''}
                />

                <span
                  className={classes.spanQuantity}
                  style={{
                    display:
                      productsInCart && productsInCart?.length
                        ? 'flex'
                        : 'none',
                  }}
                >
                  {productsInCart.length}
                </span>
              </div>
            </Link>
            <img
              src={menu}
              alt="Menu"
              className={`${classes.menu} ${
                theme === 'dark' ? classes.menuDark : ''
              }`}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
