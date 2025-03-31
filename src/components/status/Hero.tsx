import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QRCode } from 'react-qrcode-logo';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { changeStatus } from '~/services/change-status';
import { lazy, useState } from 'react';
import { Result } from '~/types/status';
import { StatusQuery } from '~/queries/status';

const ChangeModal = lazy(() => import('./ChangeModal'));

const Hero = ({ result }: { result: Result }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, i18n } = useTranslation('', { keyPrefix: 'status' });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (config: string) => {
      return await changeStatus(config);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(StatusQuery(result.hash, i18n.language).queryKey, data);
      toast.success(t('changed'));
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleChangeConfig = () => {
    setIsModalOpen(false);
    mutation.mutate(result.hash);
  };

  return (
    <div className='flex w-full flex-col gap-5 lg:w-1/4'>
      <ChangeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleChangeConfig} />
      <div className='glass-card group flex items-center justify-center'>
        <h1 dir='ltr' className='text-rinbow font-english truncate text-3xl font-bold'>
          {result.FrontEnd.email}
        </h1>
      </div>

      <div className='glass-card flex cursor-pointer items-center justify-center !p-4'>
        <QRCode
          fgColor='#ffffff'
          bgColor='transparent'
          style={{ width: '100%', height: '100%' }}
          value={result.connect_link}
          size={1000}
          eyeRadius={50}
          quietZone={0}
          ecLevel='L'
        />
      </div>

      <div className='flex w-full justify-between gap-5'>
        <button
          onClick={() => {
            navigator.clipboard.writeText(result.connect_link);
            toast.success(t('copied'));
          }}
          className='glass-card group flex w-1/2 cursor-pointer items-center justify-center !p-4'
        >
          <span className='text-rinbow text-2xl font-bold'>{t('copy')}</span>
        </button>

        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className='glass-card group flex w-1/2 cursor-pointer items-center justify-center !p-4'
        >
          <span className='text-rinbow text-2xl font-bold'>{mutation.isPending ? t('changing') : t('change')}</span>
        </button>
      </div>
    </div>
  );
};

export default Hero;
