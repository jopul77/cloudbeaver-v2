/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2023 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import type { TeamInfo } from '@cloudbeaver/core-authentication';
import { PlaceholderContainer } from '@cloudbeaver/core-blocks';
import { injectable } from '@cloudbeaver/core-di';

export interface ITeamDetailsInfoProps {
  team: TeamInfo;
}

@injectable()
export class TeamsAdministrationService {
  readonly teamDetailsInfoPlaceholder = new PlaceholderContainer<ITeamDetailsInfoProps>();
}
