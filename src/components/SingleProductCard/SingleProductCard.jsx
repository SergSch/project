import ElementDiscount from '../../UI/ElementDiscount/ElementDiscount';
import { BASE_URL } from '../../utils/constants';
import GoodsCategoriesTitle from '../GoodsCategoriesTitle/GoodsCategoriesTitle';
import TitleThrough from '../TitleThrough/TitleThrough';
import classes from './SingleProductCard.module.css';
import ProductAndCartTitle from './../ProductAndCartTitle/ProductAndCartTitle';
import { useSelector } from 'react-redux';
import { ReactComponent as LikeIcon } from '../../assets/images/header/like.svg';
import { ReactComponent as CartIconNew } from '../../assets/images/cart.svg';

const SingleProductCard = ({
  title,
  image,
  price,
  discont_price,
  none,
  handleAddToCart,
  handleAddToFavourites,
}) => {
  const { theme } = useSelector((state) => state.theme);

  const percentDiscount = Math.round(((price - discont_price) / price) * 100);

  return (
    <div className={classes.wrap}>
      <div
        className={none ? classes.modalWrapper : classes.wrapper}
        style={{ backgroundImage: `url(${BASE_URL}/${image})` }}
      >
        <div className={classes.elemDiscontWrap}>
          {discont_price && <ElementDiscount discount={percentDiscount} />}
        </div>
        <div className={classes.imagesWrap}>
          <div className={classes.wrapperIcons}>
            <LikeIcon className={classes.img} onClick={handleAddToFavourites} />
            <CartIconNew
              className={classes.img}
              style={{ display: none ? 'none' : '' }}
              onClick={handleAddToCart}
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
            text={discont_price ? `$${discont_price}` : `$${price}`}
            weight
            none={none ? none : ''}
          />
          {discont_price && <TitleThrough text={`${'$' + price}`} smallText />}
        </div>
      </div>
    </div>
  );
};
export default SingleProductCard;
