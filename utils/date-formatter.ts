import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

export const formatDateToId = (
  payload?: string | number,
  formatDate = 'dd MMMM yyyy',
) => {
  if (typeof payload === 'number') {
    return format(new Date(payload * 1000), formatDate, {
      locale: id,
    });
  }
  const date = payload ?? new Date().toISOString();

  return format(parseISO(date), formatDate, {
    locale: id,
  });
};
