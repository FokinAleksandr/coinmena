import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TextInput } from 'react-native';

import { useCovidCasesSummary } from '~/src/api/useCovidCasesSummary';
import { colors, setOpacity } from '~/src/ui/colors';
import { CovidData } from '~/src/ui/CovidData';
import { Box, Column } from '~/src/ui/layouts/layoutComponents';
import { Typography } from '~/src/ui/Typography';

export function CountriesListScreen() {
  const { data, isLoading } = useCovidCasesSummary();

  const [filterText, setFilterText] = React.useState('');

  if (data) {
    return (
      <Column flex={1} margin={24}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="Filter countries..."
          value={filterText}
          onChangeText={setFilterText}
        />
        <Box marginTop={12}>
          <FlatList
            data={data.Countries.filter(country =>
              country.Country.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
            )}
            renderItem={({ item }) => (
              <Column key={item.ID}>
                <Typography variant="h1">{item.Country}</Typography>
                <CovidData
                  confirmed={item.TotalConfirmed}
                  deaths={item.TotalDeaths}
                  recovered={item.TotalRecovered}
                />
              </Column>
            )}
          />
        </Box>
      </Column>
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
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 8,
    height: 40,
    width: 200,
    borderRadius: 6,
    backgroundColor: setOpacity(colors.electric, 0.2),
    marginRight: 12,
    color: colors.white,
  },
});
