import classes from './DayDiscount.module.css';

const DayDiscount = ({ size, onClick }) => {
  return (
    <button className={classes.wrapper} onClick={onClick}>
      1 day discount!
    </button>
  );
};
export default DayDiscount;
