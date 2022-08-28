export type BtnAction = 'action.accept_fight' | 'action.decline_fight';
export type ButtonMap = Record<BtnAction, string>;

export const buttons: ButtonMap = {
  'action.accept_fight': '⚔️ Принять вызов ⚔️',
  'action.decline_fight': '🛑 Отменить сражение',
};
