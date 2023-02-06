import Dexie, { Table } from 'dexie';

import { LocalHistory } from '@/store/features/history/history.type';

export class DB extends Dexie {
  histories!: Table<LocalHistory, string>;

  constructor() {
    super('watchtree');
    this.version(1).stores({
      histories: 'videoId, ended, updatedAt',
    });
  }
}

export const db = new DB();
