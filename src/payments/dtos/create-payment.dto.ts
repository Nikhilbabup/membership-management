import {
  IsNumber,
  IsString,
  IsEnum,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ description: 'Member ID' })
  @IsNumber()
  @IsNotEmpty()
  memberId: number;

  @ApiProperty({ description: 'Payment amount' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description: 'Payment type',
    enum: ['RENEWAL', 'EVENT', 'DONATION'],
  })
  @IsEnum(['RENEWAL', 'EVENT', 'DONATION'])
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'Payment status',
    enum: ['PENDING', 'COMPLETED', 'FAILED'],
  })
  @IsEnum(['PENDING', 'COMPLETED', 'FAILED'])
  @IsNotEmpty()
  status: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  transactionId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  receiptPath?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  eventId?: number;
}
