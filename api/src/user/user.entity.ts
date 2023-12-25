import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique:true,
    nullable:false
  })
  email: string;

  @Column({
    nullable:false
  })
  password: string;

  @Column({ default: false })
  status: boolean;

  @Column()
  name: string;
}