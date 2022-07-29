import {Column, Model, Table, Table} from 'sequelize-typescript';
import {connection} from '../index';

@Table
class Swine extends Model<Swine> {
  @Column
    name!: string;
  @Column
    chatId!: number;
  @Column
    weight!: number;
  @Column
    lastTimeFed: Date;
}

@Table
class TgChat extends Model<TgChat> {
  @Column
    chatType!: string;
  @Column
    title: string;
  @Column
    firstName: string;
  @Column
    lastName: string;
}
