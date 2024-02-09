import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { QueryTransformPipe } from 'src/helpers/pipes/query-transform.pipe';
import PaginationDto from 'src/helpers/dtos/pagination.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiQuery({ name: 'skip', required: false, example: 0 })
  @ApiQuery({ name: 'take', required: false, example: 10 })
  @ApiOkResponse({
    description: 'The list of users',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            users: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  name: { type: 'string' },
                },
              },
            },
            metadata: {
              type: 'object',
              properties: {
                count: { type: 'number' },
                numberOfPages: { type: 'number' },
                currentPage: { type: 'number' },
              },
            },
          },
        },
      },
    },
  })
  async findAll(
    @Query(new QueryTransformPipe<PaginationDto>()) query?: PaginationDto,
  ) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'The user with the specified id',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  async findOne() {
    return 'This action returns a #${id} user';
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The user has been successfully created',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiConflictResponse({ description: 'User already exists' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async create(@Body() createUserDto: CreateUserDto) {
    const hasUser = await this.userService.findUnique({
      email: createUserDto.email,
    });

    if (hasUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    return this.userService.create(createUserDto);
  }
}
