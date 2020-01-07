import { Column, Entity, ManyToOne } from 'typeorm';

// eslint-disable-next-line import/no-cycle
import User from './user';

@Entity()
export default class UserSession {
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
