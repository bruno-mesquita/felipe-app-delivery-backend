/**
 * @fileoverview entidade de Avaliação
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Column, Entity } from 'typeorm';

import EntityBase from '@shared/utils/entity';

@Entity('evaluation_order')
class Evaluation extends EntityBase {
  @Column()
  note: string;

  @Column()
  message: string;
}

export default Evaluation;
