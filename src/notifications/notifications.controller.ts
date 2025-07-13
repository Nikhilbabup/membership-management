import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { Roles, RolesGuard } from 'src/common/decorators/roles.decorator';

@ApiTags('notifications')
@ApiBearerAuth()
@Controller('notifications')
@UseGuards(RolesGuard)
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post('event-reminder')
  @Roles('ADMIN')
  sendEventReminder(@Body('eventId') eventId: number) {
    return this.notificationsService.sendEventReminder(eventId);
  }

  @Post('membership-expiry')
  @Roles('ADMIN')
  sendMembershipExpiryReminder(@Body('memberId') memberId: number) {
    return this.notificationsService.sendMembershipExpiryReminder(memberId);
  }

  @Post('announcement')
  @Roles('ADMIN')
  sendAnnouncement(@Body('message') message: string) {
    return this.notificationsService.sendAnnouncement(message);
  }
}
