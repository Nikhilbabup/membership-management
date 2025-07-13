import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchMemberDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  zone?: string;

  @ApiProperty({ required: false, enum: ['ACTIVE', 'INACTIVE', 'PENDING'] })
  @IsEnum(['ACTIVE', 'INACTIVE', 'PENDING'])
  @IsOptional()
  status?: string;

  @ApiProperty({ required: false, enum: ['BASIC', 'PREMIUM', 'VIP'] })
  @IsEnum(['BASIC', 'PREMIUM', 'VIP'])
  @IsOptional()
  membershipType?: string;
}
