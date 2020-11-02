/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { createContext } from 'react';
import { TabStateReturn } from 'reakit/Tab';

import { IExecutor } from '@cloudbeaver/core-executor';

import { TabsContainer } from './TabsContainer';

export interface ITabData<T = Record<string, any>> {
  tabId: string;
  props: T;
}

export interface ITabsContext<T = Record<string, any>> {
  state: TabStateReturn;
  container?: TabsContainer<T>;
  lazy: boolean;
  props: T;
  openExecutor: IExecutor<ITabData<T>>;
  closeExecutor: IExecutor<ITabData<T>>;
  open: (tabId: string) => void;
  close: (tabId: string) => void;
}

export const TabsContext = createContext<ITabsContext<any> | undefined>(
  undefined
);
