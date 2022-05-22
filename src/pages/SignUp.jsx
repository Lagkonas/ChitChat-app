import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset, signUp } from '../features/user/userSlice';
import { useClearMessages } from '../hooks/useClearMessages';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { authUser, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.user
  );

  const { name, email, password } = formData;

  useClearMessages();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
      setFormData({
        name: '',
        email: '',
        password: '',
      });
    }
    if (isSuccess || authUser) {
      navigate('/chat');
    }

    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [authUser,dispatch,isSuccess,isError,message,navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
    };

    dispatch(signUp(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div
        id='sign-in-form'
        className='hero-content flex items-center mx-auto h-auto justify-center text-center'
      >
        <div className='card  flex-shrink-0 w-full max-w-md shadow-lg bg-base-300'>
          <div className='card-body  pt-4'>
            <h1 className='text-xl font-bold'>Sign Up</h1>
            <form onSubmit={onSubmit}>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Username</span>
                </label>
                <input
                  type='text'
                  id='name'
                  value={name}
                  placeholder='username'
                  className='input input-bordered mb-3 input-primary'
                  onChange={onChange}
                  required
                  autoComplete='off'
                />
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  type='email'
                  id='email'
                  value={email}
                  placeholder='email'
                  className='input input-bordered mb-3 input-primary'
                  onChange={onChange}
                  required
                  autoComplete='off'
                />
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  type='password'
                  id='password'
                  value={password}
                  placeholder='password'
                  className='input input-bordered input-primary'
                  onChange={onChange}
                  required
                  autoComplete='off'
                />
              </div>
              <div className='form-control mt-10'>
                <button className='btn btn-primary'>Sign up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;
