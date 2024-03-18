import { useEffect, useState } from 'react';
import classes from './CartPage.module.css';
import TitleBlockWithLine from '../../components/TitleBlockWithLine/TitleBlockWithLine';
import { ROUTES } from './../../utils/routes';
import { useSelector, useDispatch } from 'react-redux';
import ProductInCart from '../../components/ProductInCart/ProductInCart';
import {
  addProduct,
  clearCart,
  countTotalSum,
  decreaseProduct,
  deleteProduct,
} from '../../store/reducers/cartSlice';
import { Link } from 'react-router-dom';
import StartBlockButton from '../../UI/StartBlockButton/StartBlockButton';
import ProductAndCartTitle from '../../components/ProductAndCartTitle/ProductAndCartTitle';
import TitleH2 from '../../components/TitleH2/TitleH2';
import ProductModal from '../../components/ProductModal/ProductModal';
import whiteCross from '../../assets/images/icons/whiteCross.svg';
import CartForm from '../../components/CartForm/CartForm';

const CartPage = () => {
  // opened page is displayed at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [modalActive, setModalActive] = useState(false);

  const { theme } = useSelector((state) => state.theme);
  const { productsInCart } = useSelector((store) => store.cart);
  const { totalSum } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addProduct(product));
    dispatch(countTotalSum());
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(countTotalSum());
  };

  const handleDecreaseProduct = (product) => {
    dispatch(decreaseProduct(product));
    dispatch(countTotalSum());
  };
  const handleDeleteFromCart = (product) => {
    dispatch(deleteProduct(product));
    dispatch(countTotalSum());
  };

  return (
    <div className={theme === 'dark' ? classes.dark : ''}>
      <ProductModal active={modalActive} setActive={setModalActive}>
        <div className={classes.modalWrapper}>
          <div className={classes.titleModalBlock}>
            <h3 className={classes.titleModal}>Congratulations!</h3>
            <img
              className={classes.whiteCross}
              src={whiteCross}
              alt="Close"
              onClick={() => setModalActive(false)}
            />
          </div>
          <p className={classes.descrModal}>
            Your order has been successfully placed on the website. <br />{' '}
            <br /> A manager will contact you shortly to confirm your order.
          </p>
        </div>
      </ProductModal>
      <div className="container">
        <div className={classes.wrapper}>
          <TitleBlockWithLine
            text="Shopping cart"
            textSmallBtn="Back to the store"
            link={ROUTES.HOME}
          />

          {productsInCart.length === 0 ? (
            <>
              <div className={classes.paragraphBlock}>
                <p
                  className={`${classes.paragraph} ${
                    theme === 'dark' ? classes.textDark : ''
                  }`}
                >
                  Looks like you have no items in your basket currently.
                </p>
              </div>
              <Link to={`${ROUTES.ALLPRODUCTS}?category=1`}>
                <StartBlockButton text="Continue Shopping" />
              </Link>
            </>
          ) : (
            <div className={classes.prodAndOrdersBlock}>
              <div className={classes.productsBlock}>
                {productsInCart.map((product) => (
                  <ProductInCart
                    key={product.id}
                    {...product}
                    handleAddToCart={() => handleAddToCart(product)}
                    handleDeleteFromCart={() => handleDeleteFromCart(product)}
                    handleDecreaseProduct={() => handleDecreaseProduct(product)}
                  />
                ))}
              </div>
              <div
                className={`${classes.ordersBlock} ${
                  theme === 'dark' ? classes.darkBG : ''
                }`}
              >
                <ProductAndCartTitle text="Order details" />
                <h4 className={classes.greyTitle}>
                  {productsInCart.length} items
                </h4>
                <div className={classes.totalBlock}>
                  <h4 className={classes.greyTitle}>Total</h4>
                  <TitleH2 text={`$${totalSum.toFixed(2)}`} />
                </div>
                <CartForm cart={{ handleClearCart, setModalActive }} />
                {/* <button
                  onClick={() => {
                    handleClearCart();
                    setModalActive(true);
                  }}
                >
                  Order
                </button> */}
              </div>
            </div>
          )}
          <div className={classes.bottomSmallBtn}>
            <Link to={`${ROUTES.ALLPRODUCTS}?category=1`}>
              <StartBlockButton textSmallBtn="Back to the store" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
