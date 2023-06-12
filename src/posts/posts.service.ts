import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostStatus } from './post-status.enum';
import { CreatePostDto } from './dto/create-post.dto';
import Posts from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Posts) private readonly postRepo: Repository<Posts>) {}

  async createPost(createPostDto: CreatePostDto): Promise<Posts> {
    const { title, description } = createPostDto;

    const post = this.postRepo.create({
      title,
      description,
      status: PostStatus.PUBLIC,
    });

    await this.postRepo.save(post);

    return post;
  }

  async getAllPosts(): Promise<Posts[]> {
    return this.postRepo.find();
  }

  async getPostById(id: number): Promise<Posts> {
    const result = await this.postRepo.findOne({ where: { id } });

    if (!result) {
      throw new NotFoundException(`Can't find Post with id '${id}'`);
    }

    return result;
  }

  async updatePostStatus(id: number, postStatus: PostStatus): Promise<Posts> {
    const post = await this.getPostById(id);

    post.status = postStatus;
    await this.postRepo.save(post);

    return post;
  }

  async deletePost(id: number): Promise<void> {
    const result = await this.postRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Post with id '${id}'`);
    }
  }
}
