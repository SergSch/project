import classes from './AddProductBtn.module.css';

const AddProductBtn = ({ text, cart, onClick }) => {
  // Button for SingleProduct & Cart
  return (
    <button className={cart ? classes.cartBtn : classes.btn} onClick={onClick}>
      {text}
    </button>
  );
};
export default AddProductBtn;
