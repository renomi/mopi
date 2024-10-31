import axios from 'axios';

import { requestHandler } from '@/core/api/common/utils';

export const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

client.interceptors.request.use(requestHandler);
