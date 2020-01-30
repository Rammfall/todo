import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableColumn
} from 'typeorm';
import 'reflect-metadata';

export class userProjects1579779473365 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'project',
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
          }
        ]
      })
    );

    await queryRunner.addColumn(
      'project',
      new TableColumn({
        name: 'userId',
        type: 'int'
      })
    );

    await queryRunner.createForeignKey(
      'project',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user_t',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
