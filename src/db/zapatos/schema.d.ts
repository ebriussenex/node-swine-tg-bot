/*
** DON'T EDIT THIS FILE **
It's been generated by Zapatos, and is liable to be overwritten

Zapatos: https://jawj.github.io/zapatos/
Copyright (C) 2020 - 2022 George MacKerron
Released under the MIT licence: see LICENCE file
*/

declare module 'zapatos/schema' {

  import type * as db from 'zapatos/db';

  // got a type error on schemaVersionCanary below? update by running `npx zapatos`
  export interface schemaVersionCanary extends db.SchemaVersionCanary { version: 104 }


  /* === schema: public === */

  /* --- enums --- */
  /* (none) */

  /* --- tables --- */

  /**
   * **swines**
   * - Table in database
   */
  export namespace swines {
    export type Table = 'swines';
    export interface Selectable {
      /**
      * **swines.id**
      * - `int4` in database
      * - `NOT NULL`, default: `nextval('swines_id_seq'::regclass)`
      */
    id: number;
      /**
      * **swines.owner_id**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    owner_id: string;
      /**
      * **swines.chat_id**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    chat_id: string;
      /**
      * **swines.name**
      * - `text` in database
      * - `NOT NULL`, default: `'Swine'::text`
      */
    name: string;
      /**
      * **swines.weight**
      * - `int4` in database
      * - `NOT NULL`, default: `5`
      */
    weight: number;
      /**
      * **swines.last_time_fed**
      * - `timestamptz` in database
      * - `NOT NULL`, default: `(CURRENT_TIMESTAMP - '1 day'::interval)`
      */
    last_time_fed: Date;
      /**
      * **swines.last_time_fought**
      * - `timestamptz` in database
      * - `NOT NULL`, default: `(CURRENT_TIMESTAMP - '1 day'::interval)`
      */
    last_time_fought: Date;
      /**
      * **swines.win**
      * - `int4` in database
      * - `NOT NULL`, default: `0`
      */
    win: number;
      /**
      * **swines.loss**
      * - `int4` in database
      * - `NOT NULL`, default: `0`
      */
    loss: number;
      /**
      * **swines.draw**
      * - `int4` in database
      * - `NOT NULL`, default: `0`
      */
    draw: number;
      /**
      * **swines.fed_times**
      * - `int4` in database
      * - `NOT NULL`, default: `0`
      */
    fed_times: number;
      /**
      * **swines.to_delete**
      * - `bool` in database
      * - `NOT NULL`, default: `false`
      */
    to_delete: boolean;
    }
    export interface JSONSelectable {
      /**
      * **swines.id**
      * - `int4` in database
      * - `NOT NULL`, default: `nextval('swines_id_seq'::regclass)`
      */
    id: number;
      /**
      * **swines.owner_id**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    owner_id: string;
      /**
      * **swines.chat_id**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    chat_id: string;
      /**
      * **swines.name**
      * - `text` in database
      * - `NOT NULL`, default: `'Swine'::text`
      */
    name: string;
      /**
      * **swines.weight**
      * - `int4` in database
      * - `NOT NULL`, default: `5`
      */
    weight: number;
      /**
      * **swines.last_time_fed**
      * - `timestamptz` in database
      * - `NOT NULL`, default: `(CURRENT_TIMESTAMP - '1 day'::interval)`
      */
    last_time_fed: db.TimestampTzString;
      /**
      * **swines.last_time_fought**
      * - `timestamptz` in database
      * - `NOT NULL`, default: `(CURRENT_TIMESTAMP - '1 day'::interval)`
      */
    last_time_fought: db.TimestampTzString;
      /**
      * **swines.win**
      * - `int4` in database
      * - `NOT NULL`, default: `0`
      */
    win: number;
      /**
      * **swines.loss**
      * - `int4` in database
      * - `NOT NULL`, default: `0`
      */
    loss: number;
      /**
      * **swines.draw**
      * - `int4` in database
      * - `NOT NULL`, default: `0`
      */
    draw: number;
      /**
      * **swines.fed_times**
      * - `int4` in database
      * - `NOT NULL`, default: `0`
      */
    fed_times: number;
      /**
      * **swines.to_delete**
      * - `bool` in database
      * - `NOT NULL`, default: `false`
      */
    to_delete: boolean;
    }
    export interface Whereable {
      /**
      * **swines.id**
      * - `int4` in database
      * - `NOT NULL`, default: `nextval('swines_id_seq'::regclass)`
      */
    id?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
      /**
      * **swines.owner_id**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    owner_id?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **swines.chat_id**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    chat_id?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **swines.name**
      * - `text` in database
      * - `NOT NULL`, default: `'Swine'::text`
      */
    name?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **swines.weight**
      * - `int4` in database
      * - `NOT NULL`, default: `5`
      */
    weight?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
      /**
      * **swines.last_time_fed**
      * - `timestamptz` in database
      * - `NOT NULL`, default: `(CURRENT_TIMESTAMP - '1 day'::interval)`
      */
    last_time_fed?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.SQLFragment | db.ParentColumn>;
      /**
      * **swines.last_time_fought**
      * - `timestamptz` in database
      * - `NOT NULL`, default: `(CURRENT_TIMESTAMP - '1 day'::interval)`
      */
    last_time_fought?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.SQLFragment | db.ParentColumn>;
      /**
      * **swines.win**
      * - `int4` in database
      * - `NOT NULL`, default: `0`
      */
    win?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
      /**
      * **swines.loss**
      * - `int4` in database
      * - `NOT NULL`, default: `0`
      */
    loss?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
      /**
      * **swines.draw**
      * - `int4` in database
      * - `NOT NULL`, default: `0`
      */
    draw?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
      /**
      * **swines.fed_times**
      * - `int4` in database
      * - `NOT NULL`, default: `0`
      */
    fed_times?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
      /**
      * **swines.to_delete**
      * - `bool` in database
      * - `NOT NULL`, default: `false`
      */
    to_delete?: boolean | db.Parameter<boolean> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, boolean | db.Parameter<boolean> | db.SQLFragment | db.ParentColumn>;
    }
    export interface Insertable {
      /**
      * **swines.id**
      * - `int4` in database
      * - `NOT NULL`, default: `nextval('swines_id_seq'::regclass)`
      */
    id?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment;
      /**
      * **swines.owner_id**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    owner_id: string | db.Parameter<string> | db.SQLFragment;
      /**
      * **swines.chat_id**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    chat_id: string | db.Parameter<string> | db.SQLFragment;
      /**
      * **swines.name**
      * - `text` in database
      * - `NOT NULL`, default: `'Swine'::text`
      */
    name?: string | db.Parameter<string> | db.DefaultType | db.SQLFragment;
      /**
      * **swines.weight**
      * - `int4` in database
      * - `NOT NULL`, default: `5`
      */
    weight?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment;
      /**
      * **swines.last_time_fed**
      * - `timestamptz` in database
      * - `NOT NULL`, default: `(CURRENT_TIMESTAMP - '1 day'::interval)`
      */
    last_time_fed?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.DefaultType | db.SQLFragment;
      /**
      * **swines.last_time_fought**
      * - `timestamptz` in database
      * - `NOT NULL`, default: `(CURRENT_TIMESTAMP - '1 day'::interval)`
      */
    last_time_fought?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.DefaultType | db.SQLFragment;
      /**
      * **swines.win**
      * - `int4` in database
      * - `NOT NULL`, default: `0`
      */
    win?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment;
      /**
      * **swines.loss**
      * - `int4` in database
      * - `NOT NULL`, default: `0`
      */
    loss?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment;
      /**
      * **swines.draw**
      * - `int4` in database
      * - `NOT NULL`, default: `0`
      */
    draw?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment;
      /**
      * **swines.fed_times**
      * - `int4` in database
      * - `NOT NULL`, default: `0`
      */
    fed_times?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment;
      /**
      * **swines.to_delete**
      * - `bool` in database
      * - `NOT NULL`, default: `false`
      */
    to_delete?: boolean | db.Parameter<boolean> | db.DefaultType | db.SQLFragment;
    }
    export interface Updatable {
      /**
      * **swines.id**
      * - `int4` in database
      * - `NOT NULL`, default: `nextval('swines_id_seq'::regclass)`
      */
    id?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.DefaultType | db.SQLFragment>;
      /**
      * **swines.owner_id**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    owner_id?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      /**
      * **swines.chat_id**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    chat_id?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      /**
      * **swines.name**
      * - `text` in database
      * - `NOT NULL`, default: `'Swine'::text`
      */
    name?: string | db.Parameter<string> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.DefaultType | db.SQLFragment>;
      /**
      * **swines.weight**
      * - `int4` in database
      * - `NOT NULL`, default: `5`
      */
    weight?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.DefaultType | db.SQLFragment>;
      /**
      * **swines.last_time_fed**
      * - `timestamptz` in database
      * - `NOT NULL`, default: `(CURRENT_TIMESTAMP - '1 day'::interval)`
      */
    last_time_fed?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.DefaultType | db.SQLFragment>;
      /**
      * **swines.last_time_fought**
      * - `timestamptz` in database
      * - `NOT NULL`, default: `(CURRENT_TIMESTAMP - '1 day'::interval)`
      */
    last_time_fought?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.DefaultType | db.SQLFragment>;
      /**
      * **swines.win**
      * - `int4` in database
      * - `NOT NULL`, default: `0`
      */
    win?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.DefaultType | db.SQLFragment>;
      /**
      * **swines.loss**
      * - `int4` in database
      * - `NOT NULL`, default: `0`
      */
    loss?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.DefaultType | db.SQLFragment>;
      /**
      * **swines.draw**
      * - `int4` in database
      * - `NOT NULL`, default: `0`
      */
    draw?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.DefaultType | db.SQLFragment>;
      /**
      * **swines.fed_times**
      * - `int4` in database
      * - `NOT NULL`, default: `0`
      */
    fed_times?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.DefaultType | db.SQLFragment>;
      /**
      * **swines.to_delete**
      * - `bool` in database
      * - `NOT NULL`, default: `false`
      */
    to_delete?: boolean | db.Parameter<boolean> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, boolean | db.Parameter<boolean> | db.DefaultType | db.SQLFragment>;
    }
    export type UniqueIndex = 'swines_pkey';
    export type Column = keyof Selectable;
    export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
    export type SQLExpression = Table | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Whereable | Column | db.ParentColumn | db.GenericSQLExpression;
    export type SQL = SQLExpression | SQLExpression[];
  }

