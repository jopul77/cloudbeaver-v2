/*
 * CloudBeaver - Cloud Database Manager
 * Copyright (C) 2020-2023 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { css } from 'reshadow';

export const menuPanelStyles = css`
    menu-box {
      composes: theme-background-surface theme-text-on-surface from global;
    }
    MenuItem,
    MenuItemCheckbox,
    MenuItemRadio,
    MenuButton,
    MenuItemElement {
      composes: theme-ripple from global;
    }
    menu-panel-item, MenuSeparator {
      composes: theme-border-color-background from global;
    }
    MenuButton {
      background: none;
      border: none;
      outline: none !important;
      color: inherit;
      cursor: pointer;
      & box {
        display: flex;
        align-items: center;
        flex: 1;
        height: inherit;
      }
    }
    Menu {
      outline: none;
      z-index: 999;
    }
    MenuPanel[submenu] {
      margin-top: -12px;
    }
    menu-box {
      composes: theme-typography--body2 theme-elevation-z5 from global;
      min-width: 140px;
      padding: 12px 0;

      & menu-box {
        margin-top: -12px;
      }
    }

    menu-box {
      display: flex;
      flex-direction: column;

      &:not([|hasBindings]) menu-item-binding {
        width: 0;
      }
    }

    Menu[modal] menu-box {
      overflow: auto;
      max-height: 80vh;
      overflow-x: hidden;
    }

    MenuItem, MenuItemCheckbox, MenuItemRadio {
      display: flex;
      align-items: center;
      border: none;
      padding: 0;
      background: none;
      text-align: left;
      outline: none;
      color: inherit;
      cursor: pointer;
      white-space: nowrap;
      
      &[use|hidden] {
        display: none;
      }

      &:global([aria-selected="true"]) {
        opacity: 0.7;
      }

      &:hover, &:global([aria-expanded="true"]) {
        & Icon {
          opacity: 1;
        }
      }
    }

    MenuSeparator {
      flex: 1;
      width: 100%;
      display: flex;
      margin: 4px 0;
      border: none !important;
      border-bottom: 1px solid !important;

      &:first-child, &:last-child {
        display: none;
      }
    }

    menu-item-binding {
      composes: theme-typography--caption from global;
    }

    menu-panel-item {
      flex: 1;
      display: flex;
      position: relative;
      align-items: center;
      height: 30px;
      padding: 0 4px;

      & menu-item-text, & menu-item-binding  {
        display: block;
        padding: 0 4px;
      }
      & menu-item-binding {
        flex: 1;
        text-align: right;
        padding-left: 32px;
        width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & menu-item-icon,
      & menu-item-content {
        width: 24px;
        height: 24px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      & menu-item-content Icon {
        width: 10px;
        height: 10px;
      }
      & Icon {
        width: 16px;
        height: 16px;
        opacity: 0.5;
      }
      & IconOrImage {
        width: 16px;
        height: 16px;
        object-fit: contain;
      }
      & Loader {
        width: 16px;
      }
    }

    Menu[rtl] {
      & menu-item-text {
        text-align: right;
      }
      & menu-panel-item menu-item-content Icon {
        transform: rotate(180deg);
      }
    }
  `;
