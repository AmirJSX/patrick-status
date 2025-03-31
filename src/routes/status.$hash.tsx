import { useQueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorComponent from '~/components/Error';
import Apps from '~/components/status/Apps';
import Hero from '~/components/status/Hero';
import InfoBox from '~/components/status/InfoBox';
import i18nS from '~/lib/i18n';
import { StatusQuery } from '~/queries/status';

export const Route = createFileRoute('/status/$hash')({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { hash } }) => {
    return queryClient.ensureQueryData(StatusQuery(hash, i18nS.language, 'hash'));
  },
  errorComponent: ({ error }) => {
    const queryErrorResetBoundary = useQueryErrorResetBoundary();

    useEffect(() => {
      queryErrorResetBoundary.reset();
    }, [queryErrorResetBoundary]);

    return <ErrorComponent error={error} />;
  },
});

function RouteComponent() {
  const { hash } = Route.useParams();
  const { i18n } = useTranslation();
  const { data } = useSuspenseQuery(StatusQuery(hash, i18n.language, 'hash'));

  return (
    <div className='relative mx-auto flex max-w-xl flex-col items-stretch justify-center gap-10 lg:max-w-none lg:flex-row'>
      <Hero result={data.result} />
      <InfoBox result={data.result} />
      <Apps />
    </div>
  );
}
