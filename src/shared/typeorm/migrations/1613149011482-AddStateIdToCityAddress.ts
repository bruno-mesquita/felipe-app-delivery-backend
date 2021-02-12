import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddStateIdToCityAddress1613149011482
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'city_address',
      new TableColumn({
        name: 'state_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'city_address',
      new TableForeignKey({
        name: 'CityState',
        columnNames: ['state_id'],
        referencedTableName: 'state_address',
        referencedColumnNames: ['id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('city_address', 'CityState');
    await queryRunner.dropColumn('city_address', 'state_id');
  }
}
