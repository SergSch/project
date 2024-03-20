import classes from './GoodsCategoriesTitle.module.css';
import { useSelector } from 'react-redux';

const GoodsCategoriesTitle = ({ text, footer, none }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <h4
      className={`${
        footer
          ? classes.footerTitle
          : `${classes.title} ${theme === 'dark' ? classes.dark : ''}`
      }`}
      style={{ color: none ? 'var(--black)' : '' }}
    >
      {text}
    </h4>
  );
};
export default GoodsCategoriesTitle;
