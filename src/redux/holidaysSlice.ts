import { api } from './api';
import { Holiday } from '../../@types/custom';

interface HolidaysState {
  find(arg0: (el: Holiday) => boolean): Holiday | undefined;
  holidays: Holiday[];
}

export const holidaysApi = api.injectEndpoints({
  endpoints: (build) => ({
    getHolidays: build.query<HolidaysState, []>({
      query: () => 'api/v3/NextPublicHolidaysWorldwide',
      providesTags: ['Holidays'],
    }),
  }),
});

export const { useGetHolidaysQuery } = holidaysApi;
