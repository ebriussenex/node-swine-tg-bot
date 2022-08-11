
import * as db from 'zapatos/db';
import type * as s from 'zapatos/schema';

export type Swine = {
    name: string,
    weight: number,
    ownerId: string,
    chatId: string,
    lastTimeFed: Date,
}

export function swineFromJSONSelectable(swine: s.swines.JSONSelectable): Swine {
  return {
    name: swine.name,
    weight: swine.weight,
    ownerId: swine.owner_id,
    chatId: swine.chat_id,
    lastTimeFed: db.toDate(swine.last_time_fed),
  };
}

export function insertableFromSwine(swine: Swine): s.swines.Insertable {
  return {
    name: swine.name,
    weight: swine.weight,
    owner_id: swine.ownerId,
    chat_id: swine.chatId,
    last_time_fed: db.toString(swine.lastTimeFed, 'timestamptz'),
  };
}
