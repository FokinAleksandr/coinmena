import React from 'react';

import { Column } from '~/src/ui/layouts/layoutComponents';
import { Typography } from '~/src/ui/Typography';

type Props = {
  confirmed: number;
  deaths: number;
  recovered: number;
};

export function CovidData(props: Props) {
  const { confirmed, deaths, recovered } = props;
  return (
    <Column>
      <Typography variant="h3">recovered: {recovered}</Typography>
      <Typography variant="h3">confirmed: {confirmed}</Typography>
      <Typography variant="h3">deaths: {deaths}</Typography>
    </Column>
  );
}
