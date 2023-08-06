## 원티드 프리온보딩 백엔드 인턴쉽 선발 과제

## 1. 지원자 성명 : 박지원

## 2. 애플리케이션 실행 방법

### 1. AWS EC2 배포 주소

💻 http://43.200.110.0/

### 2. 로컬 실행

```
git clone https://github.com/okonomiyakki/wanted-pre-onboarding-backend.git

cd wanted-pre-onboarding-backend

touch .env

npm install

npm run dev
```

- .env 파일 구성 예시

```
# wanted-pre-onboarding-backend/.env


BCRYPT_SALT_ROUNDS=${BCRYPT_SALT_ROUNDS}

PORT=${PORT}

DB_HOST=${DB_HOST}
DB_PORT=${DB_HOST}
DB_NAME=${DB_NAME}
DB_USERNAME=${DB_USERNAME}
DB_PASSWORD=${DB_PASSWORD}

JWT_SECRET_KEY_LENGTH=${JWT_SECRET_KEY_LENGTH}

ACCESS_TOKEN_SECRET=${ACCESS_TOKEN_SECRET}
ACCESS_TOKEN_EXPIRES_IN=${ACCESS_TOKEN_EXPIRES_IN}

REFRESH_TOKEN_SECRET=${REFRESH_TOKEN_SECRET}
REFRESH_TOKEN_EXPIRES_IN=${REFRESH_TOKEN_EXPIRES_IN}
```

### 3. 엔드포인트 호출

- USER API

  - 회원가입
    ```
    curl --location --request POST 'http://43.200.110.0/api/v1/users/signup' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "test@gmail.com",
        "password": "test1234"
    }'
    ```
  - 로그인
    ```
    curl --location --request POST 'http://43.200.110.0/api/v1/users/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "test@gmail.com",
        "password": "test1234"
    }'
    ```

- POST API

  - 게시글 등록
    ```
    curl --location --request POST 'http://43.200.110.0/api/v1/posts' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer ${ACCESS_TOKEN}' \
    --header 'Cookie: RefreshToken= ${REFRESH_TOKEN}' \
    --data '{
        "title": "example title",
        "content": "example content"
    }'
    ```
  - 게시글 수정

    ```
    curl --location --request PATCH 'http://43.200.110.0/api/v1/posts/:id' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer ${ACCESS_TOKEN}' \
    --header 'Cookie: RefreshToken= ${REFRESH_TOKEN}' \
    --data '{
        "title": "edit example title",
        "content": "edit example content"
    }'
    ```

  - 게시글 삭제

    ```
    curl --location --request DELETE 'http://43.200.110.0/api/v1/posts/:id' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer ${ACCESS_TOKEN}' \
    --header 'Cookie: RefreshToken= ${REFRESH_TOKEN}'
    ```

  - 게시글 전체 조회

    ```
    curl --location --request GET 'http://43.200.110.0/api/v1/posts?page=&size='
    ```

  - 게시글 단일 조회
    ```
    curl --location --request GET 'http://43.200.110.0/api/v1/posts/:id'
    ```

## 데이터베이스 테이블 구조

### 1. ERD

![image](./src//public/ERD.png)

## 구현한 API의 동작을 촬영한 데모 영상 링크

## 구현 방법 및 이유에 대한 간략한 설명

## API 명세(request/response 포함)

## 가산점 추가 기능
