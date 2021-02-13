import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddUserIdToOrder1613252413127 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'order',
      new TableColumn({
        name: 'client_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'order',
      new TableForeignKey({
        name: 'ClientOrder',
        columnNames: ['client_id'],
        referencedTableName: 'client',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('order', 'ClientOrder');
    await queryRunner.dropColumn('order', 'client_id');
  }
}
