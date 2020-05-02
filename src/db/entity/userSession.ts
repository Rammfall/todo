import { Column, Entity, ManyToOne, BaseEntity, PrimaryColumn } from 'typeorm';

import User from './user';

@Entity()
export default class UserSession extends BaseEntity {
  @PrimaryColumn({
    type: 'uuid'
  })
  refreshToken!: string;

  @Column({
    type: 'timestamp',
    nullable: false
  })
  expiredDate!: Date;

  @ManyToOne(
    () => User,
    (user: User) => user.id
  )
  user!: User;
}
