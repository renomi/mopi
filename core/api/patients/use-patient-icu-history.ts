import { createQuery } from 'react-query-kit';

import type { GeneralErrorResponse } from '@/core/api/types';

import { client } from '../common';

type Variables = {
  id: string;
};

export const usePatientIcuHistory = createQuery<
  unknown,
  Variables,
  GeneralErrorResponse
>({
  queryKey: ['patient-icu-history'],
  fetcher: (variables) => {
    return client
      .get(`patients/${variables?.id}/icu-history`)
      .then((response) => response.data);
  },
  staleTime: 0,
});
