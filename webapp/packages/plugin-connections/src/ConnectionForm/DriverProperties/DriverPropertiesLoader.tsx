/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2023 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import React from 'react';

export const DriverPropertiesLoader = React.lazy(async () => {
  const { DriverProperties } = await import('./DriverProperties');
  return { default: DriverProperties };
});