  /**
   * **tg_chats**
   * - Table in database
   */
  export namespace tg_chats {
    export type Table = 'tg_chats';
    export interface Selectable {
      /**
      * **tg_chats.id**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    id: string;
      /**
      * **tg_chats.chat_type**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    chat_type: string;
      /**
      * **tg_chats.title**
      * - `text` in database
      * - Nullable, no default
      */
    title: string | null;
      /**
      * **tg_chats.first_name**
      * - `text` in database
      * - Nullable, no default
      */
    first_name: string | null;
      /**
      * **tg_chats.last_name**
      * - `text` in database
      * - Nullable, no default
      */
    last_name: string | null;
    }
    export interface JSONSelectable {
      /**
      * **tg_chats.id**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    id: string;
      /**
      * **tg_chats.chat_type**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    chat_type: string;
      /**
      * **tg_chats.title**
      * - `text` in database
      * - Nullable, no default
      */
    title: string | null;
      /**
      * **tg_chats.first_name**
      * - `text` in database
      * - Nullable, no default
      */
    first_name: string | null;
      /**
      * **tg_chats.last_name**
      * - `text` in database
      * - Nullable, no default
      */
    last_name: string | null;
    }
    export interface Whereable {
      /**
      * **tg_chats.id**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    id?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **tg_chats.chat_type**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    chat_type?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **tg_chats.title**
      * - `text` in database
      * - Nullable, no default
      */
    title?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **tg_chats.first_name**
      * - `text` in database
      * - Nullable, no default
      */
    first_name?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **tg_chats.last_name**
      * - `text` in database
      * - Nullable, no default
      */
    last_name?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
    }
    export interface Insertable {
      /**
      * **tg_chats.id**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    id: string | db.Parameter<string> | db.SQLFragment;
      /**
      * **tg_chats.chat_type**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    chat_type: string | db.Parameter<string> | db.SQLFragment;
      /**
      * **tg_chats.title**
      * - `text` in database
      * - Nullable, no default
      */
    title?: string | db.Parameter<string> | null | db.DefaultType | db.SQLFragment;
      /**
      * **tg_chats.first_name**
      * - `text` in database
      * - Nullable, no default
      */
    first_name?: string | db.Parameter<string> | null | db.DefaultType | db.SQLFragment;
      /**
      * **tg_chats.last_name**
      * - `text` in database
      * - Nullable, no default
      */
    last_name?: string | db.Parameter<string> | null | db.DefaultType | db.SQLFragment;
    }
    export interface Updatable {
      /**
      * **tg_chats.id**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    id?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      /**
      * **tg_chats.chat_type**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    chat_type?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      /**
      * **tg_chats.title**
      * - `text` in database
      * - Nullable, no default
      */
    title?: string | db.Parameter<string> | null | db.DefaultType | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | null | db.DefaultType | db.SQLFragment>;
      /**
      * **tg_chats.first_name**
      * - `text` in database
      * - Nullable, no default
      */
    first_name?: string | db.Parameter<string> | null | db.DefaultType | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | null | db.DefaultType | db.SQLFragment>;
      /**
      * **tg_chats.last_name**
      * - `text` in database
      * - Nullable, no default
      */
    last_name?: string | db.Parameter<string> | null | db.DefaultType | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | null | db.DefaultType | db.SQLFragment>;
    }
    export type UniqueIndex = 'tg_chats_pkey';
    export type Column = keyof Selectable;
    export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
    export type SQLExpression = Table | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Whereable | Column | db.ParentColumn | db.GenericSQLExpression;
    export type SQL = SQLExpression | SQLExpression[];
  }

