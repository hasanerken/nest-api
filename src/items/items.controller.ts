import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Body,
  Req,
  Res,
  Logger,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { FastifyRequest, FastifyReply } from 'fastify';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  logger: Logger;

  constructor(private readonly itemsService: ItemsService) {
    this.logger = new Logger(ItemsService.name);
  }

  @Post('uploadFile')
  async uploadFile(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply<any>,
  ): Promise<any> {
    this.logger.debug('File upload started');
    return await this.itemsService.uploadFile(req, res);
  }

  @ApiOkResponse({ type: Item, isArray: true })
  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @ApiOkResponse({ type: Item })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @ApiCreatedResponse({ type: Item })
  @ApiBadRequestResponse()
  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemsService.create(createItemDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Item> {
    return this.itemsService.delete(id);
  }

  @Put(':id')
  update(
    @Body() updateItemDto: CreateItemDto,
    @Param('id') id: string,
  ): Promise<Item> {
    return this.itemsService.update(id, updateItemDto);
  }
}
