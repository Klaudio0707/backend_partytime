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

  @Column(DataType.STRING)
  declare description: string;

  @Column(DataType.DECIMAL(10, 2))
 declare price: number;

  @Column(DataType.STRING)
  declare image: string;


  @ForeignKey(() => PartyEntity)
  @Column(DataType.UUID)
  declare partyId: string;

  @BelongsTo(() => PartyEntity)
  declare party: PartyEntity;
}