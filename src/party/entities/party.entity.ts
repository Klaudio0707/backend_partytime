import { Table, Column, Model, PrimaryKey, DataType, HasMany, ForeignKey, BelongsTo, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import { ServiceEntity } from '../../service/entities/service.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { GuestEntity } from 'src/guest/entities/guest.entity';
import * as bcrypt from 'bcrypt';

@Table({ tableName: 'parties', timestamps: true })

export class PartyEntity extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column(DataType.STRING)
  declare title: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare password?: string | null;
  private static async hashPassword(instance: PartyEntity): Promise<void> {
    if (instance.password) {
      const saltRounds = 10;
      instance.password = await bcrypt.hash(instance.password, saltRounds);
    }
  }

  @BeforeCreate
  static async hashPasswordOnCreate(instance: PartyEntity) {
    await this.hashPassword(instance);
  }

  @BeforeUpdate
  static async hashPasswordOnUpdate(instance: PartyEntity) {
    if (instance.changed('password')) {
      await this.hashPassword(instance);
    }
  }

  @Column(DataType.STRING)
  declare author: string;

  @Column(DataType.DATE)
  declare date: Date;

  @ForeignKey(() => UserEntity)
  @Column(DataType.UUID)
  declare userId: string;

  @BelongsTo(() => UserEntity)
  declare user: UserEntity;

  @Column(DataType.TEXT)
  declare description: string;

  @Column(DataType.DECIMAL(10, 2))
  declare budget: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare image?: string | null;

  @HasMany(() => ServiceEntity)
  declare services: ServiceEntity[];

  @HasMany(() => GuestEntity)
  declare guests: GuestEntity[];
}