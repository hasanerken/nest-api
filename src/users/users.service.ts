import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...rest } = createUserDto;
    console.log(password);
    console.log(rest);
    const createdUser = new this.userModel(createUserDto);

    return await createdUser.save();
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username: username }).exec();
  }

  /* async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  } */
}
