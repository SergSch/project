import classes from './ProductAndCartTitle.module.css';
import { useSelector } from 'react-redux';

const ProductAndCartTitle = ({ text, weight, none }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <h3
      className={`${classes.txt} ${theme === 'dark' ? classes.dark : ''}`}
      style={{
        fontWeight: weight ? '600' : '700',
        color: none ? 'var(--black)' : '',
      }}
    >
      {text}
    </h3>
  );
};
export default ProductAndCartTitle;
