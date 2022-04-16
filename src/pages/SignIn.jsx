import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { signIn } from '../features/user/userSlice';
import Footer from '../components/Footer';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

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
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='hero-content mb-9 mt-9 mb-4 text-center'>
        <div className='card flex-shrink-0 w-full max-w-md shadow-lg bg-base-300'>
          <div className='card-body  pt-4'>
            <h1 className='text-xl font-bold'>Sign In</h1>
            <form onSubmit={onSubmit}>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  type='text'
                  id='email'
                  value={email}
                  placeholder='email'
                  className='input input-bordered mb-3 input-primary'
                  onChange={onChange}
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  type='text'
                  id='password'
                  value={password}
                  placeholder='password'
                  className='input input-bordered input-primary'
                  onChange={onChange}
                />
                <label className='label justify-end'>
                  <a href='#' className='label-text-alt link-hover'>
                    Forgot password?
                  </a>
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
