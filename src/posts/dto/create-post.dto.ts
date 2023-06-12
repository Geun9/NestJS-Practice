import { IsNotEmpty } from 'class-validator';
import { PostStatus } from '../post-status.enum';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  status: PostStatus;

  @IsNotEmpty()
  user_id: number;
}
