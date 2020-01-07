import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableColumn
} from 'typeorm';
import 'reflect-metadata';

export class userSession1578079061377 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'user_session',
        columns: [
          {
            name: 'refreshToken',
            type: 'uuid',
            isUnique: true,
            isPrimary: true,
            isNullable: false
          },
          {
            name: 'expiredDate',
            type: 'timestamp',
            isNullable: false
          }
        ]
      })
    );

    await queryRunner.addColumn(
      'user_session',
      new TableColumn({
        name: 'userId',
        type: 'int'
      })
    );

    await queryRunner.createForeignKey(
      'user_session',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user_t',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('user_session');
  }
}
