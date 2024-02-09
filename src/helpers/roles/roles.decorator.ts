import { SetMetadata } from '@nestjs/common';

export enum ROLE_ENUM {
  USER = 'user',
  ADMIN = 'admin',
}

export const RolesDecorator = (...roles: ROLE_ENUM[]) =>
  SetMetadata('roles', roles);
