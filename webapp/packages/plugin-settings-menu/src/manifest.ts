/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2021 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import type { PluginManifest } from '@cloudbeaver/core-di';
import { PluginBootstrap } from './PluginBootstrap';

export const settingsMenuPlugin: PluginManifest = {
  info: { name: 'Settings menu plugin' },
  providers: [
    PluginBootstrap,
  ],
};