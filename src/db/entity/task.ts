import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne
} from 'typeorm';

import Project from './project';

@Entity()
export default class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: false
  })
  name: string;

  @Column({
    type: 'varchar',
    length: '200',
    nullable: true
  })
  description: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false
  })
  completed: boolean;

  @Column({
    type: 'date',
    nullable: true
  })
  deadline: Date;

  @ManyToOne(
    () => Project,
    (project: Project) => project.id
  )
  project: Project;
}
