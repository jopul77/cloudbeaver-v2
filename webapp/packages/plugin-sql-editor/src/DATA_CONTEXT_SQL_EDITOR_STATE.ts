/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2023 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { createDataContext } from '@cloudbeaver/core-view';

import type { ISqlEditorTabState } from './ISqlEditorTabState';

export const DATA_CONTEXT_SQL_EDITOR_STATE = createDataContext<ISqlEditorTabState>('sql-editor-state');