  /**
   * **tg_users**
   * - Table in database
   */
  export namespace tg_users {
    export type Table = 'tg_users';
    export interface Selectable {
      /**
      * **tg_users.id**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    id: string;
      /**
      * **tg_users.is_bot**
      * - `bool` in database
      * - `NOT NULL`, no default
      */
    is_bot: boolean;
      /**
      * **tg_users.first_name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    first_name: string;
      /**
      * **tg_users.last_name**
      * - `text` in database
      * - Nullable, no default
      */
    last_name: string | null;
      /**
      * **tg_users.username**
      * - `text` in database
      * - Nullable, no default
      */
    username: string | null;
    }
    export interface JSONSelectable {
      /**
      * **tg_users.id**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    id: string;
      /**
      * **tg_users.is_bot**
      * - `bool` in database
      * - `NOT NULL`, no default
      */
    is_bot: boolean;
      /**
      * **tg_users.first_name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    first_name: string;
      /**
      * **tg_users.last_name**
      * - `text` in database
      * - Nullable, no default
      */
    last_name: string | null;
      /**
      * **tg_users.username**
      * - `text` in database
      * - Nullable, no default
      */
    username: string | null;
    }
    export interface Whereable {
      /**
      * **tg_users.id**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    id?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **tg_users.is_bot**
      * - `bool` in database
      * - `NOT NULL`, no default
      */
    is_bot?: boolean | db.Parameter<boolean> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, boolean | db.Parameter<boolean> | db.SQLFragment | db.ParentColumn>;
      /**
      * **tg_users.first_name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    first_name?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **tg_users.last_name**
      * - `text` in database
      * - Nullable, no default
      */
    last_name?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **tg_users.username**
      * - `text` in database
      * - Nullable, no default
      */
    username?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
    }
    export interface Insertable {
      /**
      * **tg_users.id**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    id: string | db.Parameter<string> | db.SQLFragment;
      /**
      * **tg_users.is_bot**
      * - `bool` in database
      * - `NOT NULL`, no default
      */
    is_bot: boolean | db.Parameter<boolean> | db.SQLFragment;
      /**
      * **tg_users.first_name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    first_name: string | db.Parameter<string> | db.SQLFragment;
      /**
      * **tg_users.last_name**
      * - `text` in database
      * - Nullable, no default
      */
    last_name?: string | db.Parameter<string> | null | db.DefaultType | db.SQLFragment;
      /**
      * **tg_users.username**
      * - `text` in database
      * - Nullable, no default
      */
    username?: string | db.Parameter<string> | null | db.DefaultType | db.SQLFragment;
    }
    export interface Updatable {
      /**
      * **tg_users.id**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    id?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      /**
      * **tg_users.is_bot**
      * - `bool` in database
      * - `NOT NULL`, no default
      */
    is_bot?: boolean | db.Parameter<boolean> | db.SQLFragment | db.SQLFragment<any, boolean | db.Parameter<boolean> | db.SQLFragment>;
      /**
      * **tg_users.first_name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
    first_name?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      /**
      * **tg_users.last_name**
      * - `text` in database
      * - Nullable, no default
      */
    last_name?: string | db.Parameter<string> | null | db.DefaultType | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | null | db.DefaultType | db.SQLFragment>;
      /**
      * **tg_users.username**
      * - `text` in database
      * - Nullable, no default
      */
    username?: string | db.Parameter<string> | null | db.DefaultType | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | null | db.DefaultType | db.SQLFragment>;
    }
    export type UniqueIndex = 'tg_users_pkey';
    export type Column = keyof Selectable;
    export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
    export type SQLExpression = Table | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Whereable | Column | db.ParentColumn | db.GenericSQLExpression;
    export type SQL = SQLExpression | SQLExpression[];
  }

