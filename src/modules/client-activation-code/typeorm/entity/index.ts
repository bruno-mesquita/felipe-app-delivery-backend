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

  // Implementar

  public generateCode(): string {
    this.attempts += 1;

    const code = `code${this.attempts}`;

    this.code = code;

    return code;
  }

  public getCode(): string {
    return this.code;
  }

  public compareCode(code: string): boolean {
    return this.code === code;
  }
}

export default ClientActivationCode;
