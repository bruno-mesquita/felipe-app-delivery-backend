import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddEstablishmentIdToMenu1613250073367 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'menu',
      new TableColumn({
        name: 'establishment_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'menu',
      new TableForeignKey({
        name: 'EstablishmentMenu',
        columnNames: ['establishment_id'],
        referencedTableName: 'establishment',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('menu', 'EstablishmentMenu');
    await queryRunner.dropColumn('menu', 'establishment_id');
  }
}
