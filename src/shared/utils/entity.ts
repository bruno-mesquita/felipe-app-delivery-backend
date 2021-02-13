import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeInsert } from 'typeorm';
import { v4 } from 'uuid';

abstract class Entity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  public getId(): string {
    return this.id;
  }

  @BeforeInsert()
  public insertId(): void {
    this.id = v4();
  }
}

export default Entity;
