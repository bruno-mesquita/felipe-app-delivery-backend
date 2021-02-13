import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  description: string;

  @CreateDateColumn()

  // eslint-disable-next-line camelcase
  created_at: Date;

  @UpdateDateColumn()

  // eslint-disable-next-line camelcase
  updated_at: Date;
}
