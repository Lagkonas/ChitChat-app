import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { signIn } from '../features/user/userSlice';
import { useCurrentMessages } from '../hooks/useCurrentMessages';
import { realtimeDB } from '../firebase.config';
import { ref, remove } from 'firebase/database';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';

function SignIn() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const { messages } = useCurrentMessages();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const now = Date.now();
    const twoHours = 7200000;
    messages.forEach((message) => {
      if (now - message.timestamp > twoHours) {
        remove(ref(realtimeDB, message.uid));
      }
    });
  }, [messages]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        const user = auth.currentUser;
        const { email, displayName } = user;
        dispatch(signIn({ email, displayName }));
        navigate('/chat');
      }
    } catch (error) {
      toast.error(error.message);
      setFormData({
        email: '',
        password: '',
      });
    }
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div
        id='sign-in-form'
        className='hero-content flex items-center mx-auto h-auto justify-center text-center'
      >
        <div className='card flex-shrink-0 w-full max-w-md shadow-lg bg-base-300'>
          <div className='card-body  pt-4'>
            <h1 className='text-xl font-bold'>Sign In</h1>
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
                  autoComplete='off'
                />
              </div>
              <div className='form-control'>
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
                <label className='label justify-end'>
                  <Link
                    to='/forgot-password'
                    className='label-text-alt link-hover'
                  >
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className='form-control mt-7'>
                <button className='btn btn-primary'>Sign In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignIn;
