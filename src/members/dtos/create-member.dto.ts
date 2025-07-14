import { IsString, IsEmail, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CreateMemberDto {
  @ApiProperty({ description: 'Unique identifier for the member', example: 'member-123' })
  @IsString()
  memberId: string;

  @ApiProperty({ description: 'Name of the member', example: 'John Doe' })
  @Column()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email address of the member', example: 'john.doe@example.com' })
  @IsEmail()
  @Column()
  email: string;

  @ApiProperty({ description: 'Password for the member account', example: 'password123' })
  @IsString()
  @Column()
  password: string;

  @ApiProperty({ description: 'Membership type of the member', example: 'BASIC' })
  @IsEnum(['BASIC', 'PREMIUM', 'VIP'])
  @Column()
  membershipType: string;

  @ApiProperty({ description: 'Status of the member', example: 'ACTIVE' })
  @IsEnum(['ACTIVE', 'INACTIVE', 'PENDING'])
  @Column()
  status: string;

  @ApiProperty({ description: 'Expiry date of the membership', example: '2023-12-31' })
  @IsDateString()
  @Column()
  expiryDate: string;

  @ApiProperty({ description: 'Zone ID of the member', example: 'zone-123' })
  @IsString()
  @Column()
  zoneId: string;

   
  @ApiProperty({ description: 'Role of the member', example: 'MEMBER', required: false })
  @IsString()
  @Column({ default: 'MEMBER', nullable: true })
  role?: string;


}
