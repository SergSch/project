import classes from './Sceleton.module.css';
import SceletonCard from './SceletonCard/SceletonCard';

const Sceleton = () => {
  const cards = Array.from({ length: 8 }, (_, index) => (
    <SceletonCard key={index} />
  ));
  return (
    <div className="container">
      <div className={classes.wrapper}>{cards}</div>
    </div>
  );
};
export default Sceleton;
