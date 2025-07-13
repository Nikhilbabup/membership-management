import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Zone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
