/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2023 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import type * as CodeMirror from 'codemirror';

declare module 'codemirror' {
  interface ModeInfo {
    name: string;
    mime: string;
    mode: string;
    ext?: string[];
    alias?: string[];
  }
  function findModeByName(name: string): ModeInfo | undefined;
}
