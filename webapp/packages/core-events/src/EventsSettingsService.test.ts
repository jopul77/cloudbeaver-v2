/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2023 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import '@testing-library/jest-dom';

import { mockAuthentication } from '@cloudbeaver/core-authentication/mocks/mockAuthentication';
import { createApp } from '@cloudbeaver/core-cli/tests/utils/createApp';
import { ServerConfigResource } from '@cloudbeaver/core-root';
import { createGQLEndpoint } from '@cloudbeaver/core-root/mocks/createGQLEndpoint';
import { mockAppInit } from '@cloudbeaver/core-root/mocks/mockAppInit';
import { mockGraphQL } from '@cloudbeaver/core-root/mocks/mockGraphQL';
import { mockServerConfig } from '@cloudbeaver/core-root/mocks/resolvers/mockServerConfig';

import { EventsSettings, EventsSettingsService } from './EventsSettingsService';

const endpoint = createGQLEndpoint();
const app = createApp();

const server = mockGraphQL(
  ...mockAppInit(endpoint),
  ...mockAuthentication(endpoint)
);

beforeAll(() => app.init());

const equalConfig = {
  core_events: {
    notificationsPool: 1,
    maxPersistentAllow: 2,
  } as EventsSettings,
  plugin: {
    'notifications': {
      notificationsPool: 1,
      maxPersistentAllow: 2,
    } as EventsSettings,
  },
};

test('New settings equal deprecated settings', async () => {
  const settings = app.injector.getServiceByClass(EventsSettingsService);
  const config = app.injector.getServiceByClass(ServerConfigResource);

  server.use(
    endpoint.query('serverConfig', mockServerConfig(equalConfig)),
  );

  await config.refresh();

  expect(settings.settings.getValue('notificationsPool')).toBe(1);
  expect(settings.settings.getValue('maxPersistentAllow')).toBe(2);
  expect(settings.deprecatedSettings.getValue('notificationsPool')).toBe(1);
  expect(settings.deprecatedSettings.getValue('maxPersistentAllow')).toBe(2);
});