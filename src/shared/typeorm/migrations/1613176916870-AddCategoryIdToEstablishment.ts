import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddCategoryIdToEstablishment1613176916870 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'establishment',
      new TableColumn({
        name: 'category_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'establishment',
      new TableForeignKey({
        name: 'CategoryEetablishment',
        columnNames: ['category_id'],
        referencedTableName: 'category_establishment',
        referencedColumnNames: ['id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('establishment', 'CategoryEetablishment');
    await queryRunner.dropColumn('establishment', 'category_id');
  }
}
