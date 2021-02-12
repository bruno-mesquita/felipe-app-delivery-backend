import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddImageIdToProduct1613173170783 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'image_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'products',
      new TableForeignKey({
        name: 'ImageProduct',
        columnNames: ['image_id'],
        referencedTableName: 'image',
        referencedColumnNames: ['id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('products', 'ImageProduct');
    await queryRunner.dropColumn('products', 'image_id');
  }
}
