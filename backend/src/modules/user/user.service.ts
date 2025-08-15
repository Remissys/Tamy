import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/core";
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: EntityRepository<User>,
  ) {}

  async create(createUserDto: CreateUserDto, jwt: string) {
    const user = this.userRepo.create(createUserDto);
    user.password = jwt
    await this.userRepo.getEntityManager().persistAndFlush(user);
    return user;
  }

  findOne(username: string, jwt: string) {
    console.log('username: ', username)
    return this.userRepo.findOne({ name: username, password: jwt });
  }
}
