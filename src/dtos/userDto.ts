import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'email이 입력되지 않았습니다.' })
  @IsString({ message: 'email이 문자열 형식이 아닙니다.' })
  @IsEmail({}, { message: '올바른 email 형식이 아닙니다.' })
  public email: string;

  @IsNotEmpty({ message: 'password가 입력되지 않았습니다.' })
  @IsString({ message: 'password가 문자열 형식이 아닙니다.' })
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  public password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class SignUpDto extends UserDto {
  constructor(email: string, password: string) {
    super(email, password);
  }
}

export class LogInDto extends UserDto {
  constructor(email: string, password: string) {
    super(email, password);
  }
}
