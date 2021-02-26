/**
 * @fileoverview Criação da entidade Client Token
 * @author Jonatas Rosa Moura
 */

import EntityBase from '@shared/utils/entity';
import { Column, Entity, Generated } from 'typeorm';

@Entity('client_tokens')
class ClientToken extends EntityBase {
  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  client_id: string;
}

export { ClientToken };
