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
  HttpException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './schemas/item.schema';
import { FastifyRequest, FastifyReply } from 'fastify';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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
  @ApiBadRequestResponse({
    status: 401,
    description: 'Lütfen farklı bir isim ile tekrar deneyin.',
  })
  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    try {
      const createdItem = await this.itemsService.create(createItemDto);
      return createdItem;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(
        'Lütfen farklı bir isim ile tekrar deneyin!',
      );
    }
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
