import { useEffect, useState } from 'react';
import { useGetAllGoodsQuery } from '../../store/reducers/apiGoodsSlice';
import classes from './AllProductsPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import TitleH2 from '../../components/TitleH2/TitleH2';
import SingleProductCard from './../../components/SingleProductCard/SingleProductCard';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import StartBlockButton from '../../UI/StartBlockButton/StartBlockButton';
import Line from '../../UI/Line/Line';
import FiltrationBar from '../../components/FiltrationBar/FiltrationBar';
import { useFiltration } from '../../customHooks/useFiltration';
import { addProduct, countTotalSum } from '../../store/reducers/cartSlice';
import toast from 'react-hot-toast';

export default function AllProductsPage() {
  // opened page is displayed at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { theme } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const [check, setCheck] = useState(false);
  console.log(check);

  const { data, isLoading, isError, error } = useGetAllGoodsQuery();
  const { minPrice, maxPrice, sorted } = useSelector((store) => store.filter);
  const products = useFiltration(data, minPrice, maxPrice, sorted);

  // Get id of category
  let location = useLocation();

  // Get array products of category
  const filteredByCategory = products?.filter(
    (product) => product.categoryId === location?.state?.categoryId
  );

  // Get number of passed category for initialization group of products
  const params = new URLSearchParams(location.search);
  let category = params.get('category');

  // Get array discounted products
  const filteredBySales = products?.filter(
    (product) => product.discont_price !== null
  );

  const handleAddToCart = (event, product) => {
    event.preventDefault();
    dispatch(addProduct(product));
    dispatch(countTotalSum());
    toast.success('Added to Cart successfully');
  };

  return (
    <div className={theme === 'dark' ? classes.dark : ''}>
      {isError ? <h3>Your page is {error.data.error}</h3> : null}
      <div className="container">
        <div className={classes.wrapper}>
          <div className={classes.breadCrumbs}>
            <Link to={ROUTES.HOME}>
              <StartBlockButton textSmallBtn="Main Page" />
            </Link>
            <Line short />
            {location?.state?.categoryId && (
              <>
                <Link to={ROUTES.CATEGORIES}>
                  <StartBlockButton textSmallBtn="Categories" />
                </Link>
                <Line short />
                <StartBlockButton
                  textSmallBtn={location?.state?.categoryTitle}
                />
              </>
            )}
            {!location?.state?.categoryId && category && category === '1' && (
              <StartBlockButton textSmallBtn="All products" dontClick />
            )}
            {!location?.state?.categoryId && category && category === '2' && (
              <StartBlockButton textSmallBtn="Discounted items" dontClick />
            )}
          </div>
          {location && location?.state?.categoryTitle && (
            <TitleH2 text={location?.state?.categoryTitle} />
          )}
          {category === '1' && <TitleH2 text="All products" />}
          {category === '2' && <TitleH2 text="Discounted items" />}

          <div>
            <FiltrationBar
              none={category === '2' ? 'none' : false}
              setCheck={setCheck}
            />
          </div>
          {isLoading ? (
            <div className="loading">
              <div className="loading_content"></div>
            </div>
          ) : (
            <div className={classes.productsWrapper}>
              {location &&
                filteredByCategory.map((product) => (
                  <Link
                    key={product.id}
                    to={`${ROUTES.PRODUCT.replace(':id', product.id)}`}
                  >
                    <SingleProductCard
                      key={product.id}
                      {...product}
                      handleAddToCart={(event) =>
                        handleAddToCart(event, product)
                      }
                    />
                  </Link>
                ))}
              {category &&
                category === '2' &&
                filteredBySales.map((product) => (
                  <Link
                    key={product.id}
                    to={`${ROUTES.PRODUCT.replace(':id', product.id)}`}
                  >
                    <SingleProductCard
                      key={product.id}
                      {...product}
                      handleAddToCart={(event) =>
                        handleAddToCart(event, product)
                      }
                    />
                  </Link>
                ))}
              {category &&
                category === '1' &&
                products?.map((product) => (
                  <Link
                    key={product.id}
                    to={`${ROUTES.PRODUCT.replace(':id', product.id)}`}
                  >
                    <SingleProductCard
                      key={product.id}
                      {...product}
                      handleAddToCart={(event) =>
                        handleAddToCart(event, product)
                      }
                    />
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
