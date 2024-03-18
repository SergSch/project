import { useEffect } from 'react';
import CategoriesBlockMain from '../../layout/HomePageLayouts/CategoriesBlockMain/CategoriesBlockMain';
import SalesBlock from '../../layout/HomePageLayouts/SalesBlock/SalesBlock';
import StartBlockMain from '../../layout/HomePageLayouts/StartBlockMain/StartBlockMain';

// import classes from './HomePage.module.css';

const HomePage = () => {
  // opened page is displayed at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <StartBlockMain />
      <CategoriesBlockMain />
      <SalesBlock />
    </div>
  );
};
export default HomePage;
