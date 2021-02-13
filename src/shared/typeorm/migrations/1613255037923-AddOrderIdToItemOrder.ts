import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddOrderIdToItemOrder1613255037923 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'item_order',
      new TableColumn({
        name: 'order_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'item_order',
      new TableForeignKey({
        name: 'OrderForItemOrder',
        columnNames: ['order_id'],
        referencedTableName: 'order',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('item_order', 'OrderForItemOrder');
    await queryRunner.dropColumn('item_order', 'order_id');
  }
}
