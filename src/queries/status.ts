import { queryOptions } from '@tanstack/react-query';
import { getStatus } from '~/services/get-status';

export const StatusQuery = (key: string, language: string, method: 'text' | 'hash' = 'hash') =>
  queryOptions({
    queryKey: ['status', { hash: key, language }],
    queryFn: () => getStatus(key, method),
    staleTime: 1000 * 60 * 5,
  });
