import { Table, Column, Model, PrimaryKey, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { PartyEntity } from '../../party/entities/party.entity';

@Table({ tableName: 'services', timestamps: true })

export class ServiceEntity extends Model { 
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column(DataType.STRING)
  declare name: string;

 @Column({ type: DataType.STRING, allowNull: true })
  declare description: string | null;

  @Column(DataType.DECIMAL(10, 2))
 declare price: number;

 @Column({ type: DataType.TEXT, allowNull: true })
  declare image: string | null;

  @ForeignKey(() => PartyEntity)
  @Column(DataType.UUID)
  declare partyId: string;

  @BelongsTo(() => PartyEntity)
  declare party: PartyEntity;
}