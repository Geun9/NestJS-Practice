import { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private postsService: PostsService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp.getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request: Request) {
    const jwtString = request.headers.authorization.split('Bearer ')[1];

    this.postsService.verify(jwtString);

    return true;
  }
}
