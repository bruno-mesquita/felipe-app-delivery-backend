import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAddress1613147037560 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'address',

        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid ()',
          },
          {
            name: 'street',
            type: 'varchar',
          },
          {
            name: 'number',
            type: 'int',
          },
          {
            name: 'neighborhood',
            type: 'varchar',
          },
          {
            name: 'cep',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('address');
  }
}
