import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/db/prisma.service';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [JwtService, PrismaService, UsersService],
})
export class UsersModule {}
