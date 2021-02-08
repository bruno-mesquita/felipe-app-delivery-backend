import { Entity, Column } from 'typeorm';

import EntityBase from '@shared/entity';

@Entity({ name: 'user' })
class User extends EntityBase {
  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  email!: string;

  @Column({ type: 'varchar' })
  password!: string;

  @Column({ type: 'varchar' })
  cellphone!: string;

  @Column({ type: 'varchar' })
  cpf!: string;
}

export default User;
