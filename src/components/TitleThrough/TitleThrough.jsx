import classes from './TitleThrough.module.css';

const TitleThrough = ({ text, smallText }) => {
  return (
    <h4 className={smallText ? classes.smallText : classes.txt}>{text}</h4>
  );
};
export default TitleThrough;
