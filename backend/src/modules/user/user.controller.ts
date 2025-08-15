import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const { name, password } = createUserDto
    const jwt = this.jwtService.sign({name, password})
    return this.userService.create(createUserDto, jwt);
  }

  @Get()
  findOne(@Query('name') name: string, @Query('password') password: string) {
    const jwt = this.jwtService.sign({name, password})
    console.log(jwt, name)
    return this.userService.findOne(name, jwt);
  }
}
