import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddImageIdToEstablishment1613175714523
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'establishment',
      new TableColumn({
        name: 'image_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'establishment',
      new TableForeignKey({
        name: 'ImageEstablishment',
        columnNames: ['image_id'],
        referencedTableName: 'image',
        referencedColumnNames: ['id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('establishment', 'ImageEstablishment');
    await queryRunner.dropColumn('establishment', 'image_id');
  }
}
