import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddOrderIdToEvaluation1613254258989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'evaluation_order',
      new TableColumn({
        name: 'order_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'evaluation_order',
      new TableForeignKey({
        name: 'EvaluationOrder',
        columnNames: ['order_id'],
        referencedTableName: 'order',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('evaluation_order', 'EvaluationOrder');
    await queryRunner.dropColumn('evaluation_order', 'order_id');
  }
}
