import { createQuery } from 'react-query-kit';

import type { GeneralErrorResponse } from '@/core/api/types';

import { client } from '../common';

export type HospitalPatient = {
  id: string;
  name: string;
  healthStatus: string;
};

export type HospitalPatientSection = {
  name: string;
  patients: HospitalPatient[];
};

export const usePatients = createQuery<
  HospitalPatientSection[],
  never,
  GeneralErrorResponse
>({
  queryKey: ['patients'],
  fetcher: () => {
    return client
      .get(`doctors/patients-lists`)
      .then((response) => response.data);
  },
  gcTime: 1 * 60 * 1000,
  staleTime: 0,
});
