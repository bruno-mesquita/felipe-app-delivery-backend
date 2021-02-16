import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddMenuIdToProduct1613504522753 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'menu_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'products',
      new TableForeignKey({
        name: 'MenuProducts',
        columnNames: ['menu_id'],
        referencedTableName: 'menu',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('products', 'MenuProducts');
    await queryRunner.dropColumn('products', 'menu_id');
  }
}
