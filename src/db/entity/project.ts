import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne
} from 'typeorm';

import User from './user';

@Entity()
export default class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: false
  })
  name: string;

  @ManyToOne(
    () => User,
    (user: User) => user.id
  )
  user: User;
}
