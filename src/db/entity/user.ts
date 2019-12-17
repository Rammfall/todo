import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class UserT {
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
}
