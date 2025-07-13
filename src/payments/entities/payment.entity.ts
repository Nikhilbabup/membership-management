// src/payments/entities/payment.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Member } from '../../members/entities/member.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, (member) => member.id, { nullable: false })
  member: Member;

  @Column('decimal')
  amount: number;

  @Column()
  type: string; // e.g., 'RENEWAL', 'EVENT', 'DONATION'

  @Column()
  status: string; // e.g., 'PENDING', 'COMPLETED', 'FAILED'

  @Column({ nullable: true })
  transactionId: string;

  @Column({ nullable: true })
  receiptPath: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  eventId: number; // Optional: Link to event for event-specific payments
}
