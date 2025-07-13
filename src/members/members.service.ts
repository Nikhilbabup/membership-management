import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { CreateMemberDto } from './dtos/create-member.dto';
import { SearchMemberDto } from './dtos/search-member.dto';
import { UpdateMemberDto } from './dtos/update-member.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  async create(createMemberDto: CreateMemberDto) {
    const member = this.membersRepository.create(createMemberDto);
    return this.membersRepository.save(member);
  }

  async findAll(searchDto: SearchMemberDto) {
    const query = this.membersRepository.createQueryBuilder('member');

    if (searchDto.zone)
      query.andWhere('member.zone = :zone', { zone: searchDto.zone });
    if (searchDto.status)
      query.andWhere('member.status = :status', { status: searchDto.status });
    if (searchDto.membershipType)
      query.andWhere('member.membershipType = :membershipType', {
        membershipType: searchDto.membershipType,
      });

    return query.getMany();
  }

  async findOne(id: number) {
    const member = await this.membersRepository.findOne({ where: { id } });
    if (!member) throw new NotFoundException('Member not found');
    return member;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    const member = await this.findOne(id);
    Object.assign(member, updateMemberDto);
    return this.membersRepository.save(member);
  }

  async remove(id: number) {
    const member = await this.findOne(id);
    member.status = 'INACTIVE';
    return this.membersRepository.save(member);
  }

  async generateQRCode(id: number): Promise<any> {
    const member = await this.findOne(id);
    // return QRCode.toDataURL(
    //   JSON.stringify({
    //     memberId: member.memberId,
    //     name: member.name,
    //     membershipType: member.membershipType,
    //   }),
    // );
  }
}
