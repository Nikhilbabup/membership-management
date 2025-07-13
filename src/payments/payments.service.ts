import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Member } from 'src/members/entities/member.entity';
import { CreatePaymentDto } from './dtos/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const member = await this.membersRepository.findOne({
      where: { id: createPaymentDto.memberId },
    });
    if (!member) throw new NotFoundException('Member not found');

    const payment = this.paymentsRepository.create({
      ...createPaymentDto,
      member,
    });
    return this.paymentsRepository.save(payment);
  }

  async renewMembership(memberId: number, amount: number) {
    const member = await this.membersRepository.findOne({
      where: { id: memberId },
    });
    if (!member) throw new NotFoundException('Member not found');

    member.expiryDate = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1),
    );
    await this.membersRepository.save(member);

    const payment = this.paymentsRepository.create({
      member,
      amount,
      type: 'RENEWAL',
      status: 'COMPLETED',
    });
    return this.paymentsRepository.save(payment);
  }
}
