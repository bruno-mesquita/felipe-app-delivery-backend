import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEstablishmentToken1613848105718 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'establishment_tokens',

        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'token',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'establishment_id',
            type: 'uuid',
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
          {
            name: 'deleted_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'TokenEstablishment',
            referencedTableName: 'establishment',
            referencedColumnNames: ['id'],
            columnNames: ['establishment_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('establishment_tokens');
  }
}
