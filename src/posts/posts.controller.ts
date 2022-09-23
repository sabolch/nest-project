import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  /* Request, Response,*/ Query,
  Header,
  Redirect,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
// import { Request as IRequest, Response as IResponse } from 'express';
import { PostService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostService) {}

  // const handler = (req, res, next) => {
  //     res.write("")
  //     res.end("")
  // }

  // @Get()
  // findAll(@Request() req: IRequest, @Response() res: IResponse) {
  //     res.status(200).json(this.postsService.findAll())
  //     res.end()
  // }

  @Get()
  @Header('Cache-Control', 'none')
  @Redirect('https://docs.nestjs.com/controllers', HttpStatus.MOVED_PERMANENTLY)
  findAll(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('size', new ParseIntPipe()) size: number,
  ) {
    return this.postsService.findAll(page, size);
  }

  @Get(':id')
  getById(@Param('id', new ParseIntPipe()) id: number) {
    return this.postsService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreatePostDto) {
    return this.postsService.create(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdatePostDto,
  ) {
    return this.postsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.postsService.delete(id);
  }
}