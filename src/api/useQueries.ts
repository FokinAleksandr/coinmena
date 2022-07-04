import { useQuery } from 'react-query';

import { makeRequest } from '~/src/api/makeRequest';
import type { CountryType } from '~/src/entities/country';
import type { TotalSummaryType } from '~/src/entities/totalSummary';

export function useCovidCasesSummary() {
  return useQuery('totalSummary', () => makeRequest<TotalSummaryType>('/summary'));
}

export function useCountries() {
  return useQuery('countries', () => makeRequest<CountryType[]>('/countries'));
}
