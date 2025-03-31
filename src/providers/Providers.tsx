import { type ReactNode } from 'react';
import I18nProvider from './I18nProvider';
import ToasterProvider from './ToasterProvider';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <I18nProvider>
      <ToasterProvider />
      {children}
    </I18nProvider>
  );
};

export default Providers;
