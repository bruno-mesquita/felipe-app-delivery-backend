/**
 * @fileoverview Criação da entidade Establishment Token
 *
 * @author Jonatas Rosa Moura
 */

import { Column, Entity, Generated } from 'typeorm';

import EntityBase from '@shared/utils/entity';

@Entity('establishment_tokens')
export class EstablishmentToken extends EntityBase {
  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  establishment_id: string;
}
