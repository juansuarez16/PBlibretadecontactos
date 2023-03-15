import { Module } from '@nestjs/common';
import { ContactoModule } from './contacto/contacto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contacto } from './contacto/contacto.entity';

@Module({
  imports: [
    ContactoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root2023',
      database: 'libretadecontactos',
      entities: [Contacto],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
