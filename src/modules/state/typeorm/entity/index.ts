import { Column, Entity } from 'typeorm';

@Entity('states')
class State {
  @Column()
  name: string;
}

export default State;
