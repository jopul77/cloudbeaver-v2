/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2023 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

export const NodeManagerUtils = {
  connectionIdToConnectionNodeId(connectionId: string): string {
    return `database://${connectionId}`;
  },

  isDatabaseObject(objectId: string): boolean {
    return objectId.startsWith('database://');
  },

  concatSchemaAndCatalog(catalogId?: string, schemaId?: string): string {
    return `${schemaId || ''}${schemaId && catalogId ? '@' : ''}${catalogId || ''}`;
  },
};
