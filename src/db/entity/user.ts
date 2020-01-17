import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import UserSession from './userSession';

@Entity()
export default class UserT extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: '30'
  })
  username: string;

  @Column({
    type: 'varchar',
    length: '40'
  })
  email: string;

  @Column({
    type: 'varchar'
  })
  password: string;

  @OneToMany(
    () => UserSession,
    (session: UserSession) => session.user
  )
  sessions: UserSession[];
}
