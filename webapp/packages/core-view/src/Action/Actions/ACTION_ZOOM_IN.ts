/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2023 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { createAction } from '../createAction';

export const ACTION_ZOOM_IN = createAction('zoom-in', {
  label: 'core_view_zoom_in',
  tooltip: 'core_view_zoom_in',
  icon: '/icons/zoom-in.svg',
});
