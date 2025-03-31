import { Link } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaHome } from 'react-icons/fa';
import { useI18nStore } from '~/stores/i18nStore';

const ErrorComponent = ({ error }: { error: Error }) => {
  const { t } = useTranslation('', { keyPrefix: 'errors' });
  const { toggle } = useI18nStore();

  useEffect(() => {
    toggle(false);
    return () => {
      toggle(true);
    };
  }, [toggle]);

  return (
    <div className='flex w-full flex-1 items-center justify-center text-2xl font-semibold'>
      <div className='glass-card flex flex-col items-center justify-center gap-10 !px-20 !py-10'>
        <h1 className=''>{error.message}</h1>
        <Link to='/' className='flex flex-row gap-3'>
          <FaHome size={30} />
          <p>{t('home')}</p>
        </Link>
      </div>
    </div>
  );
};

export default ErrorComponent;
