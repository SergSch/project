import { NavLink } from 'react-router-dom';
import DayDiscount from '../../UI/DayDiscount/DayDiscount';
import classes from './Navigation.module.css';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../utils/routes';

const Navigation = ({ setModalActive }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`${classes.wrapper} ${
        theme === 'dark' ? classes.wrapperDark : ''
      }`}
    >
      <DayDiscount onClick={() => setModalActive(true)} />
      <nav>
        <ul className={classes.nav}>
          <li className={classes.text}>
            <NavLink
              to={ROUTES.HOME}
              className={`${classes.link} ${
                theme === 'dark' ? classes.dark : classes.light
              }`}
            >
              Main Page
            </NavLink>
          </li>
          <li className={classes.text}>
            <NavLink
              to={ROUTES.CATEGORIES}
              className={`${classes.link} ${
                theme === 'dark' ? classes.dark : classes.light
              }`}
            >
              Categories
            </NavLink>
          </li>
          <li className={classes.text}>
            <NavLink
              to={`${ROUTES.ALLPRODUCTS}?category=1`}
              className={`${classes.link} ${
                theme === 'dark' ? classes.dark : classes.light
              }`}
            >
              All products
            </NavLink>
          </li>
          <li className={classes.text}>
            <NavLink
              to={`${ROUTES.ALLPRODUCTS}?category=2`}
              className={`${classes.link} ${
                theme === 'dark' ? classes.dark : classes.light
              }`}
            >
              All sales
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Navigation;
