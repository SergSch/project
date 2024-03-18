import classes from './ImagesOnProductCard.module.css';
import { ReactComponent as LikeIcon } from '../../assets/images/header/like.svg';
import { ReactComponent as CartIconNew } from '../../assets/images/cart.svg';

const ImagesOnProductCard = ({ none }) => {
  return (
    <div className={classes.wrapper}>
      <LikeIcon className={classes.img} />
      <CartIconNew
        className={classes.img}
        style={{ display: none ? 'none' : '' }}
      />
    </div>
  );
};
export default ImagesOnProductCard;
