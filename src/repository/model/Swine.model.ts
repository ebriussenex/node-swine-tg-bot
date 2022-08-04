import {
  Column,
  DataType,
  ForeignKey,
  Length,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import {TgChat} from './TgChat.model';
import {TgUser} from './TgUser.model';

@Table
export class Swine extends Model {
  @Length({max: 25})
  @Column(DataType.TEXT)
    name!: string;
  @PrimaryKey
  @ForeignKey(() => TgChat)
  @Column(DataType.INTEGER)
    chatId!: number;
  @Column(DataType.INTEGER)
    weight!: number;
  @Column(DataType.DATE)
    lastTimeFed!: Date;
  @PrimaryKey
  @ForeignKey(() => TgUser)
  @Column(DataType.INTEGER)
    ownerId!: number;
}
