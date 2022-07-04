import * as React from 'react';
import { ActivityIndicator, Button, StyleSheet } from 'react-native';

import { useCovidCasesSummary } from '~/src/api/useCovidCasesSummary';
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
      <Column margin={24} padding={8} style={styles.border}>
        <Typography isBold variant="h1">
          Countries card
        </Typography>
        <CountriesCard />
      </Column>
      <Column margin={24} padding={8} style={styles.border}>
        <Typography isBold variant="h1">
          Global cases statistics card
        </Typography>
        <GlobalCasesStatisticsCard />
      </Column>
    </Column>
  );
}

function CountriesCard() {
  const { data, isLoading } = useCovidCasesSummary();
  const { navigate } = useNavigation();

  if (data) {
    return (
      <Column>
        <Typography variant="h2">Top 5 countries by total cases: </Typography>
        {data.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
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
  const { data, isLoading } = useCovidCasesSummary();

  if (data) {
    return (
      <CovidData
        confirmed={data.Global.TotalConfirmed}
        deaths={data.Global.TotalDeaths}
        recovered={data.Global.TotalRecovered}
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
