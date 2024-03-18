import classes from './GoodsCategoriesTitle.module.css';
import { useSelector } from 'react-redux';

const GoodsCategoriesTitle = ({ text, footer }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <h4
      className={`${
        footer
          ? classes.footerTitle
          : `${classes.title} ${theme === 'dark' ? classes.dark : ''}`
      }`}
    >
      {text}
    </h4>
  );
};
export default GoodsCategoriesTitle;
