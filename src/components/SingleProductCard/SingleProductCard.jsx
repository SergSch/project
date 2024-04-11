import ElementDiscount from '../../UI/ElementDiscount/ElementDiscount';
import { BASE_URL } from '../../utils/constants';
import GoodsCategoriesTitle from '../GoodsCategoriesTitle/GoodsCategoriesTitle';
import TitleThrough from '../TitleThrough/TitleThrough';
import classes from './SingleProductCard.module.css';
import ProductAndCartTitle from './../ProductAndCartTitle/ProductAndCartTitle';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as LikeIcon } from '../../assets/images/header/like.svg';
import { ReactComponent as CartIconNew } from '../../assets/images/cart.svg';
import { addProduct, countTotalSum } from '../../store/reducers/cartSlice';
import toast from 'react-hot-toast';
import {
  addFavouritesItem,
  deleteFavouritesItem,
} from '../../store/reducers/favouritesSlice';

const SingleProductCard = ({ product, none }) => {
  const { theme } = useSelector((state) => state.theme);
  const { id, title, image, price, discont_price } = product;

  // get dayDiscounted price
  function isDiscountedProduct() {
    return id === 14 ? price / 2 : null;
  }
  const discountedPrice = isDiscountedProduct();
  const dayDiscountedPrice = 50;

  const isCheckedFavourites = useSelector((state) => {
    return state.favourites.favouritesProducts.some(
      (favouriteProduct) => favouriteProduct.id === id
    );
  });

  const isCheckedProductInCart = useSelector((state) => {
    return state.cart.productsInCart.some((product) => product.id === id);
  });

  const dispatch = useDispatch();

  const handleAddToCart = (event) => {
    event.preventDefault();
    dispatch(addProduct(product));
    dispatch(countTotalSum());
    toast.success('Added to Cart successfully');
  };

  const handleAddToFavourites = (event) => {
    event.preventDefault();
    if (isCheckedFavourites) {
      dispatch(deleteFavouritesItem(product));
      toast.success('Delete from favourites successfully');
    } else {
      dispatch(addFavouritesItem(product));
      toast.success('Added to favourites successfully');
    }
  };

  const percentDiscount = Math.round(((price - discont_price) / price) * 100);

  return (
    <div className={classes.wrap}>
      <div
        className={none ? classes.modalWrapper : classes.wrapper}
        style={{ backgroundImage: `url(${BASE_URL}/${image})` }}
      >
        <div className={classes.elemDiscontWrap}>
          {discont_price && <ElementDiscount discount={percentDiscount} />}
          {discountedPrice && <ElementDiscount discount={dayDiscountedPrice} />}
        </div>
        <div className={classes.imagesWrap}>
          <div className={classes.wrapperIcons}>
            <LikeIcon
              className={classes.img}
              onClick={handleAddToFavourites}
              style={{
                fill: isCheckedFavourites ? 'var(--green)' : '',
              }}
            />
            <CartIconNew
              className={classes.img}
              onClick={handleAddToCart}
              style={{
                display: none ? 'none' : '',
                fill: isCheckedProductInCart ? 'var(--green)' : '',
              }}
            />
          </div>
        </div>
      </div>
      <div
        className={`${classes.aboutBlock} ${
          theme === 'dark' ? classes.dark : ''
        }`}
        style={{ backgroundColor: none ? 'var(--white)' : '' }}
      >
        <GoodsCategoriesTitle
          text={`${title ? title.substring(0, 17) : ''}...`}
          none={none ? none : ''}
        />
        <div className={classes.priceBlock}>
          <ProductAndCartTitle
            text={
              discountedPrice
                ? `$${discountedPrice}`
                : discont_price
                ? `$${discont_price}`
                : `$${price}`
            }
            weight
            none={none ? none : ''}
          />
          {discont_price && <TitleThrough text={`${'$' + price}`} smallText />}
          {discountedPrice && (
            <TitleThrough text={`${'$' + price}`} smallText />
          )}
        </div>
      </div>
    </div>
  );
};
export default SingleProductCard;
