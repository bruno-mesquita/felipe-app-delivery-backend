import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddEstablishmentIdToOrder1613253700038 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'order',
      new TableColumn({
        name: 'establishment_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'order',
      new TableForeignKey({
        name: 'EstablishmentOrder',
        columnNames: ['establishment_id'],
        referencedTableName: 'establishment',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('order', 'EstablishmentOrder');
    await queryRunner.dropForeignKey('order', 'establishment_id');
  }
}
