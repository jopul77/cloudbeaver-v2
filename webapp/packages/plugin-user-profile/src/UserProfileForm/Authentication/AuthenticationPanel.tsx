/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2023 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { observer } from 'mobx-react-lite';
import styled from 'reshadow';

import { BASE_CONTAINERS_STYLES, ColoredContainer, Container, useStyles } from '@cloudbeaver/core-blocks';
import type { ComponentStyle } from '@cloudbeaver/core-theming';
import { BASE_TAB_STYLES, TabPanel } from '@cloudbeaver/core-ui';

import { ChangePassword } from './ChangePassword/ChangePassword';

interface Props {
  className?: string;
  style?: ComponentStyle;
}

export const AuthenticationPanel = observer<Props>(function AuthenticationPanel({ className, style }) {
  const styles = useStyles(BASE_TAB_STYLES, style, BASE_CONTAINERS_STYLES);

  return styled(styles)(
    <TabPanel tabId='authentication' className={className}>
      <ColoredContainer wrap overflow parent gap>
        <Container medium gap>
          <ChangePassword />
        </Container>
      </ColoredContainer>
    </TabPanel>
  );
});
