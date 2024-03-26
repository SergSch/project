import ProductAndCartTitle from '../../components/ProductAndCartTitle/ProductAndCartTitle';
import classes from './SingleProductPage.module.css';
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
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/constants';
import {
  addProduct,
  countTotalSum,
  decreaseProduct,
} from '../../store/reducers/cartSlice';
import toast from 'react-hot-toast';
import StartBlockButton from '../../UI/StartBlockButton/StartBlockButton';
import Line from '../../UI/Line/Line';
import { ROUTES } from '../../utils/routes';
import { useGetAllCategoriesQuery } from '../../store/reducers/apiCatigoriesSlice';
import {
  addFavouritesItem,
  deleteFavouritesItem,
} from '../../store/reducers/favouritesSlice';
import { ReactComponent as LikeIcon } from '../../assets/images/header/like.svg';

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

  // Get category name for breadCrumbs
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const categoryName = categoriesData?.find(
    (category) => category.id === (data && data[0]?.categoryId)
  );

  const isCheckedFavourites = useSelector((state) => {
    if (!data || !data.length) return false;
    return state.favourites.favouritesProducts.some(
      (favouriteProduct) => favouriteProduct.id === data[0]?.id
    );
  });

  const { productsInCart } = useSelector((store) => store.cart);

  const dispatch = useDispatch();
  const handleAddToCart = (data) => {
    dispatch(addProduct(data));
    dispatch(countTotalSum());
    toast.success('Added to Cart successfully');
  };

  const handleAddToFavourites = (event, product) => {
    event.preventDefault();
    if (isCheckedFavourites) {
      dispatch(deleteFavouritesItem(product));
      toast.success('Delete from favourites successfully');
    } else {
      dispatch(addFavouritesItem(product));
      toast.success('Added to favourites successfully');
    }
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

  // Checking of existens of current product in the cart
  const existingProduct = productsInCart?.find(
    (product) => data && data.length > 0 && product.id === data[0]?.id
  );

  const quantityInCart = existingProduct ? existingProduct.quantity : 0;

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
          <div className={classes.breadCrumbs}>
            <Link to={ROUTES.HOME}>
              <StartBlockButton textSmallBtn="Main Page" />
            </Link>
            <Line short />
            <Link to={ROUTES.CATEGORIES}>
              <StartBlockButton textSmallBtn="Categories" />
            </Link>
            <Line short />
            <Link
              key={categoryName?.id}
              state={{
                categoryId: categoryName?.id,
                categoryTitle: categoryName?.title,
              }}
              to={ROUTES.ALLPRODUCTS}
            >
              <StartBlockButton textSmallBtn={categoryName?.title} />
            </Link>
            <Line short />
            <StartBlockButton textSmallBtn={data && data[0]?.title} dontClick />
          </div>
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

                <LikeIcon
                  className={`${classes.img} ${
                    theme === 'dark' ? classes.darkImg : ''
                  }`}
                  onClick={(e) => handleAddToFavourites(e, data[0])}
                  style={{
                    fill: isCheckedFavourites ? 'var(--green)' : '',
                  }}
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
                  // quantity={productsInCart?.quantity}
                  quantity={quantityInCart}
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
