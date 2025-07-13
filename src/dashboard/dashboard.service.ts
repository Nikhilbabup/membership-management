import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/members/entities/member.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}

  async getDashboardStats() {
    const totalMembers = await this.membersRepository.count();
    const activeMembers = await this.membersRepository.count({
      where: { status: 'ACTIVE' },
    });
    const pendingRenewals = await this.membersRepository.count({
      where: { status: 'PENDING' },
    });

    const recentPayments = await this.paymentsRepository.find({
      order: { createdAt: 'DESC' },
      take: 10,
    });

    const membershipDistribution = await this.membersRepository
      .createQueryBuilder('member')
      .select('member.membershipType, COUNT(*) as count')
      .groupBy('member.membershipType')
      .getRawMany();

    const monthlyDistribution = await this.membersRepository
      .createQueryBuilder('member')
      .select(
        "DATE_TRUNC('month', member.createdAt) as month, COUNT(*) as count",
      )
      .groupBy('month')
      .orderBy('month', 'DESC')
      .getRawMany();

    return {
      totalMembers,
      activeMembers,
      pendingRenewals,
      recentPayments,
      membershipDistribution,
      monthlyDistribution,
    };
  }
}
