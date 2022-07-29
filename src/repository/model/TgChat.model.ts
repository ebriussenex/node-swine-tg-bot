import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Swine } from "./Swine.model";

@Table
export class TgChat extends Model<TgChat> {
  @Column
  chatType!: string;
  @Column
  title?: string;
  @Column
  firstName?: string;
  @Column
  lastName?: string;
  
  @HasMany(() => Swine)
  swines?: Swine[];
}
