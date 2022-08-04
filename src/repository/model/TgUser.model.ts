import {Column, DataType, HasOne, Model, Table} from 'sequelize-typescript';
import {Swine} from './Swine.model';

@Table
export class TgUser extends Model {
  @Column(DataType.BOOLEAN)
    isBot!: boolean;
  @Column(DataType.TEXT)
    firstName!: string;
  @Column(DataType.TEXT)
    lastName?: string;
  @Column(DataType.TEXT)
    userName?: string;

  @HasOne(() => Swine)
    swine?: Swine;
}
