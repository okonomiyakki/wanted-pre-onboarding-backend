import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class PostDto {
  @IsNotEmpty({ message: 'user_id가 존재하지 않았습니다. 다시 로그인해 주세요.' })
  @IsInt({ message: 'user_id가 정수 형식이 아닙니다.' })
  public user_id: number;

  @IsNotEmpty({ message: 'title이 입력되지 않았습니다.' })
  @IsString({ message: 'title이 문자열 형식이 아닙니다.' })
  public title: string;

  @IsNotEmpty({ message: 'content가 입력되지 않았습니다.' })
  @IsString({ message: 'content가 문자열 형식이 아닙니다.' })
  public content: string;

  constructor(user_id: number, title: string, content: string) {
    this.user_id = user_id;
    this.title = title;
    this.content = content;
  }
}

export class AddPostDto extends PostDto {
  constructor(user_id: number, title: string, content: string) {
    super(user_id, title, content);
  }
}

export class EditPostDto extends PostDto {
  @IsNotEmpty({ message: 'post_id가 입력되지 않았습니다.' })
  @IsInt({ message: 'post_id가 정수 형식이 아닙니다.' })
  public post_id: number;

  constructor(user_id: number, post_id: number, title: string, content: string) {
    super(user_id, title, content);
    this.post_id = post_id;
  }
}

export class RemovePostDto {
  @IsNotEmpty({ message: 'user_id가 존재하지 않았습니다. 다시 로그인해 주세요.' })
  @IsInt({ message: 'user_id가 정수 형식이 아닙니다.' })
  public user_id: number;

  @IsNotEmpty({ message: 'post_id가 입력되지 않았습니다.' })
  @IsInt({ message: 'post_id가 정수 형식이 아닙니다.' })
  public post_id: number;

  constructor(user_id: number, post_id: number) {
    this.user_id = user_id;
    this.post_id = post_id;
  }
}

export class GetAllPostsDto {
  @IsNotEmpty({ message: 'page가 입력되지 않았습니다.' })
  @IsInt({ message: 'page가 정수 형식이 아닙니다.' })
  public page: number;

  @IsNotEmpty({ message: 'size가 입력되지 않았습니다.' })
  @IsInt({ message: 'size가 정수 형식이 아닙니다.' })
  public size: number;

  constructor(page: number, size: number) {
    this.page = page;
    this.size = size;
  }
}
