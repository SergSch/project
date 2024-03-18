import classes from './StartBlockButton.module.css';
import { useSelector } from 'react-redux';

const StartBlockButton = ({ text, textSmallBtn, dontClick }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <button
      className={`${text ? classes.wrapper : classes.btn} ${
        dontClick ? classes.dontActive : ''
      } ${theme === 'dark' ? classes.dark : ''}`}
    >
      {text ? text : textSmallBtn}
    </button>
  );
};
export default StartBlockButton;
