import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './services/auth/auth.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './services/users/users.module';
import { ClassesModule } from './services/classes/classes.module';
import { ReportsModule } from './services/reports/reports.module';
import { StudentsModule } from './services/students/students.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: config.get<string>("DB_USERNAME"),
          password: config.get<string>("DB_PASSWORD"),
          database: config.get<string>("DB_NAME"),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          // synchronize: true,
          logging: true
        };
      },
    }),
    AuthModule,
    UsersModule,
    ClassesModule,
    StudentsModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
