import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mssql',
    host: 'localhost',
    port: 1433,
    username: 'waqas',
    password: 'Waqas@1234',
    database: 'CustomerDB',
    synchronize: false,
    options: {
      "encrypt": false,
      "trustServerCertificate": true
    }
  }), CustomersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
