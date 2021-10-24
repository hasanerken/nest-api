import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Item } from './entities/item.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as fs from 'fs';
import stream = require('stream');
import fastify = require('fastify');
import * as util from 'util';
import { AppResponseDto } from './dto/app-response.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findOne({ _id: id });
  }

  async create(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }

  async delete(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndRemove(id);
  }

  async update(id: string, item: Item): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, {
      new: true,
    });
  }

  // upload file
  async uploadFile(
    req: fastify.FastifyRequest,
    res: fastify.FastifyReply<any>,
  ): Promise<any> {
    //Check request is multipart
    if (!req.isMultipart()) {
      res.send(new BadRequestException('The file is not send in the request'));
      return;
    }
    const mp = await req.multipart(this.handler, onEnd);
    // for key value pairs in request
    mp.on('field', function (key: any, value: any) {
      console.log('form-data', key, value);
    });

    // Uploading finished
    async function onEnd(err: any) {
      if (err) {
        res.send(
          new InternalServerErrorException(
            'The upload process can not be completed on the server',
          ),
        );
        return;
      }
      res
        .code(201)
        .send(
          new AppResponseDto(200, undefined, 'File is uploaded successfully'),
        );
    }
  }
  //Save files in directory
  async handler(
    field: string,
    file: any,
    filename: string,
    encoding: string,
    mimetype: string,
  ): Promise<void> {
    const pipeline = util.promisify(stream.pipeline);
    const fileLocation = mimetype.substring(0, mimetype.indexOf('/'));
    const writeStream = fs.createWriteStream(
      `uploads/${fileLocation}/${filename}`,
    ); //File path
    try {
      await pipeline(file, writeStream);
    } catch (err) {
      console.error('Pipeline failed', err);
    }
  }
}
