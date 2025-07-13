import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/members/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  providers: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
