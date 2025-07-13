import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Zone } from '../../common/entities/zone.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  memberId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  membershipType: string;

  @Column()
  status: string;

  @Column()
  expiryDate: Date;

  @ManyToOne(() => Zone)
  zone: Zone;

  @Column({ nullable: true })
  receiptPath: string;

  @Column({ default: 'MEMBER' })
  role: string;
}
