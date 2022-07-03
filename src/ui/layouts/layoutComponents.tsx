import * as React from 'react';
import { useMemo } from 'react';
import type { FlexStyle, StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';

import { addChildMargin } from '~/src/ui/layouts/utils';

import { styles } from './layoutComponentsStyles';

export type Spaces = 0 | 2 | 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64 | 80;

type StyleProps = {
  style?: StyleProp<ViewStyle>;
  flex?: FlexStyle['flex'];
  justifyContent?: FlexStyle['justifyContent'];
  alignItems?: FlexStyle['alignItems'];
  flexWrap?: FlexStyle['flexWrap'];
  margin?: Spaces;
  marginTop?: Spaces;
  marginBottom?: Spaces;
  marginLeft?: Spaces;
  marginRight?: Spaces;
  marginHorizontal?: Spaces;
  marginVertical?: Spaces;
  padding?: Spaces;
  paddingTop?: Spaces;
  paddingBottom?: Spaces;
  paddingLeft?: Spaces;
  paddingRight?: Spaces;
  paddingHorizontal?: Spaces;
  paddingVertical?: Spaces;
  children?: React.ReactNode;
  width?: Spaces;
  height?: Spaces;
};

export function Box(props: StyleProps) {
  const { children, style, ...rest } = props;

  return <View style={[rest, style]}>{children}</View>;
}

type RowAndColumnProps = {
  gap?: Spaces;
  isReversed?: boolean;
} & StyleProps;

export function Row(props: RowAndColumnProps) {
  const { children, style, gap = 0, isReversed = false, ...rest } = props;

  const styledChildren = useMemo(() => addChildMargin(children, gap, 'X'), [children, gap]);

  return (
    <Box style={[isReversed ? styles.rowDirectionReversed : styles.rowDirection, rest, style]}>
      {styledChildren}
    </Box>
  );
}

export function Column(props: RowAndColumnProps) {
  const { children, style, gap = 0, isReversed = false, ...rest } = props;

  const styledChildren = useMemo(() => addChildMargin(children, gap, 'Y'), [children, gap]);

  return (
    <Box
      style={[isReversed ? styles.columnDirectionReversed : styles.columnDirection, rest, style]}
    >
      {styledChildren}
    </Box>
  );
}
