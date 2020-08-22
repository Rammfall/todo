import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey
} from 'typeorm';
import 'reflect-metadata';

export class projectTasks1585391930785 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'task',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
            generationStrategy: 'increment'
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false
          },
          {
            name: 'description',
            type: 'varchar',
            length: '200',
            isNullable: true
          },
          {
            name: 'completed',
            type: 'boolean',
            isNullable: false,
            default: false
          },
          {
            name: 'deadline',
            type: 'date',
            isNullable: true
          }
        ]
      })
    );

    await queryRunner.addColumn(
      'task',
      new TableColumn({
        name: 'projectId',
        type: 'bigint'
      })
    );

    await queryRunner.createForeignKey(
      'task',
      new TableForeignKey({
        columnNames: ['projectId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'project',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('task');
  }
}