  /* --- aggregate types --- */

  export namespace public {  
    export type Table = swines.Table | tg_chats.Table | tg_users.Table;
    export type Selectable = swines.Selectable | tg_chats.Selectable | tg_users.Selectable;
    export type JSONSelectable = swines.JSONSelectable | tg_chats.JSONSelectable | tg_users.JSONSelectable;
    export type Whereable = swines.Whereable | tg_chats.Whereable | tg_users.Whereable;
    export type Insertable = swines.Insertable | tg_chats.Insertable | tg_users.Insertable;
    export type Updatable = swines.Updatable | tg_chats.Updatable | tg_users.Updatable;
    export type UniqueIndex = swines.UniqueIndex | tg_chats.UniqueIndex | tg_users.UniqueIndex;
    export type Column = swines.Column | tg_chats.Column | tg_users.Column;
  
    export type AllBaseTables = [swines.Table, tg_chats.Table, tg_users.Table];
    export type AllForeignTables = [];
    export type AllViews = [];
    export type AllMaterializedViews = [];
    export type AllTablesAndViews = [swines.Table, tg_chats.Table, tg_users.Table];
  }



  /* === global aggregate types === */

  export type Schema = 'public';
  export type Table = public.Table;
  export type Selectable = public.Selectable;
  export type JSONSelectable = public.JSONSelectable;
  export type Whereable = public.Whereable;
  export type Insertable = public.Insertable;
  export type Updatable = public.Updatable;
  export type UniqueIndex = public.UniqueIndex;
  export type Column = public.Column;

