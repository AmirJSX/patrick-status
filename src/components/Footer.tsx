import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation('', { keyPrefix: 'footer' });
  return (
    <footer className='flex h-14 w-full items-center justify-center'>
      <p className='text-sm font-semibold lg:text-base'>{t('copyright')}</p>
    </footer>
  );
};

export default Footer;
