import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

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
}
