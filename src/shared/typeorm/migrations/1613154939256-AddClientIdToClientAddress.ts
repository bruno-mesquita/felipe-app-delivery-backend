import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddClientIdToClientAddress1613154939256
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'client_address',
      new TableColumn({
        name: 'client_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'client_address',
      new TableForeignKey({
        name: 'ClientForClientAddress',
        columnNames: ['client_id'],
        referencedTableName: 'client',
        referencedColumnNames: ['id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'client_address',
      'ClientForClientAddress'
    );
    await queryRunner.dropColumn('client_address', 'client_id');
  }
}
