import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
} from '@nestjs/common';
import { Contacto } from './contacto.entity';
import { ContactoService } from './contacto.service';

@Controller('contactos')
export class ContactoController {
  constructor(private readonly contactoService: ContactoService) {}

  @Get()
  async findAll(): Promise<Contacto[]> {
    return await this.contactoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Contacto> {
    return await this.contactoService.findOne(Number(id));
  }

  @Post()
  async create(@Body() contacto: Contacto): Promise<Contacto> {
    return await this.contactoService.create(contacto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() contacto: Contacto,
  ): Promise<Contacto> {
    return await this.contactoService.update(Number(id), contacto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.contactoService.delete(Number(id));
  }
}
