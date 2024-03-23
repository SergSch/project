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
import { blockBtnText } from '../../utils/functions';

export default function AllProductsPage() {
  // opened page is displayed at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { theme } = useSelector((state) => state.theme);
  const { minPrice, maxPrice, sorted } = useSelector((store) => store.filter);
  const { favouritesProducts } = useSelector((store) => store.favourites);

  const dispatch = useDispatch();

  const [check, setCheck] = useState(false);

  const { data, isLoading, isError, error } = useGetAllGoodsQuery();
  const products = useFiltration(data, minPrice, maxPrice, sorted);
  const favouritesProductsFiltered = useFiltration(
    favouritesProducts,
    minPrice,
    maxPrice,
    sorted
  );

  // Get id of category
  let location = useLocation();

  // Get array products of category
  const filteredByCategory = products?.filter(
    (product) => product.categoryId === location?.state?.categoryId
  );

  // Get number of passed category for initialization group of products
  const params = new URLSearchParams(location.search);
  let category = params.get('category');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    setCheck(category === '2');
  }, [location.search]);

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
                  dontClick
                />
              </>
            )}
            {blockBtnText(category) && (
              <StartBlockButton
                textSmallBtn={blockBtnText(category)}
                dontClick
              />
            )}
          </div>
          {location && location?.state?.categoryTitle && (
            <TitleH2 text={location?.state?.categoryTitle} />
          )}
          {category === '1' && <TitleH2 text="All products" />}
          {category === '2' && <TitleH2 text="Discounted items" />}
          {category === '3' && <TitleH2 text="Liked products" />}
          <div>
            <FiltrationBar
              none={category === '2' || category === '3' ? 'none' : false}
              setCheck={setCheck}
            />
          </div>
          {isLoading ? (
            <div className="loading">
              <div className="loading_content"></div>
            </div>
          ) : (
            <div className={classes.productsWrapper}>
              {check || category === '2'
                ? filteredBySales.map((product) => (
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
                  ))
                : filteredByCategory.map((product) => (
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
                !check &&
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

              {category &&
                category === '3' &&
                !check &&
                favouritesProductsFiltered?.map((product) => (
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
