import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddCityIdToAddress1613148229889 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'address',
      new TableColumn({
        name: 'city_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'address',
      new TableForeignKey({
        name: 'AddressCity',
        columnNames: ['city_id'],
        referencedTableName: 'city_address',
        referencedColumnNames: ['id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('address', 'AddressCity');
    await queryRunner.dropColumn('address', 'city_id');
  }
}
