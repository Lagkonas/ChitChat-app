import { useState } from 'react';
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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

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
      setFormData({});
    }
    setLoading(false)
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className='space-between'>
        <div className='hero-content  text-center'>
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
      </div>
    </>
  );
}

export default SignUp;
