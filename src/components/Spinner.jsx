import spinner from '../assets/spinners/eclipse.gif';
import Footer from './Footer';

function Spinner() {
  return (
    <>
      <div className='w-100 my-40'>
        <img
          width={180}
          className='text-center mx-auto'
          src={spinner}
          alt='Loading...'
        />
      </div>
      <Footer />
    </>
  );
}

export default Spinner;
