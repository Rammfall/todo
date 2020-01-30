import { Column, Entity, ManyToOne, BaseEntity } from 'typeorm';

// eslint-disable-next-line import/no-cycle
import User from './user';

@Entity()
export default class UserSession extends BaseEntity {
  @Column({
    type: 'uuid',
    primary: true
  })
  refreshToken: string;

  @Column({
    type: 'timestamp'
  })
  expiredDate: Date;

  @ManyToOne(
    () => User,
    (user: User) => user.id
  )
  user: User;
}
