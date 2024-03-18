import ProductAndCartTitle from '../../components/ProductAndCartTitle/ProductAndCartTitle';
import classes from './SingleProductPage.module.css';
import like from '../../assets/images/header/like.svg';
import { useGetSingleProductQuery } from '../../store/reducers/apiGoodsSlice';
import TitleH2 from '../../components/TitleH2/TitleH2';
import TitleThrough from '../../components/TitleThrough/TitleThrough';
import ElementDiscount from '../../UI/ElementDiscount/ElementDiscount';
import AddAndDeleteButtonsBlock from '../../components/AddAndDeleteButtonsBlock/AddAndDeleteButtonsBlock';
import AddProductBtn from '../../UI/AddProductBtn/AddProductBtn';
import DescriptionAndFilterTitle from '../../components/DescriptionAndFilterTitle/DescriptionAndFilterTitle';
import { useSelector, useDispatch } from 'react-redux';
import ShowMoreAndLessText from '../../components/ShowMoreAndLessText/ShowMoreAndLessText';
import ProductModal from '../../components/ProductModal/ProductModal';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/constants';
import {
  addProduct,
  countTotalSum,
  decreaseProduct,
} from '../../store/reducers/cartSlice';
import toast from 'react-hot-toast';

const SingleProductPage = () => {
  // opened page is displayed at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { theme } = useSelector((state) => state.theme);
  const [modalActive, setModalActive] = useState(false);
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetSingleProductQuery(
    Number(id)
  );

  const { productsInCart } = useSelector((store) => store.cart);
  console.log(productsInCart);

  const dispatch = useDispatch();
  const handleAddToCart = (data) => {
    dispatch(addProduct(data));
    dispatch(countTotalSum());
    toast.success('Added to Cart successfully');
  };

  const handleDecreaseProduct = (product) => {
    dispatch(decreaseProduct(product));
    dispatch(countTotalSum());
  };

  // Checking of data and length
  const discountPrice = data && data.length > 0 ? data[0]?.discont_price : null;
  const price = data && data.length > 0 ? data[0]?.price : null;
  const percentDiscount =
    data && data.length > 0
      ? Math.round(((price - discountPrice) / price) * 100)
      : null;

  return (
    <div className={`${classes.wrap} ${theme === 'dark' ? classes.dark : ''}`}>
      <ProductModal active={modalActive} setActive={setModalActive}>
        {data && data.length > 0 && (
          <img src={`${BASE_URL}/${data[0]?.image}`} alt={data[0]?.title} />
        )}
      </ProductModal>
      {isError ? <h3>Your page is {error.data.error}</h3> : null}
      <div className="container">
        <div className={classes.wrapper}>
          <div className="breadCrumbs"></div>
          {isLoading ? (
            <div className="loading">
              <div className="loading_content"></div>
            </div>
          ) : (
            <div className={classes.mainBlock}>
              <div className={classes.imgBlock}>
                {data && data.length > 0 && (
                  <img
                    src={`${BASE_URL}/${data[0]?.image}`}
                    alt={data[0]?.title}
                    onClick={() => setModalActive(true)}
                  />
                )}
                <div className={classes.discountWrapImg}>
                  {discountPrice && (
                    <ElementDiscount discount={percentDiscount} />
                  )}
                </div>
              </div>

              <div className={classes.titleBlock}>
                {data && data.length > 0 && (
                  <ProductAndCartTitle text={data[0]?.title} />
                )}
                <img
                  src={like}
                  alt="Heart"
                  className={theme === 'dark' ? classes.menuDark : ''}
                />
              </div>
              <div className={classes.priceBlock}>
                <TitleH2
                  text={discountPrice ? `$${discountPrice}` : `$${price}`}
                />

                {discountPrice && <TitleThrough text={`${'$' + price}`} />}
                <div className={classes.discountWrap}>
                  {discountPrice && (
                    <ElementDiscount discount={percentDiscount} />
                  )}
                </div>
              </div>
              <div className={classes.btnBlock}>
                <AddAndDeleteButtonsBlock
                  handleAddToCart={() => handleAddToCart(data[0])}
                  handleDecreaseProduct={() => {
                    if (
                      productsInCart.length > 0 &&
                      productsInCart[0]?.quantity > 0
                    ) {
                      handleDecreaseProduct(productsInCart[0]);
                    }
                  }}
                  quantity={productsInCart[0]?.quantity}
                />
                <AddProductBtn
                  text="Add to cart"
                  onClick={() => handleAddToCart(data[0])}
                />
              </div>
              <div className={classes.descriptionBlock}>
                <DescriptionAndFilterTitle text="Description" />
                {data && data.length > 0 && (
                  <ShowMoreAndLessText
                    text={data[0]?.description}
                    quantity={150}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SingleProductPage;
