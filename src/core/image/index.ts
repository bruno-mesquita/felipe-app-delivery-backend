/**
 * @fileoverview entidade de Image
 *
 * @author Bruno Mesquita
 */

import { Column, Entity } from 'typeorm';

import EntityBase from '@shared/utils/entity';
import encrypted from '@shared/typeorm/encrypted';

@Entity('image')
class Image extends EntityBase {
  @Column({ transformer: encrypted() })
  name: string;

  @Column({ transformer: encrypted() })
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
