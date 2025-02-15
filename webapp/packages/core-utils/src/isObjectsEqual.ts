/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2023 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import isEqual from 'fast-deep-equal';

export function isObjectsEqual(
  a: any,
  b: any
): boolean {
  return isEqual(a, b);
}
