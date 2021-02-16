import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddImageIdToClient1613502247682 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'client',
      new TableColumn({
        name: 'image_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'client',
      new TableForeignKey({
        name: 'ImageForClient',
        columnNames: ['image_id'],
        referencedTableName: 'image',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('client', 'ImageForClient');
    await queryRunner.dropColumn('client', 'image_id');
  }
}
