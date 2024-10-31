import { createMutation } from 'react-query-kit';

import type { GeneralErrorResponse } from '@/core/api/types';
import type { LoginSchema } from '@/utils/validation';

import { client } from '../common';

type Response = { access_token: string };

export const useLogin = createMutation<
  Response,
  LoginSchema,
  GeneralErrorResponse
>({
  mutationFn: async (variables) =>
    client({
      url: 'auth/login',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
