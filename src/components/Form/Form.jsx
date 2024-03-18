import classes from './Form.module.css';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import error from '../../assets/images/icons/Error.svg';

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleForm = (data) => {
    console.log(data);
    reset();
    toast.success('You will receive your discount by email');
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
      {errors.email && (
        <div style={{ color: 'var(--white)' }}>
          <img src={error} alt="Error" /> {errors.email.message}
        </div>
      )}
      <button className={classes.btn}>Get a discount</button>
    </form>
  );
};
export default Form;
