import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Unique member ID', example: 'member-123' })
  @IsString()
  @IsNotEmpty()
  memberId: string;

  @ApiProperty({ description: 'Member password', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
