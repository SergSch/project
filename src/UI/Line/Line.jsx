import classes from './Line.module.css';

const Line = ({ short }) => {
  return (
    <div className={classes.line} style={{ width: short ? '16px' : '' }}></div>
  );
};
export default Line;
