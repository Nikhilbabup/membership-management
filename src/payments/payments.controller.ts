import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { Roles, RolesGuard } from 'src/common/decorators/roles.decorator';

@ApiTags('payments')
@ApiBearerAuth()
@Controller('payments')
@UseGuards(RolesGuard)
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Post('renewal')
  @Roles('MEMBER')
  renewMembership(
    @Body('memberId') memberId: number,
    @Body('amount') amount: number,
  ) {
    return this.paymentsService.renewMembership(memberId, amount);
  }
}
