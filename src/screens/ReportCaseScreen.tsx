import React, { useState } from 'react';
import { ActivityIndicator, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useQueryClient } from 'react-query';

import { useListAllCountries } from '~/src/api/useQueries';
import type { TotalSummaryType } from '~/src/entities/totalSummary';
import { useNavigation } from '~/src/navigation';
import { colors } from '~/src/ui/colors';
import { Column } from '~/src/ui/layouts/layoutComponents';
import { Typography } from '~/src/ui/Typography';

export function ReportCaseScreen() {
  const { data: countries, isLoading } = useListAllCountries();
  const { goBack } = useNavigation();

  const [isCountriesOpen, setIsCountriesOpen] = useState(false);
  const [isCaseTypeOpen, setCaseTypeDDOpen] = useState(false);
  const [sortBy, setSortBy] = React.useState<'confirmed' | 'deaths' | 'recovered'>('confirmed');
  const [selectedCountry, setSelectedCountry] = React.useState<null | string>(null);

  const queryClient = useQueryClient();

  const handleSubmit = () => {
    if (!selectedCountry) {
      return;
    }
    queryClient.setQueryData<TotalSummaryType | undefined>('totalSummary', data => {
      if (!data) {
        return data;
      }
      return {
        ...data,
        Global: {
          ...data.Global,
          TotalConfirmed:
            sortBy === 'confirmed' ? data.Global.TotalConfirmed + 1 : data.Global.TotalConfirmed,
          TotalRecovered:
            sortBy === 'recovered' ? data.Global.TotalRecovered + 1 : data.Global.TotalRecovered,
          TotalDeaths: sortBy === 'deaths' ? data.Global.TotalDeaths + 1 : data.Global.TotalDeaths,
        },
        Countries: data.Countries.map(country => {
          if (country.Slug !== selectedCountry) {
            return country;
          }
          return {
            ...country,
            TotalConfirmed:
              sortBy === 'confirmed' ? country.TotalConfirmed + 1 : country.TotalConfirmed,
            TotalRecovered:
              sortBy === 'recovered' ? country.TotalRecovered + 1 : country.TotalRecovered,
            TotalDeaths: sortBy === 'deaths' ? country.TotalDeaths + 1 : country.TotalDeaths,
          };
        }),
      };
    });
    goBack();
  };

  const renderCountriesDropDown = () => {
    if (countries) {
      return (
        <DropDownPicker
          zIndex={2000}
          zIndexInverse={2000}
          open={isCountriesOpen}
          value={selectedCountry}
          items={countries.map(item => ({ label: item.Country, value: item.Slug }))}
          setOpen={setIsCountriesOpen}
          setValue={setSelectedCountry}
        />
      );
    }
    if (isLoading) {
      return <ActivityIndicator />;
    }

    return (
      <Typography variant="h3" color={colors.fireOral}>
        Something went wrong
      </Typography>
    );
  };

  return (
    <Column flex={1}>
      <DropDownPicker
        zIndex={3000}
        zIndexInverse={1000}
        open={isCaseTypeOpen}
        value={sortBy}
        items={[
          { label: 'confirmed', value: 'confirmed' },
          { label: 'deaths', value: 'deaths' },
          { label: 'recovered', value: 'recovered' },
        ]}
        setOpen={setCaseTypeDDOpen}
        setValue={setSortBy}
      />
      {renderCountriesDropDown()}
      <Button title="Submit case" onPress={handleSubmit} />
    </Column>
  );
}
