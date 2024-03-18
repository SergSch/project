import classes from './TitleH2.module.css';
import { useSelector } from 'react-redux';

const TitleH2 = ({ text }) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <h2 className={`${classes.title} ${theme === 'dark' ? classes.dark : ''}`}>
      {text}
    </h2>
  );
};

export default TitleH2;
