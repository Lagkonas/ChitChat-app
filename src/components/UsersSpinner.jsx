import spinner from '../assets/spinners/ring.gif'

function UsersSpinner() {
  return (
    <div className='w-full h-3/4 absolute flex justify-center items-center'>
    <img
      width={100}
      className='text-center mx-auto block'
      src={spinner}
      alt='Loading...'
    />
  </div>
  )
}

export default UsersSpinner