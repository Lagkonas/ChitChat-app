import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <div className='hero w-auto  '>
        <div className='hero-content pt-32 text-center'>
          <div className='max-w-l'>
            <h1 className='text-5xl font-bold'>Welcome to ChitChat!</h1>
            <p className='text-2xl py-3'>
              A simple chat app that connects people
            </p>
            <p className='text-xl pt-6'>
              Please sign up or login to start chating with your friends
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
