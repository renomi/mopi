import { createQuery } from 'react-query-kit';

import type { GeneralErrorResponse } from '@/core/api/types';

import { client } from '../common';

export type DoctorProfile = {
  createdAt: string;
  id: string;
  hospitalIds: string[];
  name: string;
  specialization: string;
  username: string;
  email: string;
  phoneNumber: string;
  updatedAt: string;
};

export const useProfile = createQuery<any, never, GeneralErrorResponse>({
  queryKey: ['profile'],
  fetcher: () => {
    return client.get(`doctors/profile`).then((response) => response.data);
  },
});
