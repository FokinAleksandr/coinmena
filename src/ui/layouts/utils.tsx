import React from 'react';

import type { Spaces } from '~/src/ui/layouts/layoutComponents';
import { Box } from '~/src/ui/layouts/layoutComponents';

export const addChildMargin = (
  children: React.ReactNode,
  gap: Spaces,
  axis: 'X' | 'Y'
): React.ReactNode => {
  const childrenLength = React.Children.count(children);
  const spacingProp = axis === 'X' ? { width: gap } : { height: gap };

  return React.Children.map(children, (child, index) => {
    if (React.isValidElement<{ key?: unknown }>(child)) {
      return (
        <React.Fragment key={child.key ?? `spaced-child-${index}`}>
          {child}
          {index < childrenLength - 1 && <Box {...spacingProp} />}
        </React.Fragment>
      );
    }

    return child;
  });
};
