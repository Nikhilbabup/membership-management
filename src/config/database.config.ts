// src/config/database.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Member } from '../members/entities/member.entity';
import { Event } from '../events/entities/event.entity';
import { Payment } from '../payments/entities/payment.entity';
import { Zone } from '../common/entities/zone.entity';

export const databaseConfig: any = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'mysecretpassword',
  database: process.env.DB_NAME || 'mydatabase',
  entities: [Member, Event, Payment, Zone],
  synchronize: true, // Set to false in production
};
