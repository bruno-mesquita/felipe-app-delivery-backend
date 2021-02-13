import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddAddressIdToClientAddress1613155782484 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'client_address',
      new TableColumn({
        name: 'address_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'client_address',
      new TableForeignKey({
        name: 'AddressForClientAddress',
        columnNames: ['address_id'],
        referencedTableName: 'address',
        referencedColumnNames: ['id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('client_address', 'AddressForClientAddress');
    await queryRunner.dropColumn('client_address', 'address_id');
  }
}
