/**
 * @fileoverview entidade de Image
 *
 * @author Bruno Mesquita
 */

import { Column, Entity } from 'typeorm';

import EntityBase from '@shared/utils/entity';

@Entity('image')
class Image extends EntityBase {
  @Column()
  name: string;

  @Column()
  encoded: string;

  public setName(name: string): void {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public setEncoded(encoded: string): void {
    this.encoded = encoded;
  }

  public getEncoded(): string {
    return this.encoded;
  }
}

export default Image;
