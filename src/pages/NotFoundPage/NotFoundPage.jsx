import classes from './NotFoundPage.module.css';
import notFound4 from './../../assets/images/NotFoundPage/notFound.png';
import notFound from './../../assets/images/NotFoundPage/notFoundImg.png';
import { Link } from 'react-router-dom';
import MainButton from './../../UI/MainButton/MainButton';
import TitleH2 from '../../components/TitleH2/TitleH2';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const NotFoundPage = () => {
  // opened page is displayed at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={` ${theme === 'dark' ? classes.dark : ''}`}>
      <div className="container">
        <div className={classes.wrapper}>
          <div className={classes.bigSignsBlock}>
            <img
              src={notFound4}
              alt="notFound4"
              className={classes.numberFour}
            />
            <img src={notFound} alt="img notFound" className={classes.bigImg} />
            <img
              src={notFound4}
              alt="notFound4"
              className={classes.numberFour}
            />
          </div>
          <TitleH2 text="Page Not Found" />
          <p className={classes.paragraph}>
            We’re sorry, the page you requested could not be found. <br />{' '}
            Please go back to the homepage.
          </p>
          <Link to={'/'}>
            <MainButton text="Go Home" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFoundPage;
