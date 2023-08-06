interface PostTable {
  post_id: number;
  user_id: number;
  title: string;
  content: string;
}

export type CreateInfo = Pick<PostTable, 'user_id' | 'title' | 'content'>;

export type UpdateInfo = Pick<PostTable, 'title' | 'content'>;
