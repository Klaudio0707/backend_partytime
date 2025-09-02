import { Table, Column, Model, PrimaryKey, DataType, BeforeCreate, HasMany, BeforeUpdate } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { PartyEntity } from 'src/party/entities/party.entity';
@Table({ tableName: 'users', timestamps: true })

export class UserEntity extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string;

 @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  // ESTE GATILHO SÓ RODA NA CRIAÇÃO
  @BeforeCreate
  static async hashPasswordOnCreate(instance: UserEntity) {
    const saltRounds = 10;
    instance.password = await bcrypt.hash(instance.password, saltRounds);
  }

  
  @BeforeUpdate
  static async hashPasswordOnUpdate(instance: UserEntity) {
    // Esta verificação é importante: só faz o hash se o campo 'password' foi modificado.
    if (instance.changed('password')) {
      const saltRounds = 10;
      instance.password = await bcrypt.hash(instance.password, saltRounds);
    }
  }

  @Column({
    type: DataType.INTEGER,
    defaultValue: 150, // Ex: todo novo usuário começa com 50 envios
    allowNull: false,
  })
  declare invitationSendsLeft: number;

  @HasMany(() => PartyEntity)
  declare parties: PartyEntity[];
}
