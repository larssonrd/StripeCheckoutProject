import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface RegisterFormData {
  email: string;
  name: string;
  street: string;
  city: string;
  postcode: string;
  country: string;
  password: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await axios.post('http://localhost:3000/api/auth/register', data);
      navigate('/login');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Register
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form
          className='space-y-6'
          onSubmit={handleSubmit(handleRegister)}
        >
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Email address
            </label>
            <div className='mt-2'>
              <input
                {...register('email', { required: true })}
                type='email'
                autoComplete='email'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
              {errors.email && (
                <p className='text-red-500'>Email is required</p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Name
            </label>
            <div className='mt-2'>
              <input
                {...register('name', { required: true })}
                type='text'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
              {errors.name && (
                <p className='text-red-500'>Name is required</p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor='street'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Street address
            </label>
            <div className='mt-2'>
              <input
                {...register('street', { required: true })}
                type='text'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
              {errors.street && (
                <p className='text-red-500'>Street is required</p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor='city'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              City
            </label>
            <div className='mt-2'>
              <input
                {...register('city', { required: true })}
                type='text'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
              {errors.city && (
                <p className='text-red-500'>City is required</p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor='postcode'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Postcode
            </label>
            <div className='mt-2'>
              <input
                {...register('postcode', { required: true })}
                type='text'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
              {errors.postcode && (
                <p className='text-red-500'>Postcode is required</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor='country'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Country
            </label>
            <div className='mt-2'>
              <select
                {...register('country', { required: true })}
                defaultValue='Sweden'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              >
                <option value='Sweden'>Sweden</option>
              </select>
              {errors.country && (
                <p className='text-red-500'>Country is required</p>
              )}
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Password
              </label>
            </div>
            <div className='mt-2'>
              <input
                {...register('password', { required: true })}
                type='password'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
              {errors.password && (
                <p className='text-red-500'>Password is required</p>
              )}
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
