/**
 * @fileoverview entidade de Avaliação
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Column, Entity } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import encrypted from '@shared/typeorm/encrypted';

@Entity('evaluation_order')
class Evaluation extends EntityBase {
  @Column()
  value: number;

  @Column({ transformer: encrypted() })
  message: string;
}

export default Evaluation;
