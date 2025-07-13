import { IsString, IsEmail, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {
  @ApiProperty()
  @IsString()
  memberId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEnum(['BASIC', 'PREMIUM', 'VIP'])
  membershipType: string;

  @ApiProperty()
  @IsEnum(['ACTIVE', 'INACTIVE', 'PENDING'])
  status: string;

  @ApiProperty()
  @IsDateString()
  expiryDate: string;

  @ApiProperty()
  @IsString()
  zoneId: string;
}
