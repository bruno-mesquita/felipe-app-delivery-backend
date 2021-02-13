import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddProductIdToItemOrder1613255580432 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'item_order',
      new TableColumn({
        name: 'product_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'item_order',
      new TableForeignKey({
        name: 'ProductItemOrder',
        columnNames: ['product_id'],
        referencedTableName: 'products',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('item_order', 'ProductItemOrder');
    await queryRunner.dropColumn('item_order', 'product_id');
  }
}
