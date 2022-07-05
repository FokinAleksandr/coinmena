import * as React from 'react';
import { ActivityIndicator, Button, StyleSheet } from 'react-native';

import { useCountriesCovidStatistics, useGlobalCovidStatistics } from '~/src/api/useQueries';
import { useNavigation } from '~/src/navigation';
import { colors } from '~/src/ui/colors';
import { CovidData } from '~/src/ui/CovidData';
import { Box, Column, Row } from '~/src/ui/layouts/layoutComponents';
import { Typography } from '~/src/ui/Typography';

export function MainScreen() {
  const { navigate } = useNavigation();

  return (
    <Column marginHorizontal={12} flex={1}>
      <Row justifyContent="flex-end">
        <Button title="add case" onPress={() => navigate('ReportCase')} />
      </Row>
      <Column margin={12} padding={8} style={styles.border}>
        <Typography isBold variant="h1">
          Countries card
        </Typography>
        <CountriesCard />
      </Column>
      <Column margin={12} padding={8} style={styles.border}>
        <Typography isBold variant="h1">
          Global cases statistics card
        </Typography>
        <GlobalCasesStatisticsCard />
      </Column>
    </Column>
  );
}

function CountriesCard() {
  const { data: countries, isLoading } = useCountriesCovidStatistics();
  const { navigate } = useNavigation();

  if (countries) {
    return (
      <Column>
        <Box marginBottom={8}>
          <Typography variant="h2">Top 5 countries by total cases: </Typography>
        </Box>
        {countries
          .sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
          .slice(0, 5)
          .map(item => (
            <Box key={item.ID}>
              <Typography variant="h3">{item.Country}</Typography>
            </Box>
          ))}
        <Button title="load more" onPress={() => navigate('CountriesList')} />
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

function GlobalCasesStatisticsCard() {
  const { data, isLoading } = useGlobalCovidStatistics();

  if (data) {
    return (
      <CovidData
        confirmed={data.TotalConfirmed}
        deaths={data.TotalDeaths}
        recovered={data.TotalRecovered}
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
}

export const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: colors.charcoal,
    borderRadius: 4,
  },
});
