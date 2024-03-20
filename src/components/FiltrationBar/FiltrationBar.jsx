import {
  maxPriceChange,
  minPriceChange,
  sortedChange,
} from '../../store/reducers/filterSlice';
import DescriptionAndFilterTitle from '../DescriptionAndFilterTitle/DescriptionAndFilterTitle';
import classes from './FiltrationBar.module.css';
import { useDispatch, useSelector } from 'react-redux';

const FiltrationBar = ({ none, setCheck }) => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <form className={classes.form}>
      <div className={classes.inputBlock}>
        <label htmlFor="minprice">
          <DescriptionAndFilterTitle text="Price" />
        </label>
        <input
          className={`${classes.input} ${theme === 'dark' ? classes.dark : ''}`}
          type="text"
          id="minprice"
          placeholder="from"
          onChange={(event) => dispatch(minPriceChange(event.target.value))}
        />
        <input
          className={`${classes.input} ${theme === 'dark' ? classes.dark : ''}`}
          type="text"
          id=""
          placeholder="to"
          onChange={(event) => dispatch(maxPriceChange(event.target.value))}
        />
      </div>
      <label
        htmlFor="check"
        className={classes.label}
        style={{ display: none ? 'none' : '' }}
      >
        <DescriptionAndFilterTitle text="Discounted items" />
        <input
          type="checkbox"
          id="check"
          className={classes.checkbox}
          onChange={(e) => setCheck(e.target.checked)}
        />
        <span className={classes.fake}></span>
      </label>
      <div className={classes.selectBlock}>
        <label htmlFor="sort">
          <DescriptionAndFilterTitle text="Sorted" />
        </label>
        <select
          className={`${classes.select} ${
            theme === 'dark' ? classes.dark : ''
          }`}
          id="sort"
          onChange={(event) => dispatch(sortedChange(event.target.value))}
        >
          <option>by default</option>
          <option value="asc">Ascending by price</option>
          <option value="desc">Descending by price</option>
          <option value="titleA">By title Aa-Zz</option>
          <option value="titleZ">By title Zz-Aa</option>
        </select>
      </div>
    </form>
  );
};
export default FiltrationBar;
