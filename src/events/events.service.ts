import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateEventDto } from './dtos/update-event.dto';
import { CreateEventDto } from './dtos/create-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const event = this.eventsRepository.create(createEventDto);
    return this.eventsRepository.save(event);
  }

  async findAll() {
    return this.eventsRepository.find();
  }

  async findOne(id: number) {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.findOne(id);
    Object.assign(event, updateEventDto);
    return this.eventsRepository.save(event);
  }

  async recordAttendance(id: number, memberId: number) {
    const event = await this.findOne(id);
    // Implementation for recording attendance
    return this.eventsRepository.save(event);
  }
}
