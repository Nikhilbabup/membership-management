import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { Member } from 'src/members/entities/member.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
    private jwtService: JwtService,
  ) {}

  async validateMember(memberId: string, password: string): Promise<any> {
    const member = await this.membersRepository.findOne({
      where: { memberId },
    });
    if (member && (await bcrypt.compare(password, member.password))) {
      const { password, ...result } = member;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const member = await this.validateMember(
      loginDto.memberId,
      loginDto.password,
    );
    if (!member) {
      throw new UnauthorizedException();
    }
    const payload = { memberId: member.memberId, role: member.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createMemberDto: any) {
    const hashedPassword = await bcrypt.hash(createMemberDto.password, 10);
    const member = this.membersRepository.create({
      ...createMemberDto,
      password: hashedPassword,
    });
    return this.membersRepository.save(member);
  }
}
