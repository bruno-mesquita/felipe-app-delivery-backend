import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddEvaluationIdToOrder1613253175222 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'order',
      new TableColumn({
        name: 'evaluation_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'order',
      new TableForeignKey({
        name: 'EvaluationOrder',
        columnNames: ['evaluation_id'],
        referencedTableName: 'evaluation_order',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('order', 'EvaluationOrder');
    await queryRunner.dropColumn('order', 'evaluation_id');
  }
}
