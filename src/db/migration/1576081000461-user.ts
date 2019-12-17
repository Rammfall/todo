import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import 'reflect-metadata';

export class createUsers1576080361641 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            length: '30'
          },
          {
            name: 'email',
            type: 'varchar',
            length: '40'
          },
          {
            name: 'password',
            type: 'varchar'
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users');
  }
}
