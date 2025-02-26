/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2023 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { Placeholder, TopAppBar } from '@cloudbeaver/core-blocks';
import { useService } from '@cloudbeaver/core-di';

import { TopNavService } from './TopNavService';

interface Props {
  className?: string;
}

export const TopNavBar: React.FC<Props> = function TopNavBar({ className }) {
  const topNavService = useService(TopNavService);

  return (
    <TopAppBar className={className}>
      <Placeholder container={topNavService.placeholder} />
    </TopAppBar>
  );
};