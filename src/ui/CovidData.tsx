import React from 'react';

import { colors } from '~/src/ui/colors';
import { Box, Column } from '~/src/ui/layouts/layoutComponents';
import { Typography } from '~/src/ui/Typography';

type Props = {
  confirmed: number;
  deaths: number;
  recovered: number;
};

export function CovidData(props: Props) {
  const { confirmed, deaths, recovered } = props;

  const deadPercentage = (deaths * 100) / confirmed;
  const recoveredPercentage = (recovered * 100) / confirmed;

  return (
    <Column>
      <Typography variant="h3">confirmed: {confirmed}</Typography>
      <Typography variant="h3">deaths: {deaths}</Typography>
      <Typography variant="h3">recovered: {recovered}</Typography>

      <Box backgroundColor="orange" height={30} marginTop={8}>
        <Box
          backgroundColor={colors.fireOral}
          height={30}
          style={{ width: `${deadPercentage}%` }}
        />
      </Box>
      <Typography variant="h3" color={colors.fireOral}>
        dead percentage: {deadPercentage.toFixed(4)}%
      </Typography>

      <Box backgroundColor="orange" height={30} marginTop={8}>
        <Box
          backgroundColor={colors.appleGreen}
          height={30}
          style={{ width: `${recoveredPercentage}%` }}
        />
      </Box>
      <Typography variant="h3" color={colors.appleGreen}>
        recovered percentage: {recoveredPercentage.toFixed(4)}%
      </Typography>
    </Column>
  );
}
