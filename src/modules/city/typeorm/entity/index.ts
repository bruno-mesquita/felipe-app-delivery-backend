import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import State from '@modules/state/typeorm/entity';

@Entity('cities')
class City {
  @Column()
  name: string;

  @OneToOne(() => State)
  @JoinColumn({ name: 'state_id' })
  state: State;
}

export default City;
