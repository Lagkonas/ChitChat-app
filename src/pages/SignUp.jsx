import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { signUp } from '../features/user/userSlice';
import { useCurrentMessages } from '../hooks/useCurrentMessages';
import { realtimeDB } from '../firebase.config';
import { ref, remove } from 'firebase/database';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;
  const { messages } = useCurrentMessages();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      await updateProfile(auth.currentUser, { displayName: name });

      if (user) {
        const { email, displayName } = user;
        dispatch(signUp({ email, displayName }));
        navigate('/chat');
      }
    } catch (error) {
      toast.error(error.message);
      setFormData({
        name: '',
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
