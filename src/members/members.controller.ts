import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dtos/create-member.dto';
import { Roles, RolesGuard } from 'src/common/decorators/roles.decorator';
import { SearchMemberDto } from './dtos/search-member.dto';
import { UpdateMemberDto } from './dtos/update-member.dto';

@ApiTags('members')
@ApiBearerAuth()
@Controller('members')
@UseGuards(RolesGuard)
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  @Roles('ADMIN')
  findAll(@Query() searchDto: SearchMemberDto) {
    return this.membersService.findAll(searchDto);
  }

  @Get(':id')
  @Roles('ADMIN', 'MEMBER')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @Put(':id')
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }

  @Get(':id/qr')
  @Roles('ADMIN', 'MEMBER')
  async getQRCode(@Param('id') id: string) {
    return { qrCode: await this.membersService.generateQRCode(+id) };
  }
}
