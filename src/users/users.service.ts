import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUnique(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findAll(params?: { skip?: number; take?: number }) {
    const { skip, take } = params;
    const users = await this.prisma.user.findMany({
      skip: skip || 0,
      take: take || 10,
      select: {
        email: true,
        name: true,
      },
    });

    const count = await this.prisma.user.count();

    return {
      users,
      metadata: {
        count,
        numberOfPages: Math.ceil(count / (take || 10)),
        currentPage: Math.floor(skip / (take || 10)) + 1,
      },
    };
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    try {
      const hashedPassword = await argon2.hash(data.password);
      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });

      delete user.password;

      return user;
    } catch (error) {
      return error;
    }
  }
}
