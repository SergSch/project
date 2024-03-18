import classes from './ProductModal.module.css';

const ProductModal = ({ active, setActive, children, discountModal }) => {
  return (
    <div
      className={`${classes.modal} ${active ? classes.active : ''}`}
      onClick={() => setActive(false)}
    >
      <div
        className={`${
          discountModal ? classes.discountModal : classes.content
        } ${active ? classes.active : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
export default ProductModal;
