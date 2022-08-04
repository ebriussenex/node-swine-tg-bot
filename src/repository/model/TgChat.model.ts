import {Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {Swine} from './Swine.model';

@Table
export class TgChat extends Model {
  @Column(DataType.TEXT)
    chatType: string | undefined;
  @Column(DataType.TEXT)
    title?: string;
  @Column(DataType.TEXT)
    firstName?: string;
  @Column(DataType.TEXT)
    lastName?: string;

  @HasMany(() => Swine)
    swines?: Swine[];
}
