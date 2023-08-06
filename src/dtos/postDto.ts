import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class AddPostDto {
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
