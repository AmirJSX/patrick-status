import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import '~/lib/i18n';
import '~/styles/fonts.css';
import '~/styles/variables.css';
import '~/styles/utilities.css';
import '~/styles/main.css';
import Providers from '~/providers/Providers';
import Header from '~/components/Header';
import FlowingCurves from '~/components/FlowingCurves';
import type { QueryClient } from '@tanstack/react-query';
import Footer from '~/components/Footer';
import { useTranslation } from 'react-i18next';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  const { t } = useTranslation('', { keyPrefix: 'meta' });
  return (
    <>
      <title>CHECK STATUS</title>
      <meta name='description' content={t('description')} />
      <Providers>
        <div className='mx-auto max-w-[1440px]'>
          <Header />
          <main className='flex min-h-[calc(100dvh-136px)] p-5 sm:p-7 lg:p-9'>
            <Outlet />
          </main>
          <Footer />
          <FlowingCurves />
        </div>
      </Providers>
    </>
  );
}
