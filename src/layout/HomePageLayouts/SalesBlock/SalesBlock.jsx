import { Link } from 'react-router-dom';
import { useGetAllGoodsQuery } from '../../../store/reducers/apiGoodsSlice';
import classes from './SalesBlock.module.css';
import { useSelector, useDispatch } from 'react-redux';
import TitleBlockWithLine from '../../../components/TitleBlockWithLine/TitleBlockWithLine';
import SingleProductCard from '../../../components/SingleProductCard/SingleProductCard';
import { ROUTES } from '../../../utils/routes';
import StartBlockButton from '../../../UI/StartBlockButton/StartBlockButton';
import { addProduct, countTotalSum } from '../../../store/reducers/cartSlice';
import toast from 'react-hot-toast';
import {
  addFavouritesItem,
  checkIfProductFavourite,
  deleteFavouritesItem,
} from '../../../store/reducers/favouritesSlice';

const SalesBlock = () => {
  const { data } = useGetAllGoodsQuery();
  const { theme } = useSelector((state) => state.theme);
  const { favourites } = useSelector((state) => state.favourites);

  const dispatch = useDispatch();

  // Get random products with discount
  const discountedProducts = data?.filter((product) => product.discont_price);
  const shuffledProducts = discountedProducts?.sort(() => Math.random() - 0.5);

  const handleAddToCart = (event, product) => {
    event.preventDefault();
    dispatch(addProduct(product));
    dispatch(countTotalSum());
    toast.success('Added to Cart successfully');
  };

  const handleAddToFavourites = (event, product) => {
    event.preventDefault();
    const isProductFavourite = favourites?.some(
      (elem) => elem.id === product.id
    );
    if (isProductFavourite) {
      dispatch(deleteFavouritesItem(product));
      toast.success('Delete from favourites successfully');
    } else {
      dispatch(addFavouritesItem(product));
      toast.success('Added to favourites successfully');
    }
  };

  return (
    <div className={` ${theme === 'dark' ? classes.dark : ''}`}>
      <div className="container">
        <div className={classes.wrapper}>
          <TitleBlockWithLine
            text="Sale"
            textSmallBtn="All sales"
            link={`${ROUTES.ALLPRODUCTS}?category=2`}
          />
          <div className={classes.salesCardWrapper}>
            {shuffledProducts?.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                to={`${ROUTES.PRODUCT.replace(':id', product.id)}`}
              >
                <SingleProductCard
                  {...product}
                  handleAddToCart={(event) => handleAddToCart(event, product)}
                  handleAddToFavourites={(event) =>
                    handleAddToFavourites(event, product)
                  }
                />
              </Link>
            ))}
          </div>
          <div className={classes.bottomSmallBtn}>
            <Link to={`${ROUTES.ALLPRODUCTS}?category=2`}>
              <StartBlockButton textSmallBtn="All sales" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SalesBlock;
