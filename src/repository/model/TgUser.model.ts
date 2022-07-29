import { Column, HasOne, Model, Table } from "sequelize-typescript";
import { Swine } from "./Swine.model";

@Table
export class TgUser extends Model<TgUser> {
  @Column
  isBot!: boolean;
  @Column
  firstName!: string;
  @Column
  lastName?: string;
  @Column
  userName?: string;

  @HasOne(() => Swine)
  swine?: Swine;
}
