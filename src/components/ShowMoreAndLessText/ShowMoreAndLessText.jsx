import { useState } from 'react';
import classes from './ShowMoreAndLessText.module.css';
import { useSelector } from 'react-redux';

const ShowMoreAndLessText = ({ text, quantity }) => {
  const { theme } = useSelector((state) => state.theme);
  const [isShow, setIsShow] = useState(false);

  return (
    <div>
      {isShow ? (
        <p
          className={`${classes.txt} ${
            theme === 'dark' ? classes.colorWhite : ''
          }`}
        >
          {text}
        </p>
      ) : (
        <p
          className={`${classes.txt} ${
            theme === 'dark' ? classes.colorWhite : ''
          }`}
        >
          {text.substring(0, quantity)} ...
        </p>
      )}
      <p
        className={`${classes.showTxt} ${
          theme === 'dark' ? classes.colorWhite : ''
        }`}
        onClick={() => setIsShow(!isShow)}
      >
        {isShow ? 'Hide' : 'Read more'}
      </p>
    </div>
  );
};
export default ShowMoreAndLessText;
