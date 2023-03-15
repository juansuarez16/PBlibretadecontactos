import { Test, TestingModule } from '@nestjs/testing';
import { ContactoService } from '../src/contacto/contacto.service';
import { ContactoRepository } from '../src/contacto/contacto.repository';
import { NotFoundException } from '@nestjs/common';
import { Contacto } from '../src/contacto/contacto.entity';
import { BadRequestException } from '@nestjs/common';
const mockContactoRepository = () => ({
  createContacto: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

describe('ContactoService', () => {
  let contactoService;
  let contactoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactoService,
        { provide: ContactoRepository, useFactory: mockContactoRepository },
      ],
    }).compile();

    contactoService = module.get<ContactoService>(ContactoService);
    contactoRepository = module.get<ContactoRepository>(ContactoRepository);
  });

  describe('createContacto', () => {
    it('Debe guardar un contacto en la base de datos', async () => {
      contactoRepository.createContacto.mockResolvedValue('contacto');

      expect(contactoRepository.createContacto).not.toHaveBeenCalled();
      const createContactoDto = {
        nombre: 'Juan',
        apellido: 'Perez',
        telefono: '123456789',
        correo_electronico: 'juanperez@test.com',
        direccion: 'Calle Falsa 123',
        fecha_nacimiento: '01/01/2000',
      };
      const result = await contactoService.createContacto(createContactoDto);
      expect(contactoRepository.createContacto).toHaveBeenCalledWith(
        createContactoDto,
      );
      expect(result).toEqual('contacto');
    });
  });

  describe('getContactos', () => {
    it('Debe obtener todos los contactos de la base de datos', async () => {
      contactoRepository.find.mockResolvedValue('contactos');

      expect(contactoRepository.find).not.toHaveBeenCalled();
      const result = await contactoService.getContactos();
      expect(contactoRepository.find).toHaveBeenCalled();
      expect(result).toEqual('contactos');
    });
  });

  describe('getContactoById', () => {
    it('Debe obtener un contacto por su id', async () => {
      const mockContacto = new Contacto();
      mockContacto.id = 1;
      mockContacto.nombre = 'Juan';
      mockContacto.apellido = 'Perez';
      mockContacto.telefono = '123456789';
      mockContacto.correo_electronico = 'juanperez@test.com';
      mockContacto.direccion = 'Calle Falsa 123';
      mockContacto.fecha_nacimiento = '01/01/2000';

      contactoRepository.findOne.mockResolvedValue(mockContacto);

      const result = await contactoService.getContactoById(1);

      expect(result).toEqual(mockContacto);
      expect(contactoRepository.findOne).toHaveBeenCalledWith(1);
    });

    it('Debe lanzar una excepción NotFoundException si el contacto no existe', async () => {
      contactoRepository.findOne.mockResolvedValue(null);

      expect(contactoService.getContactoById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
  describe('deleteContacto', () => {
    it('Debe eliminar un contacto de la base de datos', async () => {
      contactoRepository.delete.mockResolvedValue({ affected: 1 });

      expect(contactoRepository.delete).not.toHaveBeenCalled();
      await contactoService.deleteContacto(1);
      expect(contactoRepository.delete).toHaveBeenCalledWith(1);
    });

    it('Debe lanzar un error al eliminar un contacto con ID no existente', async () => {
      contactoRepository.delete.mockResolvedValue({ affected: 0 });

      expect(contactoService.deleteContacto(1)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('Debe lanzar un error al eliminar un contacto con ID null', async () => {
      expect(contactoService.deleteContacto(null)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('Debe lanzar un error al eliminar un contacto con ID vacío', async () => {
      expect(contactoService.deleteContacto('')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
