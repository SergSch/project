import { useForm } from 'react-hook-form';
import classes from './CartForm.module.css';

const CartForm = ({ cart }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { handleClearCart, setModalActive } = cart;

  const handleForm = (data) => {
    console.log(data);
    handleClearCart();
    setModalActive(true);
    reset();
  };

  return (
    <form className={classes.formWrapper} onSubmit={handleSubmit(handleForm)}>
      <input
        type="text"
        id="firstname"
        placeholder="Name"
        className={classes.input}
        {...register('firstname', {
          required: 'Wrong input. Try again',
          minLength: {
            value: 1,
            message: 'too short name',
          },
          maxLength: {
            value: 30,
            message: 'Too long name',
          },
          pattern: {
            value: /^[a-zA-Z\s]*$/,
            message: 'Incorrect name',
          },
        })}
      />

      <input
        type="text"
        id="phone"
        placeholder="Phone number"
        className={classes.input}
        {...register('phone', {
          required: 'Wrong input. Try again',
          pattern: {
            value: /\(?\+\(?49\)?[ ()]?([- ()]?\d[- ()]?){10}/g,
            message: 'Please enter correct phone number',
          },
        })}
      />

      <input
        type="text"
        id="email"
        placeholder="Email"
        className={classes.input}
        {...register('email', {
          required: 'Wrong input. Try again',
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: 'Please enter correct email',
          },
        })}
      />
      <button className={classes.btn}>Order</button>
    </form>
  );
};
export default CartForm;
