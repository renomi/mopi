import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import type { LoginSchema } from '@/utils/validation';

import { client } from '../common';

export const useLogin = createMutation<Response, LoginSchema, AxiosError>({
  mutationFn: async (variables) =>
    client({
      url: 'auth/login',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
