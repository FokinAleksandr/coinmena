import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { useCovidCasesSummary } from '~/src/api/useQueries';
import { colors, setOpacity } from '~/src/ui/colors';
import { CovidData } from '~/src/ui/CovidData';
import { Column } from '~/src/ui/layouts/layoutComponents';
import { Typography } from '~/src/ui/Typography';

export function CountriesListScreen() {
  const { data, isLoading } = useCovidCasesSummary();

  const [isOpen, setIsOpen] = React.useState(false);
  const [filterText, setFilterText] = React.useState('');
  const [sortBy, setSortBy] = React.useState<'confirmed' | 'deaths' | 'recovered'>('confirmed');

  if (data) {
    const filteredData = data.Countries.sort((a, b) => {
      if (sortBy === 'deaths') {
        return b.TotalDeaths - a.TotalDeaths;
      } else if (sortBy === 'recovered') {
        return b.TotalRecovered - a.TotalRecovered;
      } else {
        return b.TotalConfirmed - a.TotalConfirmed;
      }
    }).filter(country =>
      country.Country.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
    );

    return (
      <Column flex={1} marginTop={24} marginHorizontal={24}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="Filter countries..."
          value={filterText}
          onChangeText={setFilterText}
        />
        <Typography variant="h3">sort by:</Typography>
        <DropDownPicker
          open={isOpen}
          value={sortBy}
          items={[
            { label: 'confirmed', value: 'confirmed' },
            { label: 'deaths', value: 'deaths' },
            { label: 'recovered', value: 'recovered' },
          ]}
          setOpen={setIsOpen}
          setValue={setSortBy}
        />
        <FlatList
          style={styles.flatList}
          data={filteredData}
          renderItem={({ item }) => (
            <Column key={item.ID} marginBottom={8}>
              <Typography variant="h1">{item.Country}</Typography>
              <CovidData
                confirmed={item.TotalConfirmed}
                deaths={item.TotalDeaths}
                recovered={item.TotalRecovered}
              />
            </Column>
          )}
        />
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
    borderRadius: 6,
    backgroundColor: setOpacity(colors.electric, 0.2),
    marginRight: 12,
    marginBottom: 12,
  },
  flatList: {
    flex: 1,
    marginTop: 12,
  },
});
