import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MdAutorenew } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

interface ChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ChangeModal: React.FC<ChangeModalProps> = ({ isOpen, onClose, onConfirm }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  });
  const { t } = useTranslation('', { keyPrefix: 'status' });
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xl'
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='bg-primary glass-card mx-5 w-full max-w-md rounded-2xl p-8 shadow-none backdrop-blur-lg hover:shadow-none'
          >
            <div className='flex flex-col items-center space-y-6'>
              <motion.div>
                <MdAutorenew className='text-white' size={64} />
              </motion.div>

              <h2 className='text-center text-lg font-semibold'>{t('confirmChange')}</h2>

              <div className='flex w-full items-center justify-center gap-4'>
                <button onClick={onConfirm} className='glass-card w-full cursor-pointer font-bold'>
                  {t('confirm')}
                </button>
                <button onClick={onClose} className='glass-card w-full cursor-pointer font-bold'>
                  {t('cancel')}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChangeModal;
