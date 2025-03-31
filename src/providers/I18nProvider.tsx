import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import Loading from '~/components/Loading';

const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (i18n.isInitializing) {
      return;
    }
    const dir = i18n.dir(i18n.language);
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
    toast.dismiss();
    setLoading(false);
  }, [i18n, i18n.language]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default I18nProvider;
