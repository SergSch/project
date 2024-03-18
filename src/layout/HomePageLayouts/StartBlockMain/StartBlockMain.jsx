import { Link } from 'react-router-dom';
import StartBlockButton from '../../../UI/StartBlockButton/StartBlockButton';
import classes from './StartBlockMain.module.css';
import { ROUTES } from '../../../utils/routes';

const StartBlockMain = () => {
  return (
    <div className={classes.wrapper}>
      <div className="container">
        <div className={classes.titleBlock}>
          <h1 className={classes.title}>
            Amazing Discounts on Garden Products!
          </h1>
          <Link to={`${ROUTES.ALLPRODUCTS}?category=2`}>
            <StartBlockButton text="Check out" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default StartBlockMain;
