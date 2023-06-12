import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import Posts from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostStatus } from './post-status.enum';
import { PostStatusValidationPipe } from './pipes/post-status-validation.pipe';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Headers() headers: any, @Body() createPostDto: CreatePostDto): Promise<Posts> {
    return this.postsService.createPost(createPostDto);
  }

  @Get()
  getAllPosts(): Promise<Posts[]> {
    return this.postsService.getAllPosts();
  }

  @Get('/:id')
  getPostById(@Param('id') id: number): Promise<Posts> {
    return this.postsService.getPostById(id);
  }

  @Patch('/:id/status')
  updatePostStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', PostStatusValidationPipe) postStatus: PostStatus,
  ): Promise<Posts> {
    return this.postsService.updatePostStatus(id, postStatus);
  }

  @Delete('/:id')
  deletePost(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.postsService.deletePost(id);
  }
}