  export type AllSchemas = ['public'];
  export type AllBaseTables = [...public.AllBaseTables];
  export type AllForeignTables = [...public.AllForeignTables];
  export type AllViews = [...public.AllViews];
  export type AllMaterializedViews = [...public.AllMaterializedViews];
  export type AllTablesAndViews = [...public.AllTablesAndViews];


  /* === lookups === */

  export type SelectableForTable<T extends Table> = {
    "swines": swines.Selectable;
    "tg_chats": tg_chats.Selectable;
    "tg_users": tg_users.Selectable;
  }[T];

  export type JSONSelectableForTable<T extends Table> = {
    "swines": swines.JSONSelectable;
    "tg_chats": tg_chats.JSONSelectable;
    "tg_users": tg_users.JSONSelectable;
  }[T];

  export type WhereableForTable<T extends Table> = {
    "swines": swines.Whereable;
    "tg_chats": tg_chats.Whereable;
    "tg_users": tg_users.Whereable;
  }[T];

  export type InsertableForTable<T extends Table> = {
    "swines": swines.Insertable;
    "tg_chats": tg_chats.Insertable;
    "tg_users": tg_users.Insertable;
  }[T];

  export type UpdatableForTable<T extends Table> = {
    "swines": swines.Updatable;
    "tg_chats": tg_chats.Updatable;
    "tg_users": tg_users.Updatable;
  }[T];

  export type UniqueIndexForTable<T extends Table> = {
    "swines": swines.UniqueIndex;
    "tg_chats": tg_chats.UniqueIndex;
    "tg_users": tg_users.UniqueIndex;
  }[T];

  export type ColumnForTable<T extends Table> = {
    "swines": swines.Column;
    "tg_chats": tg_chats.Column;
    "tg_users": tg_users.Column;
  }[T];

  export type SQLForTable<T extends Table> = {
    "swines": swines.SQL;
    "tg_chats": tg_chats.SQL;
    "tg_users": tg_users.SQL;
  }[T];

}
