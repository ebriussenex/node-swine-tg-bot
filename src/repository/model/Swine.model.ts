import { Column, DataType, Default, ForeignKey, Length, Model, Table } from "sequelize-typescript";
import { botConfig } from "../../const/config";
import { TgChat } from "./TgChat.model";
import { TgUser } from "./TgUser.model";

@Table
export class Swine extends Model<Swine> {
  @Column
  @Length({max: 25})
  @Default({value: botConfig.SWINE_DEFAULT_NAME})
  name!: string;
  @ForeignKey(() => TgChat)
  @Column
  chatId!: number;
  @Column
  @Default({value: botConfig.SWINE_DEFAULT_WEIGHT})
  weight!: number;
  @Column(DataType.DATE)
  @Default({value: (new Date).setDate(Date.now() - 1)})
  lastTimeFed!: Date;
  @ForeignKey(() => TgUser)
  @Column
  ownerId!: number;
}
