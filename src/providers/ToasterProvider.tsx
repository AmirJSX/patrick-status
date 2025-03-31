import { Toaster } from 'react-hot-toast';

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        className: 'glass-card! bg-primary! transition-none! bg-black/20! text-white! font-medium! text-center!',
      }}
    />
  );
};

export default ToasterProvider;
