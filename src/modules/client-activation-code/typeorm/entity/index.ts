/**
 * @fileoverview Criação da entidade ClientActivateCode, representa o codigo de ativação da conta do usuário
 *
 * @author Bruno Mesquita
 */

import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import Client from '@modules/client/typeorm/entity';

@Entity('client-activation-code')
class ClientActivationCode extends EntityBase {
  @Column({ default: 0 })
  attempts: number;

  @Column()
  code: string;

  @OneToOne(() => Client)
  @JoinColumn()
  client_id: Client;

  public addAtempts(): void {
    this.attempts += 1;
  }

  // Implementar
  public generateCode(): string {
    const code = `code${this.attempts}`;

    this.code = code;

    return code;
  }

  public getCode(): string {
    return this.code;
  }
}

export default ClientActivationCode;
