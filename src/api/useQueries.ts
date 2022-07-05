import { useQuery } from 'react-query';

import { makeRequest } from '~/src/api/makeRequest';
import type { CountryType } from '~/src/entities/country';
import type { TotalSummaryType } from '~/src/entities/totalSummary';

export function useGlobalCovidStatistics() {
  return useQuery('totalSummary', () => makeRequest<TotalSummaryType>('/summary'), {
    select: data => data.Global,
  });
}

export function useCountriesCovidStatistics() {
  return useQuery('totalSummary', () => makeRequest<TotalSummaryType>('/summary'), {
    select: data => data.Countries,
  });
}

export function useListAllCountries() {
  return useQuery('countries', () => makeRequest<CountryType[]>('/countries'));
}
