import { FaInfinity } from 'react-icons/fa';

const DetailBox = (detail: { label: string; value: string }) => {
  return (
    <div className='flex justify-between rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm'>
      <span className='text-lg'>{detail.label}</span>
      {detail.value === '♾' ? (
        <span className='flex items-center'>
          <FaInfinity size={25} />
        </span>
      ) : (
        <span className='font-english text-lg font-semibold'>{detail.value}</span>
      )}
    </div>
  );
};

export default DetailBox;
