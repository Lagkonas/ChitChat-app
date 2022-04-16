import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import {toast} from 'react-toastify';
import Footer from '../components/Footer';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      navigate('/sign-in');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className='hero-content mb-9 mt-9 mb-4 text-center'>
        <div className='card flex-shrink-0 w-full max-w-md shadow-lg bg-base-300'>
          <div className='card-body  pt-4'>
            <h1 className='text-xl font-bold'>Reset Password</h1>
            <form onSubmit={onSubmit}>
              <div className='form-control'>
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
                />
              </div>
              <div className='form-control mt-7'>
                <button className='btn btn-primary'>Send Reset Email</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ForgotPassword;
