import { ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Users {
  @PrimaryColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: string;
}
