interface PostTable {
  post_id: number;
  user_id: number;
  title: string;
  content: string;
}

export type CreateInfo = Pick<PostTable, 'user_id' | 'title' | 'content'>;

export type UpdateInfo = Pick<PostTable, 'title' | 'content'>;

export type Posts = PostTable[];

export type PagenateInfo = {
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  pageRows: PostTable[];
};
