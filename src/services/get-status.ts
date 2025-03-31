import api from './api';
import i18n from '~/lib/i18n';
import { isResponseError } from 'up-fetch';
import { StatusResponse } from '~/types/status';

const API_ENDPOINT = 'get/index.php';

export const getStatus = async (key: string, method: 'text' | 'hash') => {
  const { t, language } = i18n;
  const superprivate_key = '%key%';

  try {
    const params = {
      [method]: key,
      lang: language,
      key: superprivate_key,
    };

    const data = await api<StatusResponse>(API_ENDPOINT, { params });

    return data;
  } catch (error: unknown) {
    let errorMessage = t('errors.500');

    if (isResponseError(error)) {
      errorMessage = error.data?.error || errorMessage;
    }

    throw new Error(errorMessage);
  }
};
