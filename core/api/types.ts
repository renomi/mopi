import type { AxiosError } from 'axios';

export type PaginateQuery<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};

export type GeneralErrorResponse = AxiosError<{
  message?: string;
  statusCode?: number;
}>;
