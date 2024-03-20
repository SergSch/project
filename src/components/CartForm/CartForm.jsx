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
          required: true,
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
      <p style={{ color: 'red' }}>{errors.firstname?.message}</p>

      <input
        type="text"
        id="phone"
        placeholder="Phone number"
        className={classes.input}
        {...register('phone', {
          required: true,
          pattern: {
            value: /\(?\+\(?49\)?[ ()]?([- ()]?\d[- ()]?){10}/g,
            message: 'Please enter correct phone number',
          },
        })}
      />
      <p style={{ color: 'red' }}>{errors.phone?.message}</p>

      <input
        type="text"
        id="email"
        placeholder="Email"
        className={classes.input}
        {...register('email', {
          required: true,
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: 'Please enter correct email',
          },
        })}
      />
      <p style={{ color: 'red' }}>{errors.email?.message}</p>
      <button className={classes.btn}>Order</button>
    </form>
  );
};
export default CartForm;
