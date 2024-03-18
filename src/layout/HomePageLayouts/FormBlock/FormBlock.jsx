import Form from '../../../components/Form/Form';
import classes from './FormBlock.module.css';
import { useSelector } from 'react-redux';
import formImage from '../../../assets/images/homePage/formImage.png';

const FormBlock = () => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={theme === 'dark' ? classes.dark : ''}>
      <div className="container">
        <div className={classes.wrapper}>
          <h2 className={classes.title}>5% off on the first order</h2>
          <div className={classes.imgAndFormWrap}>
            <div className={classes.imgBlock}>
              <img src={formImage} alt="Img" className={classes.img} />
            </div>
            <div className={classes.formBlock}>
              <Form homePage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormBlock;
