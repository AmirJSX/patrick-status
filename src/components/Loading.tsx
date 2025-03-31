import ClipLoader from 'react-spinners/ClipLoader';

const Loading = () => {
  return (
    <div>
      <div className='fixed top-0 left-0 z-50 h-screen w-screen bg-black/10 backdrop-blur-2xl'>
        <div className='flex h-full w-full items-center justify-center'>
          <ClipLoader color='#fff' size={100} className='w-10' />
        </div>
      </div>
    </div>
  );
};

export default Loading;
