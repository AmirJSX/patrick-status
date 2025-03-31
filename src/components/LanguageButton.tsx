import { motion } from 'motion/react';
import { LuGlobe } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';

const LanguageButton = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <motion.button
      className='group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-full px-5 py-2 shadow-lg'
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
      onClick={() => {
        const newLanguage = i18n.language === 'en' ? 'fa' : 'en';
        i18n.changeLanguage(newLanguage);
        navigate({
          search: { lang: newLanguage },
          to: '.',
        });
      }}
    >
      <div className='absolute inset-0 z-10 bg-white/10 backdrop-blur-md'></div>

      <div className='absolute inset-0 z-0 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-indigo-400/50'></div>

      <div className='!font-english relative z-20 flex items-center gap-2'>
        <motion.div
          className='flex items-center justify-center rounded-full'
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.7 }}
        >
          <LuGlobe size={20} />
        </motion.div>

        <motion.div
          key={i18n.language}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className='text-lg font-black'
        >
          {i18n.language === 'en' ? 'FA' : 'EN'}
        </motion.div>
      </div>
    </motion.button>
  );
};

export default LanguageButton;
