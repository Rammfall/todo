import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

// eslint-disable-next-line import/no-cycle
import User from './user';

@Entity()
export default class UserSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'uuid'
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
  user: number;
}
