import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: '30'
  })
  userName: string;

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
