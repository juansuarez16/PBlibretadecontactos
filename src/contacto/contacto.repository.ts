import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contacto } from './contacto.entity';

@Injectable()
export class ContactoRepository {
  constructor(
    @InjectRepository(Contacto)
    private readonly contactoRepository: Repository<Contacto>,
  ) {}

  async findAll(): Promise<Contacto[]> {
    return await this.contactoRepository.find();
  }

  async findOne(id: number): Promise<Contacto> {
    return await this.contactoRepository.findOne({ where: { id } });
  }

  async create(contacto: Contacto): Promise<Contacto> {
    return await this.contactoRepository.save(contacto);
  }

  async update(id: number, contacto: Contacto): Promise<Contacto> {
    await this.contactoRepository.update(id, contacto);
    return await this.contactoRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.contactoRepository.delete(id);
  }
}
