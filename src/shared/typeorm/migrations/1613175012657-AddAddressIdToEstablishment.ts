import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddAddressIdToEstablishment1613175012657 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'establishment',
      new TableColumn({
        name: 'address_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'establishment',
      new TableForeignKey({
        name: 'AddressForEstablishment',
        columnNames: ['address_id'],
        referencedTableName: 'address',
        referencedColumnNames: ['id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('establishment', 'AddressForEstablishment');
    await queryRunner.dropColumn('establishment', 'address_id');
  }
}
