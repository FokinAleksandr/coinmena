import React from 'react';
import { Text } from 'react-native';

type TypographyProps = {
  color?: string;
  variant: 'h1' | 'h2' | 'h3';
  isBold?: boolean;
};

export function Typography(props: React.PropsWithChildren<TypographyProps>) {
  const { children, variant, color, isBold } = props;

  const fontSize = {
    h1: 22,
    h2: 18,
    h3: 14,
  }[variant];

  const fontWeight = isBold ? 'bold' : 'normal';

  return <Text style={{ fontSize, color, fontWeight }}>{children}</Text>;
}
