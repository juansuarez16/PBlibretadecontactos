import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Contacto {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  apellido: string;
  @Column()
  telefono: string;
  @Column()
  correo_electronico: string;
  @Column()
  direccion: string;
  @Column()
  fecha_nacimiento: string;
}
