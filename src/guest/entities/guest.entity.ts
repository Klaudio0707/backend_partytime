import { Table, Column, Model, PrimaryKey, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { PartyEntity } from '../../party/entities/party.entity';

export enum GuestStatus {
  PENDING = 'Pendente',
  CONFIRMED = 'Confirmado',
  DECLINED = 'Recusado',
}

@Table({ tableName: 'guests', timestamps: true })
export class GuestEntity extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string;

  @Column(DataType.STRING)
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare phone: string;

  @Column({ type: DataType.UUID, unique: true, allowNull: true })
  declare rsvpToken: string;

  @Column({
    type: DataType.ENUM(...Object.values(GuestStatus)),
    defaultValue: GuestStatus.PENDING,
  })
  declare status: GuestStatus;

  @ForeignKey(() => PartyEntity)
  @Column(DataType.UUID)
  declare partyId: string;

  @BelongsTo(() => PartyEntity)
  declare party: PartyEntity;
}