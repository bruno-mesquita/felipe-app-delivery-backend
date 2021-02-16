import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrder1613250398928 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order',

        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'request_date',
            type: 'date',
          },
          {
            name: 'form_of_payment',
            type: 'varchar',
          },
          {
            name: 'total',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'discount',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'client_order_status',
            type: 'varchar',
          },
          {
            name: 'order_status',
            type: 'varchar',
          },
          {
            name: 'freight_value',
            type: 'decimal',
            precision: 10,
            scale: 2,
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
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order');
  }
}
