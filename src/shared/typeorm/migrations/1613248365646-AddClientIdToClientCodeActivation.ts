import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddClientIdToClientCodeActivation1613248365646 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'client_code_activation',
      new TableColumn({
        name: 'client_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'client_code_activation',
      new TableForeignKey({
        name: 'ClientForClientCodeActivation',
        columnNames: ['client_id'],
        referencedTableName: 'client',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('client_code_activation', 'ClientForClientCodeActivation');
    await queryRunner.dropColumn('client_code_activation', 'client_id');
  }
}
