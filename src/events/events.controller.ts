import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateEventDto } from './dtos/create-event.dto';
import { EventsService } from './events.service';
import { Roles, RolesGuard } from 'src/common/decorators/roles.decorator';
import { UpdateEventDto } from './dtos/update-event.dto';

@ApiTags('events')
@ApiBearerAuth()
@Controller('events')
@UseGuards(RolesGuard)
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Put(':id')
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Post(':id/attendance')
  @Roles('ADMIN')
  recordAttendance(
    @Param('id') id: string,
    @Body('memberId') memberId: number,
  ) {
    return this.eventsService.recordAttendance(+id, memberId);
  }
}
