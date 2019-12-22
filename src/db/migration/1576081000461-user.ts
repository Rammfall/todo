import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import 'reflect-metadata';

export class createUsers1576080361641 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'user_t',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
            generationStrategy: 'increment'
          },
          {
            name: 'username',
            type: 'varchar',
            length: '30',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'email',
            type: 'varchar',
            length: '40',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('user_t');
  }
}
