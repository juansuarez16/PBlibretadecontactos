import { Injectable } from '@nestjs/common';
import { Contacto } from './contacto.entity';
import { ContactoRepository } from './contacto.repository';

@Injectable()
export class ContactoService {
  constructor(private readonly contactoRepository: ContactoRepository) {}

  async findAll(): Promise<Contacto[]> {
    try {
      return await this.contactoRepository.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<Contacto> {
    try {
      return await this.contactoRepository.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(contacto: Contacto): Promise<Contacto> {
    try {
      return await this.contactoRepository.create(contacto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, contacto: Contacto): Promise<Contacto> {
    try {
      return await this.contactoRepository.update(id, contacto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      return await this.contactoRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
