import { Link } from 'react-router-dom';
import Line from '../../UI/Line/Line';
import TitleH2 from '../TitleH2/TitleH2';
import classes from './TitleBlockWithLine.module.css';
import StartBlockButton from '../../UI/StartBlockButton/StartBlockButton';

const TitleBlockWithLine = ({ text, textSmallBtn, link }) => {
  return (
    <div className={classes.wrapper}>
      <TitleH2 text={text} />
      <div className={classes.btn_block}>
        <Line />
        <div className={classes.topSmallBtn}>
          <Link to={link}>
            <StartBlockButton textSmallBtn={textSmallBtn} />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default TitleBlockWithLine;
