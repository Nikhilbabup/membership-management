import {
  IsString,
  IsEmail,
  IsDateString,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMemberDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ required: false, enum: ['BASIC', 'PREMIUM', 'VIP'] })
  @IsEnum(['BASIC', 'PREMIUM', 'VIP'])
  @IsOptional()
  membershipType?: string;

  @ApiProperty({ required: false, enum: ['ACTIVE', 'INACTIVE', 'PENDING'] })
  @IsEnum(['ACTIVE', 'INACTIVE', 'PENDING'])
  @IsOptional()
  status?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  expiryDate?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  zoneId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  receiptPath?: string;
}
