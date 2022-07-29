/* eslint-disable require-jsdoc */
import "datejs";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { botConfig } from "../../const/config";
import { TgChat } from "./TgChat.model";
import { TgUser } from "./TgUser.model";

export class SwineOld {
  constructor(
    id: number,
    chatId: number,
    weight?: number,
    lastTimeFed?: Date,
    name?: string
  ) {
    this.chatId = chatId;
    this.id = id;
    this.weight = weight ?? botConfig.SWINE_DEFAULT_WEIGHT;
    this.lastTimeFed = lastTimeFed ?? Date.today().addDays(-1);
    this.name = name ?? botConfig.SWINE_DEFAULT_NAME;
  }
  readonly id: number;
  readonly chatId: number;
  weight: number = botConfig.SWINE_DEFAULT_WEIGHT;
  lastTimeFed: Date = Date.today().addDays(-1);
  name: string = botConfig.SWINE_DEFAULT_NAME;
}

@Table
export class Swine extends Model<Swine> {
  @Column
  name!: string;
  @ForeignKey(() => TgChat)
  @Column
  chatId!: number;
  @Column
  weight!: number;
  @Column
  lastTimeFed!: Date;
  @ForeignKey(() => TgUser)
  @Column
  ownerId!: number;
}
