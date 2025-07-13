// src/auth/dtos/login.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Unique member ID' })
  @IsString()
  @IsNotEmpty()
  memberId: string;

  @ApiProperty({ description: 'Member password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
