import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { Roles, RolesGuard } from 'src/common/decorators/roles.decorator';

@ApiTags('dashboard')
@ApiBearerAuth()
@Controller('dashboard')
@UseGuards(RolesGuard)
@Roles('ADMIN')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  getDashboardStats() {
    return this.dashboardService.getDashboardStats();
  }
}
