import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '~/lib/utils';
import { Result } from '~/types/status';
import DetailBox from './DetailBox';

const InfoBox = ({ result }: { result: Result }) => {
  const { t } = useTranslation('', { keyPrefix: 'status' });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const total = result.stat.total;
    const totalUsed = result.stat.totalUsed;
    setProgress(Math.floor((totalUsed / total) * 100));
  }, [result.FrontEnd.totalUsed, result.FrontEnd.total, result.stat.total, result.stat.totalUsed]);

  const details = [
    {
      label: t('expire'),
      value: result.FrontEnd.expiryTime,
    },
    {
      label: t('totalTraffic'),
      value: result.FrontEnd.total,
    },
    {
      label: t('trafficRemaining'),
      value: result.FrontEnd.trafficRemaining,
    },
    {
      label: t('totalUsaged'),
      value: result.FrontEnd.totalUsed,
    },
    {
      label: t('download'),
      value: result.FrontEnd.down,
    },
    {
      label: t('upload'),
      value: result.FrontEnd.up,
    },
  ];

  return (
    <div className='glass-card h-fit w-full p-5 font-medium lg:w-2/4'>
      <div className='mb-8 flex items-center justify-between'>
        <h2 className='text-rinbow text-3xl font-bold'>{t('status')}</h2>
        <div className='flex items-center gap-3'>
          <span
            className={cn('text-xl font-semibold', {
              'text-green-500': result.FrontEnd.status,
              'text-red-500': !result.FrontEnd.status,
            })}
          >
            {result.FrontEnd.status ? t('active') : t('inactive')}
          </span>
        </div>
      </div>

      <div className='grid-col-1 mb-8 grid gap-2'>
        {details.map((detail, index) => (
          <DetailBox key={index} label={detail.label} value={detail.value} />
        ))}
      </div>

      {result.FrontEnd.total !== '♾' && result.FrontEnd.trafficRemaining !== '♾' && (
        <div className='mb-6'>
          <div className='mb-2 flex justify-between'>
            <span className='text-lg text-gray-300'>{t('usage')}</span>
            <span className='text-lg text-gray-300'>{progress}%</span>
          </div>
          <div className='h-3 w-full overflow-hidden rounded-full bg-black/20'>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className='h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500'
            ></motion.div>
          </div>
        </div>
      )}

      <div className='rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm'>
        <div className='flex items-center gap-3'>
          <div
            className={cn('h-3 w-3 rounded-full', {
              'bg-green-500': result.stat.online,
              'bg-red-500': !result.stat.online,
            })}
          ></div>
          <span className='text-lg'>{result.stat.online ? t('online') : t('offline')}</span>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
