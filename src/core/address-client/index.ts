/**
 * @fileoverview Casos de testes para a criação do cliente
 *
 * @author Bruno Mesquita
 * @author Jonatas Rosa Moura
 */

import { Entity, OneToOne, JoinColumn, Column, ManyToOne } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import Client from '@core/client';
import Address from '@core/address';

@Entity('client_address')
class AddressClient extends EntityBase {
  @Column()
  nickname: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client_id: Client;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address_id: Address;

  public setNickname(nickname: string): void {
    this.nickname = nickname;
  }

  public getNickname(): string {
    return this.nickname;
  }

  public setClient(client: Client): void {
    this.client_id = client;
  }

  public getClient(): Client {
    return this.client_id;
  }

  public setAddress(address: Address): void {
    this.address_id = address;
  }

  public getAddress(): Address {
    return this.address_id;
  }
}

export default AddressClient;
