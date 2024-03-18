import { useEffect } from 'react';
import SingleCategoryCard from '../../components/SingleCategoryCard/SingleCategoryCard';
import TitleH2 from '../../components/TitleH2/TitleH2';
import { useGetAllCategoriesQuery } from '../../store/reducers/apiCatigoriesSlice';
import classes from './CategoriesPage.module.css';
import { useSelector } from 'react-redux';
import StartBlockButton from './../../UI/StartBlockButton/StartBlockButton';
import { Link } from 'react-router-dom';
import { ROUTES } from './../../utils/routes';
import Line from '../../UI/Line/Line';

const CategoriesPage = () => {
  // opened page is displayed at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading, isError, error } = useGetAllCategoriesQuery();

  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={`${classes.wrap} ${theme === 'dark' ? classes.dark : ''}`}>
      {isError ? <h3>Your page is {error.data.error}</h3> : null}
      <div className="container">
        <div className={classes.wrapper}>
          <div className={classes.breadCrumbs}>
            <Link to={ROUTES.HOME}>
              <StartBlockButton textSmallBtn="Main Page" />
            </Link>
            <Line />
            <StartBlockButton textSmallBtn="Categories" dontClick />
          </div>
          <TitleH2 text="Categories" />
          {isLoading && (
            <div className="loading">
              <div className="loading_content"></div>
            </div>
          )}
          <div className={classes.categoryWrapper}>
            {data?.map((category) => (
              <Link
                key={category.id}
                state={{
                  categoryId: category.id,
                  categoryTitle: category.title,
                }}
                to={ROUTES.ALLPRODUCTS}
              >
                <SingleCategoryCard {...category} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoriesPage;
